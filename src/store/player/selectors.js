export const initialState = {
    playing: null,
    status: null
};

export const getState = (state = initialState) => state;

export const getPlaying = (state = initialState) => state.playing;
