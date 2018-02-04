// Records live microphone data

// TODO: recorder object can't be treated as a singleton, need to support multiple studios
// Look at api service, use a create() method and have recorders share a .mediaRecorder
// As long as one recorder is running, keep it active, and write chunks to whatever recorder is active

const recorder = {
    start() {
        if(this.mediaRecorder) return Promise.reject('Recorder already started!');
        if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia
            || !MediaRecorder || !AudioContext) {
            return Promise.reject('Web Audio API not found');
        }
        return navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                this.fileType = MediaRecorder.isTypeSupported('audio/ogg;codecs=opus') ? 'ogg' : 'weba';
                this.startTime = Date.now();
                let audioCtx = new AudioContext();
                let source = audioCtx.createMediaStreamSource(stream);
                let merger = audioCtx.createChannelMerger();
                let destination = audioCtx.createMediaStreamDestination();
                source.connect(merger, 0, 0); // Mono to stereo
                source.connect(merger, 0, 1);
                merger.connect(destination);
                this.chunks = [];
                this.mediaRecorder = new MediaRecorder(destination.stream);
                this.mediaRecorder.start();
                this.mediaRecorder.ondataavailable = e => this.chunks.push(e.data);
                return {
                    fileType: this.fileType,
                    startTime: this.startTime
                };
            });
    },

    stop() {
        return new Promise((resolve, reject) => {
            if(!this.mediaRecorder) reject('Recorder was not started!');
            this.mediaRecorder.onstop = e => {
                let file = new Blob(this.chunks, { type: `audio/${this.fileType}; codecs=opus`});
                resolve({
                    file,
                    duration: Date.now() - this.startTime,
                    fileUrl: URL.createObjectURL(file)
                });
            };
            this.mediaRecorder.onerror = e => {
                reject(e);
            };
            this.mediaRecorder.stop();
        });
    },

    pause() {
        this.mediaRecorder && this.mediaRecorder.pause();
    },

    resume() {
        this.mediaRecorder && this.mediaRecorder.resume();
    }
};

export default recorder;
