import { initialState, getState, getPlaying, getClip } from './selectors';
import {
    PLAYER_PLAY_REQUEST,
    PLAYER_PAUSE_REQUEST,
    PLAYER_SEEK_REQUEST,
    PLAYER_STATUS_UPDATE,
    PLAYER_POSITION_UPDATE
} from './actions';

export default (state = initialState, { type, payload }) => {
    const { id, position, duration, playStatus, updatedAt } = payload || {};
    switch(type) {
        case PLAYER_STATUS_UPDATE:
            return {
                ...state,
                [id]: {
                    position: position || getClip(state, id).position,
                    duration: duration || getClip(state, id).duration
                },
                playing: id || getPlaying(state),
                position: position || getState(state).position,
                duration: duration || getState(state).duration,
                playStatus: playStatus || getState(state).playStatus,
                updatedAt
            };
        case PLAYER_POSITION_UPDATE:
            return {
                ...state,
                position
            };
        case PLAYER_PLAY_REQUEST:
            return {
                ...state,
                playing: id
            };
        case PLAYER_PAUSE_REQUEST:
            if(state.playing !== id) return state;
            return {
                ...state
            };
        case PLAYER_SEEK_REQUEST:
            if(state.playing !== id) return state;
            return {
                ...state,
                command: { seek: position }
            };
    }
    return state;
};
