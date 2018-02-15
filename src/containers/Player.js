import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchState } from 'react-router-server';
import { isPending, hasFailed, isDone } from 'redux-saga-thunk';
import { fromEntities, fromResource, fromStudio } from 'store/selectors';
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
            id, readDetail, hasServerState, setServerState, cleanServerState, studio: { clip }
        } = this.props;
        if((!clip || clip.id !== id) && !hasServerState) { // Don't request if just uploaded
            if(isServer) {
                readDetail(id).then(setServerState, setServerState);
            } else {
                readDetail(id);
            }
        } else if(isBrowser) {
            cleanServerState();
        }
    }

    componentWillReceiveProps(nextProps) {
        // If the route has not changed (/play/1 to /play/2) the component will not re-mount
        // Maybe that route change will never happen, but I'm keeping this here to show how to handle it
        let { id: oldID } = this.props;
        let { id: newID } = nextProps;
        if(newID !== oldID) {
            this.props.readDetail(newID);
        }
    }

    render() {
        const { detail, loading, failed } = this.props;
        return <Player {...{ detail, loading, failed }} />
    }
}

const mapStateToProps = state => ({
    detail: fromEntities.getDetail(state, 'clips', fromResource.getDetail(state, 'clips')),
    loading: isPending(state, 'clipsDetailRead'),
    failed: hasFailed(state, 'clipsDetailRead'),
    studio: fromStudio.getStudioState(state)
});

const mapDispatchToProps = dispatch => ({
    readDetail: id => dispatch(resourceDetailReadRequest('clips', { id }))
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
