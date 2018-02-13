export const initialState = {
    clip: null,
    info: {}
};

export const getStudioState = (state = initialState) => state;

export const getClip = (state = initialState) => state.clip;

export const getInfo = (state = initialState) => state.info;
