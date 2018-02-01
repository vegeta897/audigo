import { 
    RECORDER_START,
    RECORDER_STOP,
    RECORDER_PAUSE,
    RECORDER_RESUME,
    STAGE_NEW,
    STAGE_CLEAR,
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
    fileUrl: null,
    fileName: null
};

export const stageReducer = (state = INIT_STAGE, action) => {
    switch(action.type) {
        case STAGE_NEW:
            return {
                source: action.source,
                duration: action.duration,
                fileUrl: action.fileUrl,
                fileName: action.fileName,
                title: action.source === 'upload' ? 
                    action.fileName.split('.').slice(0, -1).join(' ').replace(/[-_]/g,' ') 
                    : new Date().toISOString().substr(0, 19).replace(/T/,' ')
            };
        case STAGE_CLEAR:
            return INIT_STAGE;
        default:
            return state;
    }
};

export const uploadReducer = (state = { status: 'none' }, action) => {
    switch(action.type) {
        case UPLOAD_STATUS:
            return {
                status: action.status,
                id: action.id
            };
        default:
            return state;
    }
};