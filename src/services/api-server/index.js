import merge from 'lodash/merge';
import { request } from 'server/models';
import clientApi from 'services/api';

const api = {};

api.request = (endpoint, { params = {}, ...settings }) => request(endpoint, settings.method, params);

api.create = (settings = {}) => {
    let createdApi = clientApi.create(settings);
    createdApi.request = (endpoint, settings) => {
        return api.request(endpoint, merge({}, createdApi.settings, settings));
    };
    return createdApi;
};

export default api;
