# Audigo

Simple audio recording + upload + sharing web app  
🎤 ⬆️ ☁️ ⬇️ 🔊 👪

## Requirements
* Node 6.4.0 or newer
* [ffmpeg](http://www.ffmpeg.org/) with libmp3lame codec
* Apache host with rewrite support

## Installation

`npm install audigo`

Rename `.env.example` to `.env` and configure:

```dotenv
API_HOST=http://localhost # Node server host
API_PORT=4444 # Node server port
ORIGIN=http://localhost:8080 # Web host
BASENAME= # Web host subdirectory (e.g. /audigo)
```

Start the server:

```cmd
npm start
```

Build the web files:

```cmd
npm run-script build-production
```

Upload the contents of `/dist` to your web host, and you're done!