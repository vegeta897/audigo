# Audigo
Simple audio recording + upload + sharing web app  
🎤 ☁️ 🔊 👪

[![Build Status](https://img.shields.io/travis/vegeta897/audigo/arc-rewrite.svg)](https://travis-ci.org/vegeta897/audigo) [![Coverage Status](https://img.shields.io/coveralls/github/vegeta897/audigo/arc-rewrite.svg)](https://coveralls.io/github/vegeta897/audigo?branch=arc-rewrite)

## Requirements
* Node 6.4.0 or newer
* PostgreSQL 9.5.10 or newer
* [FFmpeg](http://www.ffmpeg.org/) with libmp3lame codec
* (for deployment) SSL + nginx with reverse proxy

## Installation
```cmd
npm install audigo
```
Create a PostgreSQL database called `audigo`

### Environment Variables
| Variable     | Default value                                   |
|--------------|-------------------------------------------------|
| `HOST`       | `localhost`                                     |
| `PORT`       | `3000` for development<br>`8080` for production |
| `PGHOST`     | `localhost`                                     |
| `PGPORT`     | `5432`                                          |
| `PGUSER`     | `USER` env variable or `postgres`               |
| `PGDATABASE` | `USER` env variable or `audigo`                 |
| `PGPASSWORD` | `null`                                          |

### Reverse Proxy
```
    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
```

## Run
Build the source `npm run build` and start the server `npm start`

## Development
Start the dev server `npm run dev` and open `http://localhost:3000`

[Roadmap](https://github.com/vegeta897/audigo/wiki/Roadmap)

## Technologies
* Built with [ARc](https://arc.js.org/)
    * React
        * react-router
        * react-helmet
    * Redux
        * redux-saga-thunk
    * Express
    * SSR
    * Webpack
        * webpack-dev-server
* Knex
* Multer
* FFmpeg
