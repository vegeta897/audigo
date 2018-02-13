// Records live microphone data
const startDelay = 20;
const endDelay = 30;
let stream, fileType;

export const initDevice = () => {
    if(stream) return Promise.resolve(new MediaRecorder(stream));
    if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia
        || !MediaRecorder || !AudioContext) {
        return Promise.reject('Web Audio API not found');
    }
    return navigator.mediaDevices.getUserMedia({ audio: true })
        .then(_stream => {
            fileType = MediaRecorder.isTypeSupported('audio/ogg;codecs=opus') ? 'ogg' : 'weba';
            let audioCtx = new AudioContext();
            let source = audioCtx.createMediaStreamSource(_stream);
            let delay = audioCtx.createDelay(endDelay / 1000);
            let merger = audioCtx.createChannelMerger();
            let destination = audioCtx.createMediaStreamDestination();
            stream = destination.stream;
            source.connect(delay);
            delay.connect(merger, 0, 0); // Mono to stereo
            delay.connect(merger, 0, 1);
            merger.connect(destination);
            return new MediaRecorder(stream);
        });
};

const recorder = {};

recorder.create = () => ({
    start() {
        return initDevice()
            .then((mediaRecorder) => {
                this.mediaRecorder = mediaRecorder;
                this.chunks = [];
                this.mediaRecorder.ondataavailable = e => {
                    this.chunks.push(e.data);
                };
                return new Promise(resolve => {
                    setTimeout(() => { // Delay start to avoid click sound
                        this.mediaRecorder.start();
                        this.startTime = Date.now();
                        resolve({
                            startTime: this.startTime
                        });
                    }, startDelay + endDelay)
                })
            });
    },

    stop() {
        return new Promise((resolve, reject) => {
            if(!this.chunks) reject('Recorder was not started!');
            this.mediaRecorder.removeEventListener('dataavailable', this.chunker);
            this.mediaRecorder.onstop = e => {
                this.file = new Blob(this.chunks, { type: `audio/${fileType}; codecs=opus`});
                resolve({
                    file: this.file,
                    fileType,
                    startTime: this.startTime
                });
            };
            this.mediaRecorder.onerror = e => reject(e);
            this.mediaRecorder.stop();
        });
    },

    pause() {
        this.mediaRecorder && this.mediaRecorder.pause();
    },

    resume() {
        this.mediaRecorder && this.mediaRecorder.resume();
    }
});

export default recorder;
