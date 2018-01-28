import { RECORDER_START, RECORDER_STOP } from './TYPES';

export const recorderStart = () => {
    return { type: RECORDER_START };
};

export const recorderStop = () => {
    return { type: RECORDER_STOP };
};