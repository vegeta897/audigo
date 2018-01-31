// Records live microphone data
// Based on https://github.com/hackingbeauty/react-mic/blob/master/src/libs/MicrophoneRecorder.js

export const BROWSER_SUPPORTED = navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
const FILE_TYPE = MediaRecorder.isTypeSupported('audio/ogg;codecs=opus') ? 'ogg' : 'webm';
const AUDIO_CTX = new AudioContext();

let stream, chunks = [], blob, blobUrl, mediaRecorder, _onStop;

navigator.mediaDevices.getUserMedia({ audio: true }).then(_stream => stream = _stream);

export const start = () => {
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
        blob = new Blob(chunks, { type: 'audio/' + FILE_TYPE + '; codecs=opus' });
        chunks = [];
        blobUrl = URL.createObjectURL(blob);
        _onStop('microphone', Date.now() - startTime, blobUrl, FILE_TYPE);
    };
};

export const pause = () => mediaRecorder && mediaRecorder.pause();
export const resume = () => mediaRecorder && mediaRecorder.resume();
export const stop = () => mediaRecorder && mediaRecorder.stop();
export const onStop = (cb) => _onStop = cb;
export const getBlob = () => blob;