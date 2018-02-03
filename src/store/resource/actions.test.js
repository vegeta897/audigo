import * as actions from './actions';

test('resourceDetailReadRequest', () => {
    expect(actions.resourceDetailReadRequest('resources', 1))
        .toEqual(expect.objectContaining({
            type: actions.RESOURCE_DETAIL_READ_REQUEST,
            payload: {
                id: 1,
            },
            meta: expect.objectContaining({
                resource: 'resources',
            }),
        }))
});

test('resourceDetailReadSuccess', () => {
    expect(actions.resourceDetailReadSuccess('resources', { id: 1, title: 'test' }, 'request'))
        .toEqual(expect.objectContaining({
            type: actions.RESOURCE_DETAIL_READ_SUCCESS,
            payload: { id: 1, title: 'test' },
            meta: expect.objectContaining({
                request: 'request',
                resource: 'resources',
            }),
        }))
});

test('resourceDetailReadFailure', () => {
    expect(actions.resourceDetailReadFailure('resources', 'error', 'request'))
        .toEqual(expect.objectContaining({
            type: actions.RESOURCE_DETAIL_READ_FAILURE,
            error: true,
            payload: 'error',
            meta: expect.objectContaining({
                request: 'request',
                resource: 'resources',
            }),
        }))
});
