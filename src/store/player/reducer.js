import { initialState } from './selectors';
import {
    PLAYER_CLIP_PLAY,
    PLAYER_STATUS_SET
} from './actions';

export default (state = initialState, { type, payload }) => {
    switch(type) {
        case PLAYER_STATUS_SET:
            const { id, ...status } = payload;
            return {
                ...state,
                [id]: {
                    ...status
                }
            };
        case PLAYER_CLIP_PLAY:
            return {
                ...state,
                playing: payload.id
            }
    }
    return state;
};
