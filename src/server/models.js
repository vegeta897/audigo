import path from 'path';
import generate from 'nanoid/generate';
import slug from 'slug'; // TODO: Add more emojis with slug.multicharmap['🤔'] = 'thinking';
import { protocol, host, port, apiPath, clipFileType, maxUploadSize } from '../config';
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
    limits: { fileSize: maxUploadSize }
});

export const endpoints = new Map();

const normalizeClip = clip => ({
    id: clip.uid,
    url: `${downloadUrl}/${clip.uid}${clipFileType}`,
    filename: slug(clip.title || clip.original_file_name) + clipFileType,
    title: clip.title || clip.original_file_name,
    description: clip.description,
    recordDate: clip.recorded_at,
    uploadDate: clip.created_at
});

endpoints.set('/clips', new Map([
    ['get', ({ query: { id, limit }}) => {
        if(id) return db.getClip(id).then(normalizeClip)
            .catch(e => { throw new DataError(e.message, 404) });
        else return db.getClips(parseInt(limit) > 0 ? parseInt(limit) : 20)
            .then(clips => clips.map(normalizeClip));
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
                return db.insertClip(clip).then(normalizeClip)
                    .catch(err => { console.log(err); throw new DataError('error saving to database', 500); });
            })
            .catch(err => { console.log(err); throw new DataError('error converting file', 500); });

    }]
]));

export const request = (endpoint, method, params) => endpoints.get(endpoint).get(method)({ query: params });

export const bindExpress = app => {
    endpoints.forEach((endpoint, path) => {
        endpoint.forEach((cb, method) => {
            let args = [apiPath + path];
            if(method === 'post') args.push(upload.single('audio'));
            args.push((req, res) => {
                cb(req).then(data => res.send(data))
                    .catch(err => res.status(err.status || 500).send(err.message))
            });
            app[method](...args);
        });
    });
    return db.init();
};
