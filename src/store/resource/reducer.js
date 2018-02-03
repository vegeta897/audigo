import get from 'lodash/get';
import { initialState, getResourceState, getDetail } from './selectors';
import {
    RESOURCE_DETAIL_READ_REQUEST,
    RESOURCE_DETAIL_READ_SUCCESS
} from './actions';

export default (state = initialState, { type, payload, meta }) => {
    const resource = get(meta, 'resource');

    if(!resource) {
        return state
    }

    switch(type) {
        case RESOURCE_DETAIL_READ_REQUEST:
            return {
                ...state,
                [resource]: {
                    ...getResourceState(state, resource),
                    detail: getDetail(initialState, resource),
                },
            };
        case RESOURCE_DETAIL_READ_SUCCESS:
            return {
                ...state,
                [resource]: {
                    ...getResourceState(state, resource),
                    detail: payload,
                },
            };
        default:
            return state
    }
}
