import React from 'react';
import { hydrate } from 'react-dom';
import configureStore from 'store';
import Root from 'containers/Root'
import 'semantic-ui-less/semantic.less';

const store = configureStore();

const rootElt = document.getElementById('root');
hydrate(
    <Root store={store} />,
    rootElt
);