export const PLAYER_STATUS_SET = 'PLAYER_STATUS_SET';
export const PLAYER_CLIP_PLAY = 'PLAYER_CLIP_PLAY';

export const playerStatusSet = (id, { status, progress }) => ({
    type: PLAYER_STATUS_SET,
    payload: {
        id,
        status,
        progress
    }
});

export const playerClipPlay = id => ({
    type: PLAYER_CLIP_PLAY,
    payload: {
        id,
        status: 'playing'
    }
});
