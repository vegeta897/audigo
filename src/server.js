import 'babel-polyfill';
import path from 'path';
import express from 'express';
import ExpressBrute from 'express-brute';
import BruteKnex from 'brute-knex';
import helmet from 'helmet';
import React from 'react';
import serialize from 'serialize-javascript';
import { ServerStyleSheet } from 'styled-components';
import { renderToStaticMarkup } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { renderToString } from 'react-router-server';

import { protocol, host, port, basename, apiPath, isDev } from 'config';
import { downloadPath, bindExpress } from 'server/models';
import configureStore from 'store/configure';
import api from 'services/api';
import App from 'components/App';
import Html from 'components/Html';
import Error from 'components/Error';

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
app.use(helmet());

// Bind to api endpoints and init
bindExpress(app).then(({ db }) => {
    let bruteStore = new BruteKnex({ knex: db.knex });
    let brute = new ExpressBrute(bruteStore, {
        freeRetries: isDev ? 100 : 3,
        lifetime: isDev? 60 : 1
    });
    app.use(brute.prevent); // TODO: https://github.com/AdamPflug/express-brute#a-more-complex-example

    app.listen(port, err => {
        const boldBlue = text => `\u001b[1m\u001b[34m${text}\u001b[39m\u001b[22m`;
        if(err) {
            console.error(err);
        } else {
            console.info(`Server is running at ${boldBlue(`${protocol + host}:${port}${basename}/`)}`);
        }
    })
});

// Serve clip downloads
app.use(downloadPath, express.static(path.resolve(process.cwd(), 'storage/clips')));

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
