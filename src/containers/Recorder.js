import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';

let mediaRecorder, chunks = [];
let AudioPlayer = document.createElement('audio');

let downloadLink = document.createElement('a');
downloadLink.innerHTML = 'download';
downloadLink.download = 'audio.' + (MediaRecorder.isTypeSupported('audio/ogg;codecs=opus') ? 'ogg' : 'webm');

const BROWSER_SUPPORTED = navigator.mediaDevices && navigator.mediaDevices.getUserMedia;

class Recorder extends React.Component {
    state = {
        recording: false
    };
    startRecord = () => {
        this.setState({ recording: true });
        delete AudioPlayer.src;
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                mediaRecorder = new MediaRecorder(stream);

                mediaRecorder.start();
                
                mediaRecorder.onstop = e => {
                    AudioPlayer.setAttribute('controls', '');
                    AudioPlayer.controls = true;

                    let blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
                    chunks = [];
                    let blobUrl = URL.createObjectURL(blob);
                    AudioPlayer.src = blobUrl;
                    downloadLink.href = blobUrl;
                    document.getElementById('recorder').appendChild(AudioPlayer);
                    document.getElementById('recorder').appendChild(downloadLink);
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
        mediaRecorder.stop();
    };
    render() {
        if(!BROWSER_SUPPORTED) return <div>Your browser doesn't support audio recording!</div>;
        const { recording } = this.state;
        return (
            <div id='recorder'>
                <Button color={ recording ? 'red' : 'orange' } icon labelPosition='left'
                        onClick={ recording ? this.stopRecord : this.startRecord }>
                    <Icon name={ recording ? 'square' : 'circle' } />
                    { recording ? 'Stop' : 'Record' }
                </Button>
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        
    }
}

export default connect(mapStateToProps)(Recorder);