import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchState } from 'react-router-server';
import { isPending, hasFailed } from 'redux-saga-thunk';
import { fromEntities, fromResource, fromPlayer } from 'store/selectors';
import { resourceListReadRequest, playerStatusSet, playerClipPlay } from 'store/actions';
import { isBrowser, isServer } from 'config';

import { ClipList } from 'components';

class ClipListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { hover: null, select: null };
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
    selectClip = (id) => this.setState({ select: id });

    render() {
        const { list, loading, failed, playClip, player } = this.props;
        const { state: { hover, select }, hoverClip, selectClip } = this;
        const ui = {
            get hover() { return hover; },
            set hover(id) { hoverClip(id); },
            get select() { return select; },
            set select(id) { selectClip(id); }
        };
        return <ClipList {...{ list, loading, failed, ui, playClip, player }} />
    }
}

const mapStateToProps = state => ({
    list: fromEntities.getList(state, 'clips', fromResource.getList(state, 'clips')),
    loading: isPending(state, 'clipsListRead'),
    failed: hasFailed(state, 'clipsListRead'),
    player: fromPlayer.getState(state)
});

const mapDispatchToProps = (dispatch, { limit }) => ({
    readList: () => dispatch(resourceListReadRequest('clips', { limit })),
    playClip: id => dispatch(playerClipPlay(id)),
    setClipStatus: (id, progress) => dispatch(playerStatusSet(id, progress))
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
