import * as actions from './actions';

test('resourceListReadRequest', () => {
    expect(actions.resourceListReadRequest('resources', { fields: 'test' }))
        .toEqual(expect.objectContaining({
            type: actions.RESOURCE_LIST_READ_REQUEST,
            payload: {
                params: {
                    fields: 'test'
                },
            },
            meta: expect.objectContaining({
                resource: 'resources'
            })
        }))
});

test('resourceListReadSuccess', () => {
    expect(actions.resourceListReadSuccess('resources', [1, 2, 3], 'request'))
        .toEqual(expect.objectContaining({
            type: actions.RESOURCE_LIST_READ_SUCCESS,
            payload: [1, 2, 3],
            meta: expect.objectContaining({
                request: 'request',
                resource: 'resources'
            })
        }))
});

test('resourceListReadFailure', () => {
    expect(actions.resourceListReadFailure('resources', 'error', 'request'))
        .toEqual(expect.objectContaining({
            type: actions.RESOURCE_LIST_READ_FAILURE,
            error: true,
            payload: 'error',
            meta: expect.objectContaining({
                request: 'request',
                resource: 'resources'
            })
        }))
});

test('resourceDetailReadRequest', () => {
    expect(actions.resourceDetailReadRequest('resources', { id: 1 }))
        .toEqual(expect.objectContaining({
            type: actions.RESOURCE_DETAIL_READ_REQUEST,
            payload: {
               params: {
                   id: 1
               }
            },
            meta: expect.objectContaining({
                resource: 'resources'
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
