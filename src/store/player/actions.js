export const PLAYER_STATUS_UPDATE = 'PLAYER_STATUS_UPDATE';
export const PLAYER_CLIP_PLAY = 'PLAYER_CLIP_PLAY';
export const PLAYER_CLIP_PAUSE = 'PLAYER_CLIP_PAUSE';

export const playerStatusUpdate = (id, { playStatus, progress }) => ({
    type: PLAYER_STATUS_UPDATE,
    payload: {
        id,
        playStatus,
        progress
    }
});

export const playerClipPlay = () => ({
    type: PLAYER_CLIP_PLAY,
    payload: {
        command: 'play'
    }
});

export const playerClipPause = id => ({
    type: PLAYER_CLIP_PAUSE,
    payload: {
        id,
        status: 'paused'
    }
});
