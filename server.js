require('dotenv').config();
const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');

ffmpeg.getAvailableEncoders((err, encoders) => {
    if(err) return console.error(err);
    if(!encoders.libmp3lame) {
        console.error('libmp3lame encoder not found!');
        process.exit(1);
    }
});

const app = express();

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
    let filePath = req.file.path;
    let filename = req.file.filename;
    let ext = path.extname(filename);
    let name = path.basename(filename, ext);
    let outputPath = req.file.destination + '/' + name + '.mp3';
    console.log('saving', name + '.mp3');
    ffmpeg(filePath)
        .audioCodec('libmp3lame')
        .save(outputPath)
        .on('error', err => {
            console.error(err);
            res.status(500).send({
                error: 'error converting file'
            });
        })
        .on('end', () => {
            console.log('output', Math.round(fs.statSync(outputPath).size / 1000), 'kb');
            fs.unlink(filePath); // Delete file
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