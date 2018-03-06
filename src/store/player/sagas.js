import { put, call, take, takeEvery, takeLatest, cancelled, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import * as actions from './actions';
import { isBrowser } from 'config';

function createAudioChannel(audio) {
    return eventChannel(emit => {
        const statusHandler = status => emit(status);
        audio.on('status', statusHandler);
        return () => audio.removeListener('progress', statusHandler);
    });
}

export function* status(audio) {
    const audioChannel = yield call(createAudioChannel, audio);
    try {
        while(true) {
            const status = yield take(audioChannel);
            yield put(actions.playerStatusUpdate(status));
        }
    } catch(e) {
        console.error(e);
    } finally {
        if(yield cancelled()) audioChannel.close();
    }
}

export function* play(audio, payload, { thunk }) {
    try {
        yield call([audio, audio.play], payload);
        yield put(actions.playerPlaySuccess(thunk));
    } catch(e) {
        yield put(actions.playerPlayFailure(e, thunk));
    }
}

export function* pause(audio, payload, { thunk }) {
    try {
        yield call([audio, audio.pause]);
        yield put(actions.playerPauseSuccess(thunk));
    } catch(e) {
        yield put(actions.playerPauseFailure(e, thunk));
    }
}

export function* watchPlayRequest(audio, { payload, meta }) {
    yield call(play, audio, payload, meta);
}

export function* watchPauseRequest(audio, { payload, meta }) {
    yield call(pause, audio, payload, meta);
}

export default function* ({ audio }) {
    if(isBrowser) yield fork(status, audio);
    yield takeLatest(actions.PLAYER_PLAY_REQUEST, watchPlayRequest, audio);
    yield takeLatest(actions.PLAYER_PAUSE_REQUEST, watchPauseRequest, audio);
}
