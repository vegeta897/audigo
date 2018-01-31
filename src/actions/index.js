export const RECORDER_START = 'RECORDER_START';
export const RECORDER_STOP = 'RECORDER_STOP';
export const RECORDER_PAUSE = 'RECORDER_PAUSE';
export const RECORDER_RESUME = 'RECORDER_RESUME';
export const STAGE_NEW = 'STAGE_NEW';
export const UPLOAD_STATUS = 'UPLOAD_STATUS';

const API = process.env.API_HOST + ':' + process.env.API_PORT + '/api/';

export const recorderStart = () => {
    return { type: RECORDER_START };
};

export const recorderStop = () => {
    return { type: RECORDER_STOP };
};

export const recorderPause = () => {
    return { type: RECORDER_PAUSE };
};

export const recorderResume = () => {
    return { type: RECORDER_RESUME };
};

export const stageNew = (source, duration, fileUrl, fileName) => {
    return { type: STAGE_NEW, source, duration, fileUrl, fileName };
};

export const uploadStatus = (status) => {
    return {
        type: UPLOAD_STATUS,
        status
    }
};

export const uploadAudio = (file, fileName) => dispatch => {
    dispatch(uploadStatus('uploading'));
    let fd = new FormData();
    fd.append('audio', file, fileName);
    fetch(API + 'upload', { method: 'post', body: fd })
        .then(res => res.json())
        .then(res => {
            if(res.error) throw Error(res.error);
            return res;
        })
        .then(res => {
            console.log(res);
            // setTimeout(dispatch, 2000, uploadStatus('success')); // Simulate load time
            dispatch(uploadStatus('success'));
        })
        .catch(err => {
            console.log(err);
            dispatch(uploadStatus('error'));
        });
};

export const studioActions = {
    recorderStart, recorderStop, recorderPause, recorderResume, stageNew, uploadAudio
};