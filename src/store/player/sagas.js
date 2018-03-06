import { put, call, take, takeEvery, takeLatest, cancelled } from 'redux-saga/effects';
import { eventChannel, delay, END } from 'redux-saga';
import * as actions from './actions';

function createAudioChannel(audio) {
    return eventChannel(emit => {
        const progressHandler = position => emit({ position });
        const stopHandler = () => emit(END);
        audio.on('progress', progressHandler);
        audio.on('stop', stopHandler);
        return () => {
            audio.removeListener('progress', progressHandler);
            audio.removeListener('stop', stopHandler);
        }
    });
}

export function* play(audio, payload, { thunk }) {
    const audioChannel = yield call(createAudioChannel, audio);
    try {
        yield call([audio, audio.play], payload);
        yield put(actions.playerPlaySuccess(thunk));
        while(true) {
            const payload = yield take(audioChannel);
            yield put(actions.playerPositionUpdate(payload));
        }
    } catch(e) {
        yield put(actions.playerPlayFailure(e, thunk));
    } finally {
        if(yield cancelled()) {
            audioChannel.close();
        }
    }
}

export function* watchPlayRequest(audio, { payload, meta }) {
    yield call(play, audio, payload, meta);
}

export default function* ({ audio }) {
    yield takeLatest(actions.PLAYER_PLAY_REQUEST, watchPlayRequest, audio);
}
