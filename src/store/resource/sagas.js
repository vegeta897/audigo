import { put, call, takeEvery } from 'redux-saga/effects';
import * as actions from './actions';

export function* readResourceList(api, { params }, { resource, thunk }) {
    try {
        const list = yield call([api, api.get], `/${resource}`, { params });
        yield put(actions.resourceListReadSuccess(resource, list, { params }, thunk));
    } catch(e) {
        yield put(actions.resourceListReadFailure(resource, e, { params }, thunk));
    }
}

export function* readResourceDetail(api, { params }, { resource, thunk }) {
    try {
        const detail = yield call([api, api.get], `/${resource}`, { params });
        yield put(actions.resourceDetailReadSuccess(resource, detail, { params }, thunk));
    } catch(e) {
        yield put(actions.resourceDetailReadFailure(resource, e, { params }, thunk));
    }
}

export function* watchResourceListReadRequest(api, { payload, meta }) {
    yield call(readResourceList, api, payload, meta)
}

export function* watchResourceDetailReadRequest(api, { payload, meta }) {
    yield call(readResourceDetail, api, payload, meta);
}

// Watch for these actions, call api when intercepted
export default function* ({ api }) {
    yield takeEvery(actions.RESOURCE_LIST_READ_REQUEST, watchResourceListReadRequest, api);
    yield takeEvery(actions.RESOURCE_DETAIL_READ_REQUEST, watchResourceDetailReadRequest, api);
}
