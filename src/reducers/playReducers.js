import {
    GET_STATUS
} from "../actions";

const INIT_PLAY = {
    status: 'none',
    audio: null
};

export const playReducer = (state = INIT_PLAY, action) => {
    switch(action.type) {
        case GET_STATUS:
            if(action.status === 'error') return { status: action.status, ...state };
            return {
                status: action.status,
                audio: action.audio
            };
        default:
            return state;
    }
};