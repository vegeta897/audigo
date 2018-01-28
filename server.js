require('dotenv').config();
const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');

const app = express();

app.use(cors({
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200
}));

let listener = app.listen(process.env.API_PORT, () => {
    console.log('Listening on port ' + listener.address().port);
});

app.route('/api/test/:name').get((req, res) => {
    res.send({
        message: 'hello ' + req.params['name'] 
    })
});

let storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
let upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        let fileType = path.extname(file.originalname);
        if(['.webm', '.ogg'].includes(fileType)) cb(null, true);
        else cb('Invalid file type, expected .webm or .ogg, got ' + fileType);
    },
    limits: {
        fileSize: 50 * 1024 * 1024 // 50mb max
    }
});
let type = upload.single('audio');

app.post('/api/upload', type, (req, res) => {
    console.log(req.file);
    let filename = req.file.filename;
    let ext = path.extname(filename);
    let name = path.basename(filename, ext);
    let sourcePath = req.file.destination + '/' + filename;
    ffmpeg(sourcePath)
        .audioCodec('libmp3lame')
        .save(req.file.destination + '/' + name + '.mp3')
        .on('error', err => {
            console.error(err);
            res.status(500).send({
                error: 'error converting file'
            });
        })
        .on('end', () => {
            fs.unlink(sourcePath); // Delete file
            res.send({
                message: 'file uploaded successfully'
            })
        });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send({
        error: err
    });
});