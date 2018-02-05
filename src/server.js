import 'babel-polyfill';
import path from 'path';
import PgStore from 'express-brute-pg';
import express from 'express';
import ExpressBrute from 'express-brute';
import React from 'react';
import serialize from 'serialize-javascript';
import { ServerStyleSheet } from 'styled-components';
import { renderToStaticMarkup } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { renderToString } from 'react-router-server';

import { protocol, host, port, basename, apiPath, isDev } from 'config';
import db from 'db';
import configureStore from 'store/configure';
import api from 'services/api';
import App from 'components/App';
import Html from 'components/Html';
import Error from 'components/Error';

const downloadPath = '/download';
const downloadUrl = protocol + host + ':' + port + downloadPath;

const renderApp = ({ store, context, location, sheet }) => {
    const app = sheet.collectStyles((
        <Provider store={store}>
            <StaticRouter basename={basename} context={context} location={location}>
                <App/>
            </StaticRouter>
        </Provider>
    ));
    return renderToString(app);
};

const renderHtml = ({ serverState, initialState, content, sheet }) => {
    const styles = sheet.getStyleElement();
    const { assets } = global;
    const state = `
    window.__SERVER_STATE__ = ${serialize(serverState)};
    window.__INITIAL_STATE__ = ${serialize(initialState)};
  `;
    const props = {
        styles, assets, state, content,
    };
    const html = <Html {...props} />;
    return `<!doctype html>\n${renderToStaticMarkup(html)}`;
};

const app = express();

let clips = [
    {
        id: 1,
        title: 'finger drumming'
    },
    {
        id: 2,
        title: 'test'
    }
];

let bruteStore = new PgStore({ pool: db.pool });
let brute = new ExpressBrute(bruteStore, {
    freeRetries: isDev ? 100 : 3
});
app.use(brute.prevent); // TODO: https://github.com/AdamPflug/express-brute#a-more-complex-example

// TODO: Whitelist server's own requests to API

// TODO: More security https://github.com/helmetjs/helmet

// Get list of clips
app.get(apiPath + '/clips', (req, res) => {
    console.log('GET /api/clips');
    let { limit } = req.query;
    limit = parseInt(limit) > 0 ? parseInt(limit) : 20;
    res.send(clips.slice(0, limit));
});

// Get clip detail
app.get(apiPath + '/clips/:id', (req, res) => {
    let { id } = req.params;
    console.log('GET /api/clips/' + id);
    let clip = clips[id - 1];
    if(!clip) return res.status(404).send('Clip not found');
    res.send({ ...clip, url: `${downloadUrl}/${clip.id}.mp3` });
});

// Serve clip downloads
app.use(downloadPath, express.static(path.resolve(process.cwd(), 'server/clips')));

// Serve static assets
app.use(basename, express.static(path.resolve(process.cwd(), 'dist/public')));

// Serve rendered index.html
app.use((req, res, next) => {
    const location = req.url;
    const store = configureStore({}, { api: api.create() });
    const context = {};
    const sheet = new ServerStyleSheet();

    renderApp({
        store, context, location, sheet,
    }).then(({ state: serverState, html: content }) => {
        if(context.status) {
            res.status(context.status);
        }
        if(context.url) {
            res.redirect(context.url);
        } else {
            const initialState = store.getState();
            res.send(renderHtml({
                serverState, initialState, content, sheet,
            }));
        }
    }).catch(next);
});

// Serve error page
app.use((err, req, res, next) => {
    const sheet = new ServerStyleSheet();
    const content = renderToStaticMarkup(sheet.collectStyles(<Error/>));
    res.status(500).send(renderHtml({ content, sheet }));
    console.error(err);
    next(err);
});

db.init().then(() => {
    app.listen(port, err => {
        const boldBlue = text => `\u001b[1m\u001b[34m${text}\u001b[39m\u001b[22m`;
        if(err) {
            console.error(err);
        } else {
            console.info(`Server is running at ${boldBlue(`${protocol + host}:${port}${basename}/`)}`);
        }
    })
});
