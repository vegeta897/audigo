import get from 'lodash/get';
import { initialState, getRecorderState, getInfo, getClip } from './selectors';
import {
    RECORDER_START_REQUEST,
    RECORDER_START_SUCCESS,
    RECORDER_STOP_REQUEST,
    RECORDER_STOP_SUCCESS,
    RECORDER_GET_INPUT
} from './actions';

export default (state = initialState, { type, payload, meta }) => {
    const studio = get(meta, 'studio');

    if(!studio) {
        return state;
    }

    switch(type) {
        case RECORDER_START_REQUEST:
            return {
                ...state,
                [studio]: {
                    ...getRecorderState(state, studio),
                    info: getInfo(initialState, studio)
                }
            };
        case RECORDER_START_SUCCESS:
            return {
                ...state,
                [studio]: {
                    ...getRecorderState(state, studio),
                    info: payload
                }
            };
        case RECORDER_STOP_REQUEST:
            return {
                ...state,
                [studio]: {
                    ...getRecorderState(state, studio),
                    clip: getClip(initialState, studio)
                }
            };
        case RECORDER_STOP_SUCCESS:
            return {
                ...state,
                [studio]: {
                    ...getRecorderState(state, studio),
                    clip: payload
                }
            };
        case RECORDER_GET_INPUT:
            let file = payload.files[0];
            return {
                ...state,
                [studio]: {
                    ...getRecorderState(state, studio),
                    clip: {
                        file,
                        fileUrl: URL.createObjectURL(file)
                    }
                }
            };
        default:
            return state;
    }
};
