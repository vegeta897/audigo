import { protocol, host, port } from '../config';

export const downloadPath = '/download';

const downloadUrl = protocol + host + ':' + port + downloadPath;

const clipData = [
    {
        id: 1,
        title: 'finger drumming'
    },
    {
        id: 2,
        title: 'test'
    }
];

export const models = new Map();

models.set('clips', ({ id, limit }) => {
    if(id) {
        let clip = clipData[id - 1];
        if(!clip) return res.status(404).send('Clip not found');
        return { ...clip, url: `${downloadUrl}/${clip.id}.mp3` };
    } else {
        limit = parseInt(limit) > 0 ? parseInt(limit) : 20;
        return clipData.slice(0, limit);
    }
});
