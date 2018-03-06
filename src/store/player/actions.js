export const PLAYER_STATUS_UPDATE = 'PLAYER_STATUS_UPDATE';
export const PLAYER_PLAY_REQUEST = 'PLAYER_PLAY_REQUEST';
export const PLAYER_PLAY_SUCCESS = 'PLAYER_PLAY_SUCCESS';
export const PLAYER_PLAY_FAILURE = 'PLAYER_PLAY_FAILURE';
export const PLAYER_PAUSE_REQUEST = 'PLAYER_PAUSE_REQUEST';
export const PLAYER_PAUSE_SUCCESS = 'PLAYER_PAUSE_SUCCESS';
export const PLAYER_PAUSE_FAILURE = 'PLAYER_PAUSE_FAILURE';
export const PLAYER_SEEK_REQUEST = 'PLAYER_SEEK_REQUEST';

export const playerStatusUpdate = (status) => ({
    type: PLAYER_STATUS_UPDATE,
    payload: {
        ...status
    }
});

export const playerPlayRequest = ({ id, url, position }) => ({
    type: PLAYER_PLAY_REQUEST,
    payload: {
        id,
        url,
        position
    },
    meta: {
        thunk: `playerPlay`
    }
});

export const playerPlaySuccess = (thunk) => ({
    type: PLAYER_PLAY_SUCCESS,
    meta: { thunk }
});

export const playerPlayFailure = (error, thunk) => ({
    type: PLAYER_PLAY_FAILURE,
    error: true,
    payload: error,
    meta: { thunk }
});

export const playerPauseRequest = ({ id }) => ({
    type: PLAYER_PAUSE_REQUEST,
    payload: {
        id
    },
    meta: {
        thunk: `playerPause`
    }
});

export const playerPauseSuccess = (thunk) => ({
    type: PLAYER_PAUSE_SUCCESS,
    meta: { thunk }
});

export const playerPauseFailure = (error, thunk) => ({
    type: PLAYER_PAUSE_FAILURE,
    error: true,
    payload: error,
    meta: { thunk }
});

export const playerSeekRequest = (id, { position }) => ({
    type: PLAYER_SEEK_REQUEST,
    payload: {
        id,
        position
    }
});
