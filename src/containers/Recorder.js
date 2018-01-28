import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Icon, Divider } from 'semantic-ui-react';
import * as recorderActions from "../actions";

const BROWSER_SUPPORTED = navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
const LOCAL_FILE_TYPE = MediaRecorder.isTypeSupported('audio/ogg;codecs=opus') ? 'ogg' : 'webm';
const LOCAL_CODEC = MediaRecorder.isTypeSupported('audio/ogg;codecs=opus') ? 'ogg' : 'webm';

let mediaRecorder, chunks = [], blob;
let AudioPlayer = document.createElement('audio');

class Recorder extends React.Component {
    state = {
        recording: false,
        blobUrl: false
    };
    startRecord = () => {
        this.setState({ recording: true });
        this.props.actions.recorderStart();
        delete AudioPlayer.src;
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();
                mediaRecorder.onstop = e => {
                    AudioPlayer.setAttribute('controls', '');
                    AudioPlayer.controls = true;
                    
                    blob = new Blob(chunks, { 'type' : 'audio/' + LOCAL_CODEC + '; codecs=opus' });
                    chunks = [];
                    let blobUrl = URL.createObjectURL(blob);
                    AudioPlayer.src = blobUrl;
                    this.setState({ blobUrl });
                    document.getElementById('player').appendChild(AudioPlayer);
                };
                
                mediaRecorder.ondataavailable = function(e) {
                    chunks.push(e.data);
                }
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
        fd.append('audio', blob, 'upload.' + LOCAL_FILE_TYPE);
        fetch(process.env.API_HOST + ':' + process.env.API_PORT + '/api/upload', {
            method: 'post',
            body: fd
        }).then(res => res.json().then(json => {
            if(!res.ok) return Promise.reject(json);
            console.log(json);
            return json;
        }).catch(console.error));
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
                <div id="player">
                </div>
                <Divider />
                {blobUrl ? <Button.Group vertical >
                    <Button color='green' icon labelPosition='left'
                            onClick={ this.upload }>
                        <Icon name='upload' />
                        Upload
                    </Button>
                    <Button as='a' icon labelPosition='left'
                            onClick={ this.download } download={ 'audio.' + LOCAL_FILE_TYPE } href={ blobUrl }>
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