export const RECORDER_START_REQUEST = 'RECORDER_START_REQUEST';
export const RECORDER_START_SUCCESS = 'RECORDER_START_SUCCESS';
export const RECORDER_START_FAILURE = 'RECORDER_START_FAILURE';

export const recorderStartRequest = () => ({
    type: RECORDER_START_REQUEST,
    meta: {
        thunk: `recorderStart`
    }
});

// Called by saga
export const recorderStartSuccess = (info, thunk) => ({
    type: RECORDER_START_SUCCESS,
    payload: info,
    meta: {
        thunk
    }
});

// Called by saga
export const recorderStartFailure = (error, thunk) => ({
    type: RECORDER_START_FAILURE,
    error: true,
    payload: error,
    meta: {
        thunk
    }
});

export const RECORDER_STOP_REQUEST = 'RECORDER_STOP_REQUEST';
export const RECORDER_STOP_SUCCESS = 'RECORDER_STOP_SUCCESS';
export const RECORDER_STOP_FAILURE = 'RECORDER_STOP_FAILURE';
// TODO: Pause and resume actions, error action (any error while recording)

export const recorderStopRequest = () => ({
    type: RECORDER_STOP_REQUEST,
    meta: {
        thunk: `recorderStop`
    }
});

// Called by saga
export const recorderStopSuccess = (recording, thunk) => ({
    type: RECORDER_STOP_SUCCESS,
    payload: recording,
    meta: {
        thunk
    }
});

// Called by saga
export const recorderStopFailure = (error, thunk) => ({
    type: RECORDER_STOP_FAILURE,
    error: true,
    payload: error,
    meta: {
        thunk
    }
});

export const STUDIO_GET_INPUT = 'STUDIO_GET_INPUT';
export const STUDIO_CLEAR = 'STUDIO_CLEAR';
export const STUDIO_ON_UPLOAD = 'STUDIO_ON_UPLOAD';

export const recorderGetInput = (input) => ({
    type: STUDIO_GET_INPUT,
    payload: input
});

export const studioClear = (studio) => ({
    type: STUDIO_CLEAR
});

export const studioOnUpload = (id) => ({
    type: STUDIO_ON_UPLOAD,
    payload: id
});
