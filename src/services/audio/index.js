const EventEmitter = require('events');

class Audio extends EventEmitter {}

const audioService = {};

audioService.create = () => audio;

const audio = new Audio();

audio.init = () => new Promise((resolve, reject) => {
    window.audio = audio;
    audio.soundManager = require('soundmanager2').soundManager;
    audio.soundManager.setup({
        preferFlash: false,
        consoleOnly: false,
        html5PollingInterval: 50,
        onready() {
            audio.ready = true;
            resolve(audio.soundManager);
            console.log('sm2 ready', audio.soundManager);
        },
        onerror(errorCode, description) {
            reject(new Error(description));
        },
        ontimeout() {
            reject(new Error('sm2 init timeout'));
        }
    });
});

audio.load = url => new Promise((resolve, reject) => {
    const options = {
        url,
        autoLoad: !audio.sound,
        whileloading() { console.log('loading',this.bytesLoaded,this.bytesTotal)}, // Does this work in production?
        //autoPlay: true,
        onload(success) { // "success" can be false if loaded from cache, so we use readyState
            if(this.readyState === 3) {
                console.log('onload');
                resolve(audio.sound);
            } else {
                console.log('load error');
                reject(new Error('load fail'));
            }
        },
        onerror(errorCode, description) {
        },
        ontimeout() {
            console.log('load timed out');
            reject();
        }
    };
    if(audio.sound) audio.sound.load(options);
    else if(!audio.ready) {
        audio.init().then(() => audio.sound = audio.soundManager.createSound(options));
    } else audio.sound = audio.soundManager.createSound(options);
});

audio.play = ({ url = null, position = null }) => new Promise((resolve, reject) => {
    console.log('audio.play', url);
    const onstop = () => audio.emit('status', audio.getStatus());
    const options = {
        from: position,
        onplay: () => {
            console.log('onplay');
            resolve();
            audio.emit('status', audio.getStatus());
        },
        onresume: () => {
            console.log('onresume');
            audio.emit('status', audio.getStatus());
        },
        onpause: () => {
            console.log('onpause');
            audio.emit('status', audio.getStatus());
        },
        whileplaying: () => {
            //audio.emit('status', audio.getStatus());
        },
        onbufferchange: (isBuffering) => {
            console.log('is buffering?', isBuffering);
        },
        onstop,
        onfinish: onstop,
        onerror: (errorCode, description) => {
            console.log('play error');
            reject(description);
        },
        ontimeout: () => {
            console.log('play timed out');
            reject();
        }
    };
    if(!audio.sound || (url && audio.sound.url !== url)) audio.load(url)
        .then(() => audio.sound.play(options));
    else {
        if(audio.sound.paused) audio.sound.resume(options);
        else audio.sound.play(options);
        resolve();
    }
});

audio.pause = () => new Promise((resolve, reject) => {
    console.log('audio.pause');
    if(!audio.sound) return reject(new Error('no sound loaded!'));
    audio.sound.pause();
    resolve();
});

audio.getStatus = () => {
    const { position, durationEstimate: duration, paused, playState } = audio.sound;
    //console.log('getStatus', position, playState);
    return {
        position: playState === 1 ? position : duration,
        duration,
        paused,
        playing: playState === 1,
        timestamp: Date.now()
    };
};

export default audioService;
