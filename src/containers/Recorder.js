import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Icon, Divider } from 'semantic-ui-react';
import * as recorderActions from "../actions";

const API = process.env.API_HOST + ':' + process.env.API_PORT + '/api/';
const BROWSER_SUPPORTED = navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
const FILE_TYPE = MediaRecorder.isTypeSupported('audio/ogg;codecs=opus') ? 'ogg' : 'webm';

let mediaRecorder, chunks = [], blob;

class Recorder extends React.Component {
    state = {
        recording: false,
        blobUrl: false
    };
    startRecord = () => {
        this.setState({ recording: true });
        this.props.actions.recorderStart();
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                let audioCtx = new AudioContext();
                let source = audioCtx.createMediaStreamSource(stream);
                let splitter = audioCtx.createChannelSplitter();
                let merger = audioCtx.createChannelMerger();
                let dest = audioCtx.createMediaStreamDestination();
                source.connect(splitter);
                splitter.connect(merger, 0, 0);
                splitter.connect(merger, 0, 1);
                merger.connect(dest);
                mediaRecorder = new MediaRecorder(dest.stream);
                mediaRecorder.start();
                mediaRecorder.onstop = e => {
                    blob = new Blob(chunks, { 'type' : 'audio/' + FILE_TYPE + '; codecs=opus' });
                    chunks = [];
                    this.setState({ blobUrl: URL.createObjectURL(blob) });
                };
                mediaRecorder.ondataavailable = e => chunks.push(e.data);
            })
            .catch(err => {
                console.log('Error:', err);
            });
    };
    stopRecord = () => {
        this.setState({ recording: false });
        this.props.actions.recorderStop();
        mediaRecorder.stop();
    };
    upload = () => {
        let fd = new FormData();
        fd.append('audio', blob, 'upload.' + FILE_TYPE);
        fetch(API + 'upload', { method: 'post', body: fd })
            .then(res => res.json())
            .catch(console.error)
            .then(json => {
                console.log(json);
            });
    };
    download = () => {
        
    };
    render() {
        if(!BROWSER_SUPPORTED) return <div>Your browser doesn't support audio recording!</div>;
        const { recording, blobUrl } = this.state;
        return (
            <div id='recorder'>
                <Button color={ recording ? 'red' : 'orange' } icon labelPosition='left'
                        onClick={ recording ? this.stopRecord : this.startRecord }>
                    <Icon name={ recording ? 'square' : 'circle' } />
                    { recording ? 'Stop' : 'Record' }
                </Button>
                <div>
                    {blobUrl ? <audio id="player" src={ blobUrl } controls /> : false}
                </div>
                <Divider />
                {blobUrl ? <Button.Group vertical >
                    <Button color='green' icon labelPosition='left'
                            onClick={ this.upload }>
                        <Icon name='upload' />
                        Upload
                    </Button>
                    <Button as='a' icon labelPosition='left'
                            onClick={ this.download } download={ 'audio.' + FILE_TYPE } href={ blobUrl }>
                        <Icon name='download' />
                        Download
                    </Button>
                </Button.Group> : false}
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        recorder: state.recorder
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(recorderActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recorder);