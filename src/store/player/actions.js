export const PLAYER_STATUS_UPDATE = 'PLAYER_STATUS_UPDATE';
export const PLAYER_PLAY_REQUEST = 'PLAYER_PLAY_REQUEST';
export const PLAYER_PLAY_SUCCESS = 'PLAYER_PLAY_SUCCESS';
export const PLAYER_PLAY_FAILURE = 'PLAYER_PLAY_FAILURE';
export const PLAYER_POSITION_UPDATE = 'PLAYER_POSITION_UPDATE';
export const PLAYER_PAUSE_REQUEST = 'PLAYER_PAUSE_REQUEST';
export const PLAYER_SEEK_REQUEST = 'PLAYER_SEEK_REQUEST';

export const playerStatusUpdate = (id, { playStatus, position, duration }) => ({
    type: PLAYER_STATUS_UPDATE,
    payload: {
        id,
        playStatus,
        position,
        duration,
        updatedAt: Date.now()
    }
});

export const playerPlayRequest = ({ url, position }) => ({
    type: PLAYER_PLAY_REQUEST,
    payload: {
        url,
        position
    },
    meta: {
        thunk: `playerPlay`
    }
});

export const playerPlaySuccess = (thunk) => ({
    type: PLAYER_PLAY_SUCCESS,
    meta: {
        thunk
    }
});

export const playerPlayFailure = (error, thunk) => ({
    type: PLAYER_PLAY_FAILURE,
    error: true,
    payload: error,
    meta: {
        thunk
    }
});

export const playerPositionUpdate = (position) => ({
    type: PLAYER_POSITION_UPDATE,
    payload: {
        position
    }
});

export const playerPauseRequest = (id) => ({
    type: PLAYER_PAUSE_REQUEST,
    payload: {
        id
    }
});

export const playerSeekRequest = (id, { position }) => ({
    type: PLAYER_SEEK_REQUEST,
    payload: {
        id,
        position
    }
});
