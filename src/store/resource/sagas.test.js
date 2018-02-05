import { put, call, takeEvery } from 'redux-saga/effects';
import * as actions from './actions';
import saga, * as sagas from './sagas';

const api = {
    post: () => {
    },
    get: () => {
    },
    put: () => {
    },
    delete: () => {
    }
};

const thunk = '123';
const resource = 'resources';
const meta = { thunk, resource };

describe('readResourceList', () => {
    const payload = { params: { limit: 1 } };

    it('calls success', () => {
        const detail = [1, 2, 3];
        const generator = sagas.readResourceList(api, payload, meta);
        expect(generator.next().value)
            .toEqual(call([api, api.get], `/${resource}`, payload));
        expect(generator.next(detail).value)
            .toEqual(put(actions.resourceListReadSuccess(resource, detail, payload, thunk)));
    });

    it('calls failure', () => {
        const generator = sagas.readResourceList(api, payload, meta);
        expect(generator.next().value)
            .toEqual(call([api, api.get], `/${resource}`, payload));
        expect(generator.throw('test').value)
            .toEqual(put(actions.resourceListReadFailure(resource, 'test', payload, thunk)));
    });
});

describe('readResourceDetail', () => {
    const payload = { id: 1 };

    it('calls success', () => {
        const detail = 'foo';
        const generator = sagas.readResourceDetail(api, payload, meta);
        expect(generator.next().value)
            .toEqual(call([api, api.get], `/${resource}/1`));
        expect(generator.next(detail).value)
            .toEqual(put(actions.resourceDetailReadSuccess(resource, detail, payload, thunk)));
    });

    it('calls failure', () => {
        const generator = sagas.readResourceDetail(api, payload, meta);
        expect(generator.next().value)
            .toEqual(call([api, api.get], `/${resource}/1`));
        expect(generator.throw('test').value)
            .toEqual(put(actions.resourceDetailReadFailure(resource, 'test', payload, thunk)));
    })
});

test('watchResourceListReadRequest', () => {
    const payload = { params: { limit: 1 } };
    const generator = sagas.watchResourceListReadRequest(api, { payload, meta });
    expect(generator.next().value)
        .toEqual(call(sagas.readResourceList, api, payload, meta));
});

test('watchResourceDetailReadRequest', () => {
    const payload = { id: 1 };
    const generator = sagas.watchResourceDetailReadRequest(api, { payload, meta });
    expect(generator.next().value)
        .toEqual(call(sagas.readResourceDetail, api, payload, meta))
});

test('saga', () => {
    const generator = saga({ api });
    expect(generator.next().value).toEqual(takeEvery(actions.RESOURCE_DETAIL_READ_REQUEST, sagas.watchResourceDetailReadRequest, api));
});
