import { initialState, getState, getId, getClip } from './selectors';
import {
    PLAYER_PLAY_REQUEST,
    PLAYER_PLAY_SUCCESS,
    PLAYER_PAUSE_REQUEST,
    PLAYER_SEEK_REQUEST,
    PLAYER_STATUS_UPDATE
} from './actions';

export default (state = initialState, { type, payload }) => {
    const { id, position, duration, paused, playing, timestamp } = payload || {};
    switch(type) {
        case PLAYER_STATUS_UPDATE:
            return {
                ...state,
                // [id]: {
                //     position: position || getClip(state, id).position,
                //     duration: duration || getClip(state, id).duration
                // },
                position: position || getState(state).position,
                duration: duration || getState(state).duration,
                paused,
                playing,
                // playStatus: playStatus || getState(state).playStatus,
                timestamp
            };
        case PLAYER_PLAY_REQUEST:
            return {
                ...state,
                id
            };
        case PLAYER_PAUSE_REQUEST:
            if(state.id !== id) return state;
            return {
                ...state
            };
        case PLAYER_SEEK_REQUEST:
            if(state.id !== id) return state;
            return {
                ...state,
                command: { seek: position }
            };
    }
    return state;
};
