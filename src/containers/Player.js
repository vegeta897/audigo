import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchState } from 'react-router-server';
import { isPending, hasFailed } from 'redux-saga-thunk';
import { fromResource } from 'store/selectors';
import { resourceDetailReadRequest } from 'store/actions';
import { isBrowser, isServer } from 'config';

import { Player } from 'components';

class PlayerContainer extends Component {
    static propTypes = {
        detail: PropTypes.object,
        id: PropTypes.string.isRequired,
        loading: PropTypes.bool,
        failed: PropTypes.bool,
        readDetail: PropTypes.func.isRequired,
        hasServerState: PropTypes.bool,
        setServerState: PropTypes.func.isRequired,
        cleanServerState: PropTypes.func.isRequired,
    };

    componentWillMount() {
        const {
            readDetail, hasServerState, setServerState, cleanServerState
        } = this.props;

        if(!hasServerState) {
            if(isServer) {
                readDetail().then(setServerState, setServerState);
            } else {
                readDetail();
            }
        } else if(isBrowser) {
            cleanServerState();
        }
    }

    render() {
        const { detail, loading, failed } = this.props;
        return <Player {...{ detail, loading, failed }} />
    }
}

const mapStateToProps = state => ({
    detail: fromResource.getDetail(state, 'clips'),
    loading: isPending(state, 'clipsDetailRead'),
    failed: hasFailed(state, 'clipsDetailRead')
});

const mapDispatchToProps = (dispatch, { id }) => ({
    readDetail: () => dispatch(resourceDetailReadRequest('clips', id))
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

export default withServerState(connect(mapStateToProps, mapDispatchToProps)(PlayerContainer));
