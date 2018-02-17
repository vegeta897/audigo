import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fromEntities, fromPlayer } from 'store/selectors';
import Audio from 'react-sound';
import { playerStatusUpdate, resourceListReadRequest } from '../store/actions';

class PlayerContainer extends Component {
    static propTypes = {
        clip: PropTypes.object
    };

    onPlaying = ({ position, duration, paused }) => {
        // TODO: Use a timer to estimate further progress and ignore future events unless reported progress is wrong
        if(paused) return;
        this.props.setClipStatus(this.props.clip.id, { playStatus: Audio.status.PLAYING, progress: { position, duration } });
    };

    onPause = ({ position, duration }) => {
        this.props.setClipStatus(this.props.clip.id, { playStatus: Audio.status.PAUSED, progress: { position, duration } });
    };

    onLoading = ({ bytesLoaded, bytesTotal, duration }) => { // Does this work in production?
        //this.props.setClipStatus(this.props.clip.id, { playStatus: Audio.status.STOPPED, progress: { duration } });
    };

    onLoad = (loaded) => {
        if(!loaded) return console.error('load failed!');
        //this.props.setClipStatus(this.props.clip.id, { playStatus: Audio.status.STOPPED });
    };

    onFinishedPlaying = () => {
        this.props.setClipStatus(this.props.clip.id, { playStatus: Audio.status.STOPPED });
    };

    render() {
        let { onPlaying, onPause, onLoading, onLoad, onFinishedPlaying, props: { clip, player } } = this;
        if(!clip) return false;
        let position = player[player.playing].position || 0;
        if(position === player[player.playing].duration) position = 0;
        return <Audio url={clip.url} autoLoad={true} playStatus={player.playStatus}
                      {...{ onPlaying, onPause, onLoading, onLoad, onFinishedPlaying,
                          position, volume: player.volume }}/>
    }
}

const mapStateToProps = state => ({
    clip: fromEntities.getDetail(state, 'clips', fromPlayer.getPlaying(state)),
    player: fromPlayer.getState(state)
});

const mapDispatchToProps = dispatch => ({
    play: () => dispatch(playerPlayRequest()),
    pause: () => dispatch(playerPauseRequest()),
    setClipStatus: (id, progress) => dispatch(playerStatusUpdate(id, progress))
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
