export const initialState = {
    playing: null,
    playStatus: 'STOPPED', // Audio.status.STOPPED
    volume: 100
};

export const initialClipState = {
    position: null,
    duration: null
};

export const getState = (state = initialState) => state;

export const getPlaying = (state = initialState) => state.playing;

export const getClip = (state = initialState, clip) => state[clip] || initialClipState;

export const getPlayingClip = (state = initialState) => state[state.playing] || initialClipState;
