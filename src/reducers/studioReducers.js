import { 
    RECORDER_START,
    RECORDER_STOP,
    RECORDER_PAUSE,
    RECORDER_RESUME,
    STAGE_NEW,
    UPLOAD_STATUS
} from "../actions";

export const recorderReducer = (state = 'none', action) => {
    switch(action.type) {
        case RECORDER_START:
            return 'start';
        case RECORDER_STOP:
            return 'stop';
        case RECORDER_PAUSE:
            return 'pause';
        case RECORDER_RESUME:
            return 'resume';
        default:
            return state;
    }
};

const INIT_STAGE = {
    source: null,
    duration: null,
    blobUrl: null,
    fileType: null
};

export const stageReducer = (state = INIT_STAGE, action) => {
    switch(action.type) {
        case STAGE_NEW:
            return {
                source: action.source,
                duration: action.duration,
                blobUrl: action.blobUrl,
                fileType: action.fileType
            };
        default:
            return state;
    }
};

export const uploadReducer = (state = 'none', action) => {
    switch(action.type) {
        case UPLOAD_STATUS:
            return action.status;
        default:
            return state;
    }
};

export default uploadReducer;