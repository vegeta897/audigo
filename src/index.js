import React from 'react';
import { render } from 'react-dom';
import configureStore from './store';
import Root from './containers/Root'
import 'semantic-ui-less/semantic.less';

console.log(process.env.API_HOST, process.env.API_PORT);

fetch(process.env.API_HOST + ':' + process.env.API_PORT + '/api/test/devin')
.then(response => response.json().then(json => {
    if(!response.ok) return Promise.reject(json);
    console.log(json);
    return json;
}));

const store = configureStore();

const rootElt = document.getElementById('root');
render(
    <Root store={store} />,
    rootElt
);