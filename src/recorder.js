// Records live microphone data
// Based on https://github.com/hackingbeauty/react-mic/blob/master/src/libs/MicrophoneRecorder.js

export const BROWSER_SUPPORTED = navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
const FILE_TYPE = MediaRecorder.isTypeSupported('audio/ogg;codecs=opus') ? 'ogg' : 'weba';
const AUDIO_CTX = new AudioContext();

let stream, chunks = [], file, fileUrl, mediaRecorder, _onFile;

export const init = () => {
    if(!stream) navigator.mediaDevices.getUserMedia({ audio: true }).then(_stream => stream = _stream);
};

export const attachInput = input => {
    input.addEventListener('change', e => {
        file = e.target.files[0];
        _onFile('file', 'unknown', URL.createObjectURL(file), file.name)
    })
};

export const start = () => {
    if(!stream) return console.error('recorder tried to start without init!');
    let startTime = Date.now();
    let source = AUDIO_CTX.createMediaStreamSource(stream);
    let merger = AUDIO_CTX.createChannelMerger();
    let dest = AUDIO_CTX.createMediaStreamDestination();
    source.connect(merger, 0, 0);
    source.connect(merger, 0, 1);
    merger.connect(dest);
    mediaRecorder = new MediaRecorder(dest.stream);
    mediaRecorder.start();
    mediaRecorder.ondataavailable = e => chunks.push(e.data);
    mediaRecorder.onstop = e => {
        file = new Blob(chunks, { type: 'audio/' + FILE_TYPE + '; codecs=opus' });
        chunks = [];
        fileUrl = URL.createObjectURL(file);
        _onFile('microphone', Date.now() - startTime, fileUrl, 'recording.' + FILE_TYPE);
    };
};

export const pause = () => mediaRecorder && mediaRecorder.pause();
export const resume = () => mediaRecorder && mediaRecorder.resume();
export const stop = () => mediaRecorder && mediaRecorder.stop();
export const onFile = (cb) => _onFile = cb;
export const getFile = () => file;