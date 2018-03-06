const merge = require('lodash/merge');

const NODE_ENV = process.env.NODE_ENV || 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || (NODE_ENV === 'development' ? 3000 : 8080);
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
        apiUrl: `${PROTOCOL + HOST}:${PORT}${API_PATH}`,
        // Create separate server config to keep this info out of client bundle?
        dbHost: process.env.PGHOST || 'localhost',
        dbPort: process.env.PGPORT || 5432,
        dbUser: process.env.PGUSER || process.env.USER || 'postgres',
        dbName: process.env.PGDATABASE || process.env.USER || 'audigo',
        dbPass: process.env.PGPASSWORD,
        clipFileType: '.mp3',
        clipFileCodec: 'libmp3lame',
        maxUploadSize: 100 * 1024 * 1024 // 100mb
    },
    test: {
        dbName: 'audigo_test'
    },
    development: {},
    production: {}
};

module.exports = merge(config.all, config[config.all.env]);
