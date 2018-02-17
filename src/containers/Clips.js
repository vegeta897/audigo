import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchState } from 'react-router-server';
import { isPending, hasFailed } from 'redux-saga-thunk';
import { fromEntities, fromResource, fromPlayer, fromStudio } from 'store/selectors';
import { resourceDetailReadRequest, resourceListReadRequest, playerStatusSet, playerClipPlay } from 'store/actions';
import { isBrowser, isServer } from 'config';

import { ClipList, Player } from 'components';

class ClipsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { hover: null, select: null };
    }

    static propTypes = {
        detail: PropTypes.object,
        id: PropTypes.string,
        list: PropTypes.array,
        limit: PropTypes.number,
        loading: PropTypes.bool,
        failed: PropTypes.bool,
        readDetail: PropTypes.func.isRequired,
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
            view, id, detail, player, playClip, readDetail, readList, hasServerState, setServerState, cleanServerState, studio: { clip }
        } = this.props;
        if((!clip || clip.id !== id) && !hasServerState) {
            let readData = view === 'play' ? readDetail(id) : readList();
            if(isServer) readData.then(setServerState, setServerState);
        } else if(isBrowser) {
            cleanServerState();
        }
        if(detail && detail.id !== player.playing) playClip(detail.id); // Autoplay
    }

    componentWillReceiveProps(nextProps) {
        // If the route has not changed (/play/1 to /play/2) the component will not re-mount
        // Maybe that route change will never happen, but I'm keeping this here to show how to handle it
        let { id: oldID, readDetail, readList, view: oldView, playClip } = this.props;
        let { id: newID, view: newView, player, detail } = nextProps;
        if(newView === 'play') {
            if(newID !== oldID) readDetail(newID);
            if(detail && detail.id !== player.playing) playClip(detail.id);
        } else if(newView === 'clips' && newView !== oldView) {
            readList();
        }
    }

    hoverClip = (id) => this.setState({ hover: id });
    selectClip = (id) => this.setState({ select: id });

    render() {
        const { view, detail, list, loading, failed, playClip, player } = this.props;
        const { state: { hover, select }, hoverClip, selectClip } = this;
        const ui = {
            get hover() { return hover; },
            set hover(id) { hoverClip(id); },
            get select() { return select; },
            set select(id) { selectClip(id); }
        };
        if(view === 'play') return <Player {...{ detail, loading, failed,
            playClip: () => playClip(detail.id), player }} />;
        return <ClipList {...{ list, loading, failed, ui, playClip, player }} />
    }
}

const mapStateToProps = state => ({
    detail: fromEntities.getDetail(state, 'clips', fromResource.getDetail(state, 'clips')),
    list: fromEntities.getList(state, 'clips', fromResource.getList(state, 'clips')),
    loading: isPending(state, 'clipsListRead'),
    failed: hasFailed(state, 'clipsListRead'),
    player: fromPlayer.getState(state),
    studio: fromStudio.getStudioState(state)
});

const mapDispatchToProps = (dispatch, { limit }) => ({
    readDetail: id => dispatch(resourceDetailReadRequest('clips', { id })),
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

export default withServerState(connect(mapStateToProps, mapDispatchToProps)(ClipsContainer));
