const merge = require('lodash/merge');

const NODE_ENV = process.env.NODE_ENV || 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || NODE_ENV === 'development' ? 3000 : 8080;
const PROTOCOL = NODE_ENV === 'development' ? 'http://' : 'https://';
const API_PATH = '/api';

const config = {
    all: {
        env: NODE_ENV,
        isDev: NODE_ENV !== 'production',
        basename: process.env.PUBLIC_PATH,
        protocol: PROTOCOL,
        host: HOST,
        port: PORT,
        isBrowser: typeof window !== 'undefined',
        isServer: typeof window === 'undefined',
        apiPath: API_PATH,
        apiUrl: `${PROTOCOL + HOST}:${PORT}${API_PATH}`
    },
    test: {},
    development: {},
    production: {}
};

module.exports = merge(config.all, config[config.all.env]);
