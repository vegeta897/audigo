import shortid from 'shortid';
import slug from 'slug'; // TODO: Add more emojis with slug.multicharmap['🤔'] = 'thinking';
import { protocol, host, port, apiPath } from '../config';
import db from 'server/db';

export const downloadPath = '/download';

const downloadUrl = protocol + host + ':' + port + downloadPath;

class DataError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

export const endpoints = new Map();

endpoints.set('/clips', new Map([
    ['get', ({ id, limit }) => {
        if(id) {
            return db.knex.select({ id: 'uid' }, 'title', 'description').from('clips').where('uid', id)
                .then(rows => {
                    if(rows.length === 0) throw new DataError('clip not found', 404);
                    let clip = rows[0];
                    return {
                        url: `${downloadUrl}/${clip.id}.mp3`,
                        filename: `${slug(clip.title)}.mp3`,
                        ...clip
                    };
                });
        } else {
            limit = parseInt(limit) > 0 ? parseInt(limit) : 20;
            return db.knex.select({ id: 'uid' }, 'title', 'description').from('clips').limit(limit)
                .then(rows =>{
                    return rows.map(clip => ({
                        url: `${downloadUrl}/${clip.id}.mp3`,
                        filename: `${slug(clip.title)}.mp3`,
                        ...clip
                    }));
                });
        }
    }]
]));

export const request = (endpoint, method, params) => endpoints.get(endpoint).get(method)(params);

export const bindExpress = app => {
    endpoints.forEach((endpoint, path) => {
        endpoint.forEach((cb, method) => {
            app[method](apiPath + path, (req, res) => cb(req.query)
                .then(data => res.send(data))
                .catch(err => res.status(err.status).send(err.message))
            )
        });
    });
    return db.init();
};
