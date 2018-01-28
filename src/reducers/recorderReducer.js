import { RECORDER_START, RECORDER_STOP } from "../actions/TYPES";

const recorderReducer = (state = 'none', action) => {
    switch(action.type) {
        case RECORDER_START:
            return 'start';
        case RECORDER_STOP:
            return 'stop';
        default:
            return state;
    }
};

export default recorderReducer;