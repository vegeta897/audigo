import {
    GET_STATUS
} from "../actions";

const INIT_PLAY = {
    status: 'none',
    audio: {}
};

export const playReducer = (state = INIT_PLAY, action) => {
    switch(action.type) {
        case GET_STATUS:
            if(action.status !== 'success') return { ...state, status: action.status };
            return {
                status: action.status,
                audio: action.audio
            };
        default:
            return state;
    }
};