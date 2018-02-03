export const RESOURCE_LIST_READ_REQUEST = 'RESOURCE_LIST_READ_REQUEST';
export const RESOURCE_LIST_READ_SUCCESS = 'RESOURCE_LIST_READ_SUCCESS';
export const RESOURCE_LIST_READ_FAILURE = 'RESOURCE_LIST_READ_FAILURE';

export const resourceListReadRequest = (resource, params) => ({
    type: RESOURCE_LIST_READ_REQUEST,
    payload: { params },
    meta: {
        resource,
        thunk: `${resource}ListRead`
    }
});

export const resourceListReadSuccess = (resource, list, request, thunk) => ({
    type: RESOURCE_LIST_READ_SUCCESS,
    payload: list,
    meta: {
        request,
        thunk,
        resource,
        entities: resource
    }
});

export const resourceListReadFailure = (resource, error, request, thunk) => ({
    type: RESOURCE_LIST_READ_FAILURE,
    error: true,
    payload: error,
    meta: {
        request,
        thunk,
        resource
    }
});

export const RESOURCE_DETAIL_READ_REQUEST = 'RESOURCE_DETAIL_READ_REQUEST';
export const RESOURCE_DETAIL_READ_SUCCESS = 'RESOURCE_DETAIL_READ_SUCCESS';
export const RESOURCE_DETAIL_READ_FAILURE = 'RESOURCE_DETAIL_READ_FAILURE';

export const resourceDetailReadRequest = (resource, id) => ({
    type: RESOURCE_DETAIL_READ_REQUEST,
    payload: { id },
    meta: {
        resource,
        thunk: `${resource}DetailRead`
    }
});

export const resourceDetailReadSuccess = (resource, detail, request, thunk) => ({
    type: RESOURCE_DETAIL_READ_SUCCESS,
    payload: detail,
    meta: {
        request,
        thunk,
        resource,
        entities: resource
    }
});

export const resourceDetailReadFailure = (resource, error, request, thunk) => ({
    type: RESOURCE_DETAIL_READ_FAILURE,
    error: true,
    payload: error,
    meta: {
        request,
        thunk,
        resource
    }
});
