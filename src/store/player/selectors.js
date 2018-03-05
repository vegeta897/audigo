export const initialState = {
    playing: null,
    playStatus: 'STOPPED', // Audio.status.STOPPED
    position: 0,
    duration: null,
    volume: 100,
    command: {}
};

export const initialClipState = {
    position: 0,
    duration: null
};

export const getState = (state = initialState) => state;

export const getPlaying = (state = initialState) => state.playing;

export const getCommand = (state = initialState) => state.command;

export const getClip = (state = initialState, clip) => state[clip] || initialClipState;

export const getPlayingClip = (state = initialState) => state[state.playing] || initialClipState;
