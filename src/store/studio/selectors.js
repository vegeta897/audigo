export const initialState = {};

export const initialStudioState = {
    clip: null,
    info: {}
};

export const getStudioState = (state = initialState, studio) => state[studio] || initialStudioState;

export const getClip = (state = initialState, studio) =>
    getStudioState(state, studio).clip;

export const getInfo = (state = initialState, studio) =>
    getStudioState(state, studio).info;
