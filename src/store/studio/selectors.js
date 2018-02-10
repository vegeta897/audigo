export const initialState = {};

export const initialStudioState = {
    clip: null,
    info: null
};

export const getRecorderState = (state = initialState, studio) => state[studio] || initialStudioState;

export const getClip = (state = initialState, studio) =>
    getRecorderState(state, studio).clip;

export const getInfo = (state = initialState, studio) =>
    getRecorderState(state, studio).info;
