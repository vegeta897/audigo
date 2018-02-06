import { apiPath } from '../config';
import { models, downloadPath as _downloadPath } from 'server/models';

export const apiPaths = new Map();
export const downloadPath = _downloadPath;

models.forEach((model, key) => {
    apiPaths.set('/' + key, {
        server: model,
        client: (req, res) => res.send(model(req.query))
    });
});

export const bindExpress = app => {
    apiPaths.forEach((val, key) => app.get(apiPath + key, val.client));
};
