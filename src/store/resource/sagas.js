import { put, call, takeEvery } from 'redux-saga/effects';
import * as actions from './actions';

export function* readResourceDetail(api, { id }, { resource, thunk }) {
    try {
        const detail = yield call([api, api.get], `/${resource}/${id}`);
        yield put(actions.resourceDetailReadSuccess(resource, detail, { id }, thunk));
    } catch(e) {
        yield put(actions.resourceDetailReadFailure(resource, e, { id }, thunk));
    }
};

export function* watchResourceDetailReadRequest(api, { payload, meta }) {
    yield call(readResourceDetail, api, payload, meta);
};

export default function* ({ api }) {
    yield takeEvery(actions.RESOURCE_DETAIL_READ_REQUEST, watchResourceDetailReadRequest, api);
};
