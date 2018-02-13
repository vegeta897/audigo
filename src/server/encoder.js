import fs from 'fs-extra';
import path from 'path';
import Promise from 'bluebird';
import ffmpeg from 'fluent-ffmpeg';
const ffprobe = Promise.promisify(require('fluent-ffmpeg').ffprobe);

ffmpeg.getAvailableEncoders((err, encoders) => {
    if(err || !encoders[fileCodec]) {
        console.error(err || `${fileCodec} encoder not found!`);
        process.exit(1);
    }
});

// https://github.com/fluent-ffmpeg/node-fluent-ffmpeg/issues/710
const promisifyCommand = command => {
    return Promise.promisify(cb => {
        command
            .on('end', () => cb(null)) // Null first argument means no error
            .on('error', error => cb(error));
    });
};

const fileType = '.mp3';
const fileCodec = 'libmp3lame';

const probe = path => ffprobe(path).then(info => ({
    duration: Math.ceil(info.streams[0].duration * 1000),
    fileSize: Math.ceil(fs.statSync(path).size / 1024)
}));

const encode = (inPath, outPath) => {
    outPath += fileType;
    if(path.extname(inPath) === fileType) return probe(inPath);
    let command = promisifyCommand(ffmpeg(inPath).audioCodec(fileCodec).save(outPath));
    return command()
        .then(() => fs.remove(inPath))
        .then(() => probe(outPath));
};

export default encode;
