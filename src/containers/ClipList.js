import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchState } from 'react-router-server';
import { isPending, hasFailed } from 'redux-saga-thunk';
import { fromEntities, fromResource } from 'store/selectors';
import { resourceListReadRequest } from 'store/actions';
import { isBrowser, isServer } from 'config';

import { ClipList } from 'components';

class ClipListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { hover: null };
    }

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

    hoverClip = (id) => this.setState({ hover: id });

    render() {
        const { list, loading, failed } = this.props;
        const hover = {
            do: this.hoverClip,
            id: this.state.hover
        };
        return <ClipList {...{ list, loading, failed }} hover={hover} />
    }
}

const mapStateToProps = state => ({
    list: fromEntities.getList(state, 'clips', fromResource.getList(state, 'clips')),
    loading: isPending(state, 'clipsListRead'),
    failed: hasFailed(state, 'clipsListRead')
});

const mapDispatchToProps = (dispatch, { limit }) => ({
    readList: () => dispatch(resourceListReadRequest('clips', { limit }))
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
