import merge from 'lodash/merge';
import { request } from 'server/models';

// TODO: Refactor the common parts between this and api/index.js

const api = {};

api.request = (endpoint, { params = {}, ...settings }) => request(endpoint, settings.method, params);

['delete', 'get'].forEach((method) => {
    api[method] = (endpoint, settings) => api.request(endpoint, { method, ...settings });
});

['post', 'put', 'patch'].forEach((method) => {
    api[method] = (endpoint, data, settings) => api.request(endpoint, { method, data, ...settings });
});

api.create = (settings = {}) => ({
    settings,

    request(endpoint, settings) {
        return api.request(endpoint, merge({}, this.settings, settings));
    },

    post(endpoint, data, settings) {
        return this.request(endpoint, { method: 'post', data, ...settings });
    },

    get(endpoint, settings) {
        return this.request(endpoint, { method: 'get', ...settings });
    },

    put(endpoint, data, settings) {
        return this.request(endpoint, { method: 'put', data, ...settings });
    },

    patch(endpoint, data, settings) {
        return this.request(endpoint, { method: 'patch', data, ...settings });
    },

    delete(endpoint, settings) {
        return this.request(endpoint, { method: 'delete', ...settings });
    }
});

export default api;
