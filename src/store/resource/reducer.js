import get from 'lodash/get';
import { isBrowser, isServer } from 'config';
import { initialState, getResourceState, getList, getDetail } from './selectors';
import {
    RESOURCE_LIST_READ_REQUEST,
    RESOURCE_LIST_READ_SUCCESS,
    RESOURCE_DETAIL_READ_REQUEST,
    RESOURCE_DETAIL_READ_SUCCESS
} from './actions';

export default (state = initialState, { type, payload, meta }) => {
    const resource = get(meta, 'resource');

    if(!resource) {
        return state;
    }

    switch(type) {
        case RESOURCE_LIST_READ_REQUEST:
            return {
                ...state,
                [resource]: {
                    ...getResourceState(state, resource),
                    list: getList(initialState, resource) // Don't show previously loaded list while loading
                }
            };
        case RESOURCE_LIST_READ_SUCCESS:
            return {
                ...state,
                [resource]: {
                    ...getResourceState(state, resource),
                    list: payload
                }
            };

        case RESOURCE_DETAIL_READ_REQUEST:
            return {
                ...state,
                [resource]: {
                    ...getResourceState(state, resource),
                    detail: getDetail(initialState, resource) // Don't show previously loaded clip while loading
                }
            };
        case RESOURCE_DETAIL_READ_SUCCESS:
            return {
                ...state,
                [resource]: {
                    ...getResourceState(state, resource),
                    detail: payload
                }
            };
        default:
            return state;
    }
};
