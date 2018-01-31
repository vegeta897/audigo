// Recording, previewing, uploading clips
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Segment, Button, Icon, Divider, Loader } from 'semantic-ui-react';
import { studioActions } from "../actions";
import * as Recorder from '../recorder';

class Studio extends React.Component {
    componentDidMount() {
        Recorder.onStop(this.props.stageNew);
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.recorder === this.props.recorder) return; // Ignore same status
        switch(nextProps.recorder) {
            case 'start': Recorder.start(); break;
            case 'stop': Recorder.stop(); break;
            case 'pause': Recorder.pause(); break;
            case 'resume': Recorder.resume(); break;
        }
    }
    uploadAudio = (blob, fileType) => () => this.props.uploadAudio(blob, fileType);
    render() {
        const { recorder, stage, recorderStart, recorderStop, upload } = this.props;
        const recording = recorder === 'start' || recorder === 'resume';
        const uploading = upload === 'uploading';
        const uploaded = upload === 'success';
        if(!Recorder.BROWSER_SUPPORTED) return <div>Your browser doesn't support audio recording!</div>;
        return (
            <Segment stacked id='recorder'>
                {!stage.blobUrl && <Button color={ recording ? 'red' : 'orange' } icon labelPosition='left'
                        onClick={ recording ? recorderStop : recorderStart }>
                    <Icon name={ recording ? 'square' : 'circle' } />
                    { recording ? 'Stop' : 'Record' }
                </Button>}
                {stage.blobUrl && <audio id="player" src={ stage.blobUrl } controls style={{ display: 'block', width: '100%' }} />}
                {stage.blobUrl && <Divider />}
                {stage.blobUrl && <Button.Group vertical>
                    {!uploaded && <Button color={'green'} icon labelPosition='left'
                            onClick={ this.uploadAudio(Recorder.getBlob(), stage.fileType) }
                            disabled={ uploading }>
                        <Icon name='upload' />
                        <Loader active={ uploading } />
                        Upload
                    </Button>}
                    <Button as='a' icon labelPosition='left'
                            onClick={ this.download } download={ 'audio.' + stage.fileType } href={ stage.blobUrl }>
                        <Icon name='download' />
                        Download
                    </Button>
                </Button.Group>}
            </Segment>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        recorder: state.recorder,
        stage: state.stage,
        upload: state.upload
    }
}

export default connect(mapStateToProps, dispatch => bindActionCreators(studioActions, dispatch))(Studio);