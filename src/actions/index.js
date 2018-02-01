import * as API from './../api';

export const RECORDER_START = 'RECORDER_START';
export const RECORDER_STOP = 'RECORDER_STOP';
export const RECORDER_PAUSE = 'RECORDER_PAUSE';
export const RECORDER_RESUME = 'RECORDER_RESUME';
export const STAGE_NEW = 'STAGE_NEW';
export const STAGE_CLEAR = 'STAGE_CLEAR';
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

export const stageClear = () => {
    return { type: STAGE_CLEAR };
};

export const uploadStatus = (status, id) => {
    return { type: UPLOAD_STATUS, status, id }
};

export const uploadAudio = (file, fileName, title) => (dispatch, getState) => {
    if(getState().upload.status === 'uploading') return;
    dispatch(uploadStatus('uploading'));
    API.upload(file, fileName, title)
        .then(res => {
            console.log(res);
            dispatch(uploadStatus('success', res.res.id));
        })
        .catch(err => {
            console.error(err);
            dispatch(uploadStatus('error'));
        });
};

export const getStatus = (status, audio) => {
    return { type: GET_STATUS, status, audio }
};

export const getAudio = id => (dispatch, getState) => {
    dispatch(getStatus('getting'));
    API.get(id)
        .then(res => {
            console.log(res);
            res.customHeaders.url = URL.createObjectURL(res.res);
            dispatch(getStatus('success', res.customHeaders));
        })
        .catch(err => {
            console.error(err);
            dispatch(getStatus('error', null));
        });
};

export const studioActions = {
    recorderStart, recorderStop, recorderPause, recorderResume, stageNew, stageClear, uploadAudio
};

export const viewActions = {
    getAudio
};