export const RECORDER_START_REQUEST = 'RECORDER_START_REQUEST';
export const RECORDER_START_SUCCESS = 'RECORDER_START_SUCCESS';
export const RECORDER_START_FAILURE = 'RECORDER_START_FAILURE';

export const recorderStartRequest = (studio) => ({
    type: RECORDER_START_REQUEST,
    meta: {
        studio,
        thunk: `${studio}RecorderStart`
    }
});

// Called by saga
export const recorderStartSuccess = (studio, info, thunk) => ({
    type: RECORDER_START_SUCCESS,
    payload: info,
    meta: {
        thunk,
        studio
    }
});

// Called by saga
export const recorderStartFailure = (studio, error, thunk) => ({
    type: RECORDER_START_FAILURE,
    error: true,
    payload: error,
    meta: {
        thunk,
        studio
    }
});

export const RECORDER_STOP_REQUEST = 'RECORDER_STOP_REQUEST';
export const RECORDER_STOP_SUCCESS = 'RECORDER_STOP_SUCCESS';
export const RECORDER_STOP_FAILURE = 'RECORDER_STOP_FAILURE';

export const recorderStopRequest = (studio) => ({
    type: RECORDER_STOP_REQUEST,
    meta: {
        studio,
        thunk: `${studio}RecorderStop`
    }
});

// Called by saga
export const recorderStopSuccess = (studio, recording, thunk) => ({
    type: RECORDER_STOP_SUCCESS,
    payload: recording,
    meta: {
        thunk,
        studio
    }
});

// Called by saga
export const recorderStopFailure = (studio, error, thunk) => ({
    type: RECORDER_STOP_FAILURE,
    error: true,
    payload: error,
    meta: {
        thunk,
        studio
    }
});

export const STUDIO_GET_INPUT = 'STUDIO_GET_INPUT';
export const STUDIO_CLEAR = 'SUDIO_CLEAR';

export const recorderGetInput = (studio, input) => ({
    type: STUDIO_GET_INPUT,
    payload: input,
    meta: {
        studio
    }
});

export const studioClear = (studio) => ({
    type: STUDIO_CLEAR,
    meta: {
        studio
    }
});

// TODO: Pause and resume actions, error action (any error while recording)
