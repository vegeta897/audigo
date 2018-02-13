import get from 'lodash/get';
import { initialState, initialStudioState, getStudioState, getInfo, getClip } from './selectors';
import {
    RECORDER_START_SUCCESS,
    RECORDER_STOP_SUCCESS,
    STUDIO_GET_INPUT,
    STUDIO_CLEAR
} from './actions';

export default (state = initialState, { type, payload, meta }) => {
    const studio = get(meta, 'studio');

    if(!studio) {
        return state;
    }

    switch(type) {
        case RECORDER_START_SUCCESS:
            return {
                ...state,
                [studio]: {
                    info: {
                        status: 'recording'
                    }
                }
            };
        case RECORDER_STOP_SUCCESS:
            let timestamp = new Date(payload.startTime).toISOString()
                .substr(0, 19)
                .replace('T', '_')
                .replace(/:/g, '-');
            return {
                ...state,
                [studio]: {
                    info: {
                        status: 'recorded'
                    },
                    clip: {
                        ...payload,
                        title: '',
                        fileName: `recording-${timestamp}.${payload.fileType}`,
                        fileUrl: URL.createObjectURL(payload.file)
                    }
                }
            };
        case STUDIO_GET_INPUT:
            let file = payload.files[0];
            return {
                ...state,
                [studio]: {
                    info: {
                        status: 'file'
                    },
                    clip: {
                        file,
                        title: file.name.split('.').slice(0, -1).join(' ').replace(/[-_]/g,' '),
                        fileName: file.name,
                        fileUrl: URL.createObjectURL(file),
                        startTime: Date.now()
                    }
                }
            };
        case STUDIO_CLEAR:
            return {
                ...state,
                [studio]: initialStudioState
            };
        default:
            return state;
    }
};
