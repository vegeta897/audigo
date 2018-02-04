import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchState } from 'react-router-server';
import { isPending, hasFailed } from 'redux-saga-thunk';
import { fromResource } from 'store/selectors';
import { resourceListReadRequest } from 'store/actions';
import { isBrowser, isServer } from 'config';

import { ClipList } from 'components';

class ClipListContainer extends Component {
    static propTypes = {
        list: PropTypes.array.isRequired,
        limit: PropTypes.number,
        loading: PropTypes.bool,
        failed: PropTypes.bool,
        readList: PropTypes.func.isRequired,
        hasServerState: PropTypes.bool,
        setServerState: PropTypes.func.isRequired,
        cleanServerState: PropTypes.func.isRequired,
    };

    static defaultProps = {
        limit: 20
    };

    componentWillMount() {
        const {
            readList, hasServerState, setServerState, cleanServerState
        } = this.props;

        if(!hasServerState) {
            if(isServer) {
                readList().then(setServerState, setServerState);
            } else {
                readList();
            }
        } else if(isBrowser) {
            cleanServerState();
        }
    }

    render() {
        const { list, loading, failed } = this.props;
        return <ClipList {...{ list, loading, failed }} />
    }
}

const mapStateToProps = state => ({
    list: fromResource.getList(state, 'clips'),
    loading: isPending(state, 'clipsListRead'),
    failed: hasFailed(state, 'clipsListRead')
});

const mapDispatchToProps = (dispatch, { limit }) => ({
    readList: () => dispatch(resourceListReadRequest('clips', { _limit: limit }))
});

const withServerState = fetchState(
    state => ({
        hasServerState: !!state.data,
    }),
    actions => ({
        setServerState: data => actions.done({ data }),
        cleanServerState: () => actions.done()
    })
);

export default withServerState(connect(mapStateToProps, mapDispatchToProps)(ClipListContainer));
