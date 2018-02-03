const merge = require('lodash/merge');

const HOST = process.env.HOST || 'localhost';
const PROD_HOST = process.env.HOST || 'audigo.in';
const PORT = process.env.PORT || 3000;
const PROD_PORT = process.env.PORT || 8080;

const config = {
    all: {
        env: process.env.NODE_ENV || 'development',
        isDev: process.env.NODE_ENV !== 'production',
        basename: process.env.PUBLIC_PATH,
        host: HOST,
        port: PORT,
        isBrowser: typeof window !== 'undefined',
        isServer: typeof window === 'undefined',
        apiUrl: `http://${HOST}:${PORT}/api`,
        downloadUrl: `http://${HOST}:${PORT}/download`
    },
    test: {},
    development: {},
    production: {
        host: PROD_HOST,
        port: PROD_PORT,
        apiUrl: `https://${PROD_HOST}/api`,
        downloadUrl: `https://${PROD_HOST}/download`
    }
};

module.exports = merge(config.all, config[config.all.env]);
