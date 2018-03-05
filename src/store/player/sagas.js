import { put, call, take, takeEvery } from 'redux-saga/effects';
import { eventChannel, delay } from 'redux-saga';
import * as actions from './actions';

function createAudioChannel(audio) {
    return eventChannel(emit => {
        const progressHandler = position => emit({ position });
        audio.on('progress', progressHandler);
        return () => audio.removeEventListener('progress', progressHandler);
    });
}

export function* play(audio, payload, { thunk }) {
    yield delay(1000);
    try {
        yield call([audio, audio.play], payload);
        yield put(actions.playerPlaySuccess(thunk));
        const audioChannel = yield call(createAudioChannel, audio);
        while(true) {
            const payload = yield take(audioChannel);
            yield put(actions.playerPositionUpdate(payload));
        }
    } catch(e) {
        yield put(actions.playerPlayFailure(e, thunk));
    }
}

export function* watchPlayRequest(audio, { payload, meta }) {
    yield call(play, audio, payload, meta);
}

export default function* ({ audio }) {
    yield takeEvery(actions.PLAYER_PLAY_REQUEST, watchPlayRequest, audio);
}
