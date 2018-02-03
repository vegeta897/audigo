export const initialState = {};

export const initialResourceState = {
    list: [],
    detail: null
};

export const getResourceState = (state = initialState, resource) => state[resource] || initialResourceState;

export const getDetail = (state = initialState, resource) => getResourceState(state, resource).detail;
