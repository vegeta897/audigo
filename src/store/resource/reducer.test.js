import { initialState, getResourceState } from './selectors';
import * as actions from './actions';
import reducer from './reducer';

const action = (type, payload, meta) => ({
    type,
    payload,
    meta: {
        resource: 'resources',
        ...meta
    }
});

const state = resourceState => ({
    ...initialState,
    resources: {
        ...getResourceState(initialState, 'resources'),
        ...resourceState
    }
});

it('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
});

describe('RESOURCE_LIST_READ_REQUEST', () => {
    it('keeps the list initial state', () => {
        expect(reducer(
            initialState,
            action(actions.RESOURCE_LIST_READ_REQUEST)
        )).toEqual(state());
    });

    it('resets the list to initial state in an existing state', () => {
        expect(reducer(
            state({ list: [1, 2, 3] }),
            action(actions.RESOURCE_LIST_READ_REQUEST)
        )).toEqual(state());
    });
});

describe('RESOURCE_LIST_READ_SUCCESS', () => {
    it('sets list in the initial state', () => {
        expect(reducer(
            initialState,
            action(actions.RESOURCE_LIST_READ_SUCCESS, [1, 2, 3])
        )).toEqual(state({ list: [1, 2, 3] }));
    });

    it('overrides list in an existing state', () => {
        expect(reducer(
            state({ list: [1, 2, 3] }),
            action(actions.RESOURCE_LIST_READ_SUCCESS, [3, 2, 1])
        )).toEqual(state({ list: [3, 2, 1] }));
    });
});

describe('RESOURCE_DETAIL_READ_REQUEST', () => {
    it('keeps the detail initial state', () => {
        expect(reducer(
            initialState,
            action(actions.RESOURCE_DETAIL_READ_REQUEST)
        )).toEqual(state())
    });

    it('resets the detail to initial state in an existing state', () => {
        expect(reducer(
            state({ detail: 1 }),
            action(actions.RESOURCE_DETAIL_READ_REQUEST)
        )).toEqual(state());
    });
});

describe('RESOURCE_DETAIL_READ_SUCCESS', () => {
    it('sets detail in the initial state', () => {
        expect(reducer(
            initialState,
            action(actions.RESOURCE_DETAIL_READ_SUCCESS, 1)
        )).toEqual(state({ detail: 1 }));
    });

    it('overrides detail in an existing state', () => {
        expect(reducer(
            state({ detail: 1 }),
            action(actions.RESOURCE_DETAIL_READ_SUCCESS, 2)
        )).toEqual(state({ detail: 2 }));
    });
});
