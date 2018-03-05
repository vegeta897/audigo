import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fromEntities, fromPlayer } from 'store/selectors';
import { playerStatusUpdate } from '../store/actions';

// TODO: Clean up all this garbage

class PlayerContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //playStatus: Audio.status.STOPPED,
            position: null,
            volume: 100,
            change: false
        }
    }
    static propTypes = {
        clip: PropTypes.object
    };

    onPlaying = ({ position, duration, paused, loaded, isBuffering }) => {
        this.setState({ position });
        if(!duration) return;
        const { player, setClipStatus } = this.props;
        const statusUpdate = {};
        const stateUpdate = {};
        if(player.duration !== duration) statusUpdate.duration = duration;
        if(!paused && player.playStatus !== Audio.status.PLAYING) {
            statusUpdate.playStatus = Audio.status.PLAYING;
            statusUpdate.position = position;
        } else if(position === duration) {
            stateUpdate.playStatus = Audio.status.STOPPED;
            statusUpdate.playStatus = Audio.status.STOPPED;
            statusUpdate.position = position;
        } else if(this.state.change) {
            statusUpdate.position = position;
            stateUpdate.change = false;
        }
        if(!this.state.change && !statusUpdate.duration && !statusUpdate.playStatus) return;
        setClipStatus(this.props.clip.id, statusUpdate);
        this.setState(stateUpdate);
    };

    onPause = ({ position, duration }) => {
        console.log('onPause', position);
        //this.setState({ playStatus: Audio.status.PAUSED });
        this.props.setClipStatus(this.props.clip.id, { playStatus: Audio.status.PAUSED, position, duration });
    };

    onResume = ({ position, duration }) => {
        console.log('onResume', position);
    };

    onStop = ({ position, duration }) => {
        this.setState({ playStatus: Audio.status.STOPPED, position, duration });
        console.log('onStop', position);
    };

    onLoading = ({ bytesLoaded, bytesTotal, duration }) => {
        console.log('onLoading');
        //this.props.setClipStatus(this.props.clip.id, { playStatus: Audio.status.STOPPED, progress: { duration } });
    };

    onLoad = (loaded) => {
        console.log('onLoad');
        if(!loaded) return console.error('load failed!');
        //this.props.setClipStatus(this.props.clip.id, { playStatus: Audio.status.STOPPED });
    };

    onFinishedPlaying = () => {
        // this.setState({ playStatus: Audio.status.STOPPED });
        // this.props.setClipStatus(this.props.clip.id, { playStatus: Audio.status.STOPPED });
    };

    componentDidMount() {
        let b = document.createElement('button');
        b.innerHTML = 'play';
        document.getElementsByTagName('body')[0].appendChild(b);
        b.addEventListener ("click", function() {
            console.log(soundManager);
            soundManager.play('sound0');
        });
    }

    componentWillReceiveProps(nextProps) {
        return;
        if(nextProps.player.volume !== this.state.volume) this.setState({ volume: nextProps.player.volume });
        if(nextProps.command.play) {
            this.setState( { playStatus: Audio.status.PLAYING });
        } else if(nextProps.command.pause) {
            this.setState( { playStatus: Audio.status.PAUSED });
        } else if(nextProps.command.seek) {
            this.setState({ position: nextProps.command.seek });

            // TODO: If seeking while paused, onPlaying isn't called, so how do we update status?

        } else return;
        this.setState({ change: true });
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { playStatus, position, volume } = this.state;
        const { playStatus: playStatusNew, position: positionNew, volume: volumeNew } = nextState;
        return nextProps.clip !== this.props.clip || playStatus !== playStatusNew || position !== positionNew || !!nextProps.command.seek || volume !== volumeNew;
    }

    render() {
        return false;
        const { onPlaying, onPause, onResume, onStop, onLoading, onLoad, onFinishedPlaying, props: { clip } } = this;
        if(!clip) return false;
        const position = this.state.position || 0;
        //if(position === player[player.playing].duration) position = 0;
        /*return <Audio url={clip.url} autoLoad={true} playStatus={this.state.playStatus}
                      {...{ onPlaying, onPause, onResume, onStop, onLoading, onLoad, onFinishedPlaying,                             position, volume: this.state.volume }}/>*/
    }
}

const mapStateToProps = state => ({
    clip: fromEntities.getDetail(state, 'clips', fromPlayer.getPlaying(state)),
    player: fromPlayer.getState(state),
    command: fromPlayer.getCommand(state)
});

const mapDispatchToProps = dispatch => ({
    // play: () => dispatch(playerPlayRequest()),
    // pause: () => dispatch(playerPauseRequest()),
    setClipStatus: (id, progress) => dispatch(playerStatusUpdate(id, progress))
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
