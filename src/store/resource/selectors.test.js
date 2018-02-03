import * as selectors from './selectors';

const altState = {
    resources: {
        list: [1, 2, 3],
        detail: 1
    }
};

test('initialState', () => {
    expect(selectors.initialState).toEqual({});
});

test('initialResourceState', () => {
    expect(selectors.initialResourceState).toEqual({
        list: [],
        detail: null
    });
});

test('getResourceState', () => {
    expect(selectors.getResourceState()).toBe(selectors.initialResourceState);
    expect(selectors.getResourceState(undefined, 'resources')).toBe(selectors.initialResourceState);
    expect(selectors.getResourceState(altState, 'resources')).toBe(altState.resources);
});

test('getDetail', () => {
    expect(selectors.getDetail()).toBe(selectors.initialResourceState.detail);
    expect(selectors.getDetail({})).toBe(selectors.initialResourceState.detail);
    expect(selectors.getDetail(undefined, 'resources')).toBe(selectors.initialResourceState.detail);
    expect(selectors.getDetail(altState, 'resources')).toBe(altState.resources.detail);
});
