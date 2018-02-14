// https://github.com/diegohaz/arc/wiki/API-service
import 'isomorphic-fetch';
import { stringify } from 'query-string';
import merge from 'lodash/merge';
import { apiUrl } from 'config';

export const checkStatus = response => {
    if(response.ok) return response;
    const error = new Error(`${response.status} ${response.statusText}`);
    error.response = response;
    return response.json().then(err => { throw { ...error, err }; });
};

export const parseJSON = response => response.json();

export const parseSettings = ({ method = 'get', data, locale, ...otherSettings } = {}) => {
    let body = data instanceof FormData ? data : JSON.stringify(data);
    const headers = {
        Accept: 'application/json',
        //'Content-Type': contentType, // Messes with multipart form data
        'Accept-Language': locale
    };
    return merge({
        body,
        method,
        headers
    }, otherSettings);
};

export const parseEndpoint = (endpoint, params) => {
    const url = endpoint.indexOf('http') === 0 ? endpoint : apiUrl + endpoint;
    const querystring = params ? `?${stringify(params)}` : '';
    return `${url}${querystring}`;
};

const api = {};

api.request =(endpoint, { params, ...settings } = {}) =>
    fetch(parseEndpoint(endpoint, params), parseSettings(settings))
        .then(checkStatus)
        .then(parseJSON)
        .catch(e => {
            console.log(e);
            throw e;
        });

api.create = (settings = {}) => {
    let createdApi = {
        settings,

        setToken(token) {
            settings.headers = {
                ...settings.headers,
                Authorization: `Bearer ${token}`
            };
        },

        unsetToken() {
            settings.headers = {
                ...settings.headers,
                Authorization: undefined
            };
        },

        request(endpoint, settings) {
            return api.request(endpoint, merge({}, createdApi.settings, settings));
        }
    };

    ['delete', 'get'].forEach((method) => {
        createdApi[method] = (endpoint, settings) => createdApi.request(endpoint, { method, ...settings });
    });

    ['post', 'put', 'patch'].forEach((method) => {
        createdApi[method] = (endpoint, data, settings) => createdApi.request(endpoint, { method, data, ...settings });
    });
    return createdApi;
};

export default api;
