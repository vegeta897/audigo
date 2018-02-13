import 'react-hot-loader/patch';
// import 'babel-polyfill'; // Don't use this whole thing
// Add below imports as necessary
import 'regenerator-runtime/runtime'; // For sagas
// import 'core-js/es6/array';
// import 'core-js/es6/function';
// import 'core-js/es6/map';
// import 'core-js/es6/math';
// import 'core-js/es6/number';
// import 'core-js/es6/object';
// import 'core-js/es6/promise';
// import 'core-js/es6/regexp';
// import 'core-js/es6/string';
// import 'core-js/fn/array/includes';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ServerStateProvider } from 'react-router-server';

import { basename } from 'config';
import configureStore from 'store/configure';
import api from 'services/api';
import recorder from 'services/recorder';
import App from 'components/App';

const serverState = window.__SERVER_STATE__;
const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState, {
    api: api.create(),
    recorder: recorder.create()
});

const renderApp = () => (
    <ServerStateProvider state={serverState}>
        <Provider store={store}>
            <BrowserRouter basename={basename}>
                <App/>
            </BrowserRouter>
        </Provider>
    </ServerStateProvider>
);

const root = document.getElementById('app');
hydrate(renderApp(), root);

if(module.hot) {
    module.hot.accept('components/App', () => {
        require('components/App');
        hydrate(renderApp(), root);
    });
}
