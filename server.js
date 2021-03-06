require('dotenv').config();
const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const ffprobe = require('ffprobe');
const ffmpegPath = require('ffprobe-static').path;

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

// app.use((err, req, res, next) => {
//     console.error(err);
//     res.status(500).send({ error: err });
// });

app.use(cors({
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200
}));

let listener = app.listen(process.env.API_PORT, () => {
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
let type = upload.single('audio');

app.post('/api/upload', type, (req, res) => { // Upload a file
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
            fs.unlink(filePath); // Delete file
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