export const initialState = {
    playing: null,
    status: null
};

export const initialClipState = {
    time: null,
    percent: null
};

export const getState = (state = initialState) => state;

export const getPlaying = (state = initialState) => state.playing;

export const getClip = (state = initialState, clip) => state[clip] || initialClipState;
