import shortid from 'shortid';
import slug from 'slug';
import { protocol, host, port, apiPath } from '../config';
import db from 'server/db';

export const downloadPath = '/download';

const downloadUrl = protocol + host + ':' + port + downloadPath;

export const models = new Map();

class DataError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

models.set('/clips', ({ id, limit }) => {
    if(id) {
        return db.knex.select({ id: 'uid' }, 'title', 'description').from('clips').where('uid', id)
            .then(rows => {
                if(rows.length === 0) throw new DataError('clip not found', 404);
                let clip = rows[0];
                clip.url = `${downloadUrl}/${clip.id}.mp3`;
                return rows[0];
            });
    } else {
        limit = parseInt(limit) > 0 ? parseInt(limit) : 20;
        return db.knex.select({ id: 'uid' }, 'title', 'description').from('clips').limit(limit)
            .then(rows =>{
                return rows;
            });
    }
});

export const bindExpress = app => {
    models.forEach((val, key) => app.get(apiPath + key, (req, res) => val(req.query)
        .then(data => res.send(data))
        .catch(err => res.status(err.status).send(err.message))
    ));
};
