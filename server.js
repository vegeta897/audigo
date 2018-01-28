require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const multer = require('multer');

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
    destination: (req, file, cb) => {
        cb(null, __dirname + '/public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
let upload = multer({ storage });
let type = upload.single('audio');

app.post('/api/upload', type, (req, res) => {
    console.log(req.body);
    console.log(req.file);
});