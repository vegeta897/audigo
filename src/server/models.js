import path from 'path';
import generate from 'nanoid/generate';
import slug from 'slug'; // TODO: Add more emojis with slug.multicharmap['🤔'] = 'thinking';
import { protocol, host, port, apiPath } from '../config';
import db from 'server/db';
import encode from 'server/encoder';
import multer from 'multer';

const validFileTypes = ['.webm', '.weba', '.aac', '.ogg', '.mp3', '.wav', '.opus', '.m4a'];

export const downloadPath = '/download';

const downloadUrl = protocol + host + ':' + port + downloadPath;

class DataError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

let storage = multer.diskStorage({
    destination: 'storage/clips',
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname).toLowerCase();
        cb(null, generate('23456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ', 8) + ext);
    }
});

let upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        let fileType = path.extname(file.originalname).toLowerCase();
        if(validFileTypes.includes(fileType)) cb(null, true);
        else cb('Invalid file type ' + fileType);
    },
    limits: {
        fileSize: 100 * 1024 * 1024 // 100mb max
    }
});

export const endpoints = new Map();

endpoints.set('/clips', new Map([
    ['get', ({ id, limit }) => {
        if(id) {
            return db.knex.select({ id: 'uid' }, 'title', 'description', 'original_file_name').from('clips').where('uid', id)
                .then(rows => {
                    if(rows.length === 0) throw new DataError('clip not found', 404);
                    let clip = rows[0];
                    return {
                        ...clip,
                        url: `${downloadUrl}/${clip.id}.mp3`,
                        filename: `${slug(clip.title || clip.original_file_name)}.mp3`,
                        title: clip.title || clip.original_file_name
                    };
                });
        } else {
            limit = parseInt(limit) > 0 ? parseInt(limit) : 20;
            return db.knex.select({ id: 'uid' }, 'title', 'description', 'original_file_name').from('clips').limit(limit)
                .then(rows =>{
                    return rows.map(clip => ({
                        ...clip,
                        url: `${downloadUrl}/${clip.id}.mp3`,
                        filename: `${slug(clip.title || clip.original_file_name)}.mp3`,
                        title: clip.title || clip.original_file_name
                    }));
                });
        }
    }],
    ['post', ({ file, body }) => {
        if(!file) return Promise.reject(new DataError('missing file', 400));
        let fileExt = path.extname(file.filename);
        let origExt = path.extname(body.fileName);
        let clip = {
            uid: path.basename(file.filename, fileExt),
            title: body.title,
            description: body.description,
            original_file_name: path.basename(body.fileName, origExt),
            original_file_type: origExt,
            recorded_at: new Date(+body.recordDate).toISOString()
        };
        return encode(file.path, file.destination + '/' + clip.uid)
            .then(({ fileSize, duration }) => {
                clip.file_size = fileSize;
                clip.duration = duration;
                return db.knex('clips').insert({ ...clip })
                    .returning(['uid', 'title', 'description', 'original_file_name'])
                    .then(rows => {
                        let { uid, title, description, original_file_name } = rows[0];
                        return {
                            description,
                            id: uid,
                            url: `${downloadUrl}/${uid}.mp3`,
                            filename: `${slug(title || original_file_name)}.mp3`,
                            title: title || original_file_name
                        };
                    })
                    .catch(err => { console.log(err); throw new DataError('error saving to database', 500); });
            })
            .catch(err => { console.log(err); throw new DataError('error converting file', 500); });

    }]
]));

export const request = (endpoint, method, params) => endpoints.get(endpoint).get(method)(params);

export const bindExpress = app => {
    endpoints.forEach((endpoint, path) => {
        endpoint.forEach((cb, method) => { // TODO: DRY this up
            if(method === 'post') {
                app.post(apiPath + path, upload.single('audio'), (req, res) => {
                    cb(req)
                        .then(data => res.send(data))
                        .catch(err => {
                            console.log('post reject', err.status, err.message);
                            res.status(err.status || 500).send({ message: err.message })
                        });
                });
            } else {
                app[method](apiPath + path, (req, res) => {
                    cb(req.query)
                        .then(data => res.send(data))
                        .catch(err => res.status(err.status || 500).send(err.message))
                });
            }
        });
    });
    return db.init();
};
