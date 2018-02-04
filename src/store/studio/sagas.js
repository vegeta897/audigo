import { put, call, takeEvery } from 'redux-saga/effects';
import * as actions from './actions';

export function* startRecording(recorder, { studio, thunk }) {
    try {
        const info = yield call([recorder, recorder.start]);
        yield put(actions.recorderStartSuccess(studio, info, thunk));
    } catch(e) {
        yield put(actions.recorderStartFailure(studio, e, thunk));
    }
}

export function* stopRecording(recorder, { studio, thunk }) {
    try {
        const recording = yield call([recorder, recorder.stop]);
        yield put(actions.recorderStopSuccess(studio, recording, thunk));
    } catch(e) {
        yield put(actions.recorderStopFailure(studio, e, thunk));
    }
}

export function* watchStartRecordingRequest(recorder, { meta }) {
    yield call(startRecording, recorder, meta);
}

export function* watchStopRecordingRequest(recorder, { meta }) {
    yield call(stopRecording, recorder, meta);
}

// Watch for these actions, call recorder when intercepted
export default function* ({ recorder }) {
    yield takeEvery(actions.RECORDER_START_REQUEST, watchStartRecordingRequest, recorder);
    yield takeEvery(actions.RECORDER_STOP_REQUEST, watchStopRecordingRequest, recorder);
}

// TODO: Error saga initiated by start request