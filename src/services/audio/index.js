const EventEmitter = require('events');

class Audio extends EventEmitter {}

const audioService = {};

audioService.create = () => {
    audio.soundManager = require('soundmanager2').soundManager;
    audio.soundManager.setup({
        preferFlash: false,
        consoleOnly: false,
        //html5PollingInterval: 50,
        onready() {
            console.log('sm2 ready', audio.soundManager);
        },
        onerror(errorCode, description) {
            console.log('sm2 init error', description);
        },
        ontimeout() {
            console.log('sm2 failed to init');
        }
    });
    return audio;
};

const audio = new Audio();

audio.load = url => new Promise((resolve, reject) => {
    const options = {
        url,
        autoLoad: true,
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
    else audio.sound = audio.soundManager.createSound(options);
});

audio.play = ({ url = null, position = null }) => new Promise((resolve, reject) => {
    const options = {
        from: position,
        onplay: () => {
            console.log('onplay');
            resolve(audio.sound);
        },
        whileplaying: () => {
            audio.emit('progress', audio.sound.position);
        },
        onerror: (errorCode, description) => {
            console.log('play error');
            reject(description);
        },
        ontimeout: () => {
            console.log('play timed out');
            reject();
        }
    };
    if(url || !audio.sound) audio.load(url).then(audio.sound.play(options));
    else audio.sound.play(options);
});

export default audioService;
