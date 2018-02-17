import { initialState, getState, getClip } from './selectors';
import {
    PLAYER_CLIP_PLAY,
    PLAYER_CLIP_PAUSE,
    PLAYER_STATUS_UPDATE
} from './actions';

export default (state = initialState, { type, payload }) => {
    switch(type) {
        case PLAYER_STATUS_UPDATE:
            const { id, progress = {}, playStatus } = payload;
            return {
                ...state,
                [id]: {
                    position: progress.position || getClip(state, id).position,
                    duration: progress.duration || getClip(state, id).duration
                },
                playing: id,
                playStatus
            };
        case PLAYER_CLIP_PLAY:
        case PLAYER_CLIP_PAUSE:
            return {
                ...state,
                command: payload.command
            };
    }
    return state;
};
