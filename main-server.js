// http://nikolay.rocks/2016-01-13-connect-webpack-to-backend
import appServer from './webpack-server';
import apiServer from './json-api-server';

const PORT = process.env.PORT || 8080;
const PROD = process.env.NODE_ENV === 'production';

if(PROD) {
    apiServer(PORT);
} else {
    apiServer(PORT - 1);
    appServer(PORT);
}