import { maxUploadSize } from 'config';
import { initialState, getStudioState, getInfo, getClip } from './selectors';
import {
    RECORDER_START_SUCCESS,
    RECORDER_STOP_SUCCESS,
    STUDIO_GET_INPUT,
    STUDIO_CLEAR,
    STUDIO_ON_UPLOAD
} from './actions';

export default (state = initialState, { type, payload }) => {
    switch(type) {
        case RECORDER_START_SUCCESS:
            return {
                ...state,
                info: {
                    status: 'recording'
                }
            };
        case RECORDER_STOP_SUCCESS:
            let timestamp = new Date(payload.startTime).toISOString()
                .substr(0, 19)
                .replace('T', '_')
                .replace(/:/g, '-');
            return {
                ...state,
                info: {
                    status: 'recorded'
                },
                clip: {
                    ...payload,
                    title: '',
                    fileName: `recording-${timestamp}.${payload.fileType}`,
                    url: URL.createObjectURL(payload.file)
                }
            };
        case STUDIO_GET_INPUT:
            let file = payload.files[0];
            let info = {
                status: 'file'
            };
            let clip = state.clip;
            if(file.size > maxUploadSize) {
                info.error = 'size';
                clip = null;
            } else {
                clip = {
                    file,
                    title: file.name.split('.').slice(0, -1).join(' ').replace(/[-_]/g,' '),
                    fileName: file.name,
                    url: URL.createObjectURL(file),
                    startTime: Date.now()
                }
            }
            return {
                info,
                clip
            };
        case STUDIO_CLEAR:
            return {
                ...initialState
            };
        case STUDIO_ON_UPLOAD:
            return {
                ...state,
                info: {
                    status: 'uploaded'
                },
                clip: {
                    ...getClip(state),
                    id: payload
                }
            };
        default:
            return state;
    }
};
