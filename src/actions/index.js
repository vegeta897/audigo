import * as API from './../api';

export const RECORDER_START = 'RECORDER_START';
export const RECORDER_STOP = 'RECORDER_STOP';
export const RECORDER_PAUSE = 'RECORDER_PAUSE';
export const RECORDER_RESUME = 'RECORDER_RESUME';
export const STAGE_NEW = 'STAGE_NEW';
export const UPLOAD_STATUS = 'UPLOAD_STATUS';
export const GET_STATUS = 'GET_STATUS';

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
    return { type: UPLOAD_STATUS, status }
};

export const uploadAudio = (file, fileName) => dispatch => {
    dispatch(uploadStatus('uploading'));
    API.upload(file, fileName)
        .then(res => {
            console.log(res);
            // setTimeout(dispatch, 2000, uploadStatus('success')); // Simulate load time
            dispatch(uploadStatus('success'));
        })
        .catch(err => {
            console.error(err);
            dispatch(uploadStatus('error'));
        });
};

export const getStatus = (status, audio) => {
    return { type: GET_STATUS, status, audio }
};

export const getAudio = id => dispatch => {
    dispatch(getStatus('getting'));
    API.get(id)
        .then(res => {
            console.log(res);
            dispatch(getStatus('success', res.customHeaders));
        })
        .catch(err => {
            console.error(err);
            dispatch(getStatus('error', null));
        });
};

export const studioActions = {
    recorderStart, recorderStop, recorderPause, recorderResume, stageNew, uploadAudio
};

export const viewActions = {
    getAudio
};