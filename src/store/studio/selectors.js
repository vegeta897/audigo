export const initialState = {};

export const initialStudioState = {
    info: null,
    recording: null
};

export const getRecorderState = (state = initialState, studio) => state[studio] || initialStudioState;

export const getRecording = (state = initialState, studio) =>
    getRecorderState(state, studio).recording;

export const getInfo = (state = initialState, studio) =>
    getRecorderState(state, studio).info;
