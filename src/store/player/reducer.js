import { initialState, getState } from './selectors';
import {
    PLAYER_CLIP_PLAY,
    PLAYER_STATUS_SET
} from './actions';

export default (state = initialState, { type, payload }) => {
    switch(type) {
        case PLAYER_STATUS_SET:
            const { id, progress } = payload;
            return {
                ...state,
                [id]: progress,
                status: progress.percent === 1 ? 'done' : getState(state).status
            };
        case PLAYER_CLIP_PLAY:
            return {
                ...state,
                playing: payload.id,
                status: payload.status
            }
    }
    return state;
};
