require('dotenv').config();
const express = require('express');
const cors = require('cors');

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