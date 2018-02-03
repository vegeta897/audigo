import { config as dotenv } from 'dotenv';
import path from 'path';
import fs from 'fs';
import express from 'express';
import multer from 'multer';
import ffmpeg from 'fluent-ffmpeg';
import ffprobe from 'ffprobe';
import { path as ffmpegPath } from 'ffprobe-static';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';
import routes from './src/routes';
import rootReducer from './src/reducers';
import Template from './template';

dotenv();

ffmpeg.getAvailableEncoders((err, encoders) => {
    if(err) return console.error(err);
    if(!encoders.libmp3lame) {
        console.error('libmp3lame encoder not found!');
        process.exit(1);
    }
});

const VALID_TYPES = ['.webm', '.weba', '.aac', '.ogg', '.mp3', '.wav', '.opus', '.m4a'];
const STORE_TYPE = '.mp3';

let knex = require('knex')({
    client: 'sqlite3',
    connection: { filename: './public/uploads.sqlite' },
    useNullAsDefault: true,
    acquireConnectionTimeout: 10000,
    // debug: true
});

knex.schema
    .createTableIfNotExists('uploads', tbl => {
        tbl.increments().primary();
        tbl.timestamps(true, true);
        tbl.string('title');
        tbl.string('original_name');
        tbl.string('original_ext');
        tbl.integer('duration');
        tbl.integer('file_size');
    })
    .catch(console.error);

const app = express();

let listener = app.listen(process.env.PORT, () => {
    console.log('Server running on port ' + listener.address().port);
});

let storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        let name = path.basename(file.originalname, ext);
        knex('uploads').insert({ original_name: name, original_ext: ext })
            .returning('id')
            .then(data => {
                cb(null, data[0] + path.extname(file.originalname));
            })
            .catch(console.error);
    }
});
let upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        let fileType = path.extname(file.originalname).toLowerCase();
        if(VALID_TYPES.includes(fileType)) cb(null, true);
        else cb('Invalid file type ' + fileType);
    },
    limits: {
        fileSize: 100 * 1024 * 1024 // 100mb max
    }
});

app.post('/api/upload', upload.single('audio'), (req, res) => { // Upload a file
    if(!req.file) return res.status(500).send({ error: 'missing file' });
    let filePath = req.file.path;
    let filename = req.file.filename;
    let ext = path.extname(filename);
    let id = +path.basename(filename, ext);
    let outputPath = req.file.destination + '/' + id + STORE_TYPE;
    console.log('saving', id + STORE_TYPE);
    if(ext === STORE_TYPE) { // Already correct format
        fs.renameSync(filePath, outputPath);
        onFileReady(res, req, id, outputPath);
        return;
    }
    ffmpeg(filePath)
        .audioCodec('libmp3lame')
        .save(outputPath)
        .on('error', err => {
            console.error(err);
            res.status(500).send({ error: 'error converting file' });
        })
        .on('end', (stdout, sterr) => {
            fs.unlink(filePath, () => {}); // Delete file
            onFileReady(res, req, id, outputPath);
        });
});

function onFileReady(res, req, id, outputPath) {
    let fileSize = Math.round(fs.statSync(outputPath).size / 1024);
    ffprobe(outputPath, { path: ffmpegPath })
        .then(outputInfo => {
            console.log('saved', fileSize, 'kb', STORE_TYPE);
            knex('uploads')
                .where('id', '=', id)
                .update({
                    title: req.body.title,
                    file_size: fileSize,
                    duration: Math.round(outputInfo.streams[0].duration * 1000)
                })
                .then(() => {
                    res.send({ message: 'file uploaded successfully', id });
                })
                .catch(console.error);
        })
        .catch(console.error);
}

app.get('/api/get/:id', (req, res) => { // Get a file
    let { id } = req.params;
    knex('uploads')
        .where('id', '=', id)
        .select({
            'created': 'created_at',
            'updated': 'updated_at',
            'title': 'title',
            'original_name': 'original_name',
            'duration': 'duration',
            'file_size': 'file_size'
        })
        .then(data => {
            if(!data[0]) return res.status(404).send({ error: 'invalid id' });
            let audio = {
                created: data[0].created,
                updated: data[0].updated,
                title: data[0].title,
                duration: data[0].duration,
                file_size: data[0].file_size,
                file_name: data[0].original_name + STORE_TYPE
            };
            res.set(audio);
            res.set('Access-Control-Expose-Headers', Object.keys(audio).join(','));
            res.download('./public/uploads/' + id + STORE_TYPE);
        })
        .catch(console.error);
});

app.use(express.static('dist'));
// app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'dist', 'index.html')));
const router = express.Router();

const store = createStore(rootReducer, applyMiddleware(thunk));

router.get('*', (req, res) => {
    let context = {};
    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={ context }>
                {renderRoutes(routes)}
            </StaticRouter>
        </Provider>
    );
    console.log(content);
    res.send('hi');
    // const branch = matchRoutes(routes, req.url);
    // const promises = branch.map(({ route }) => {
    //     let fetchData = route.component.fetchData;
    //     return fetchData instanceof Function ? fetchData(store, 1) : Promise.resolve(null);
    // });
    // return Promise.all(promises).then((data) => {
    //     let context = {};
    //     console.log(store.getState());
    //     const content = renderToString(
    //         <Provider store={store}>
    //             <StaticRouter location={req.url} context={ context }>
    //                 {renderRoutes(routes)}
    //             </StaticRouter>
    //         </Provider>
    //     );
    //     res.status(200).send(Template({ content: content }));
    //     // res.render('./src/index.html', {title: 'Express', data: store.getState(), content });
    // }).catch(err => console.log('Error!', err));
});

app.use(router);