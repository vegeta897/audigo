import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fromEntities, fromPlayer } from 'store/selectors';
import { Audio } from 'components';
import { playerClipPlay, playerStatusSet, resourceListReadRequest } from '../store/actions';

class GlobalPlayer extends Component {
    static propTypes = {
        clip: PropTypes.object
    };
    onProgress = progress => {
        this.props.setClipStatus(this.props.clip.id, { progress });
    };

    render() {
        if(!this.props.clip) return null;
        let { onProgress } = this;
        let { id, url } = this.props.clip;
        // const progress =  {
        //     set: p => this.props.setClipStatus(id, { progress: p }),
        //     value: this.props.player[id] && this.props.player[id].progress
        // };
        return <Audio hidden src={url} {...{ onProgress }} autoPlay />
    }
}

const mapStateToProps = state => ({
    clip: fromEntities.getDetail(state, 'clips', fromPlayer.getPlaying(state)),
    player: fromPlayer.getState(state)
});

const mapDispatchToProps = dispatch => ({
    setClipStatus: (id, progress) => dispatch(playerStatusSet(id, progress))
});

export default connect(mapStateToProps, mapDispatchToProps)(GlobalPlayer);
