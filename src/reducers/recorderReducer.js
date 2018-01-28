import { RECORDER_START } from "../actions/TYPES";

const recorderReducer = (state = 'none', action) => {
    switch(action.type) {
        case RECORDER_START:
            return 'start';
        default:
            return state;
    }
};

export default recorderReducer;