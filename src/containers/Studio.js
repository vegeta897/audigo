// Recording, previewing, uploading clips
import React from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Segment, Button, Icon, Divider, Message } from 'semantic-ui-react';
import { studioActions } from '../actions';
import * as Recorder from '../recorder';

class Studio extends React.Component {
    componentDidMount() {
        Recorder.init();
        Recorder.onFile(this.props.stageNew);
        Recorder.attachInput(document.getElementById('uploader'), this.props.stageNew);
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
    uploadAudio = (file, fileName) => () => this.props.uploadAudio(file, fileName);
    render() {
        const { recorder, stage, recorderStart, recorderStop, upload } = this.props;
        const recording = recorder === 'start' || recorder === 'resume';
        const uploading = upload.status === 'uploading';
        const uploaded = upload.status === 'success';
        if(!Recorder.BROWSER_SUPPORTED) return <div>Your browser doesn't support audio recording!</div>;
        return (
            <Segment id='recorder'>
                {uploaded && <Redirect to={'/play/' + upload.id}/>}
                {!stage.fileUrl && <div>
                    <Button fluid size='massive' color={ recording ? 'red' : 'orange' } icon labelPosition='left'
                            onClick={ recording ? recorderStop : recorderStart }>
                        <Icon name={ recording ? 'square' : 'circle' } />
                        { recording ? 'Stop' : 'Record' }
                    </Button>
                    <Divider horizontal>Or</Divider>
                    <div style={{ textAlign: 'center' }}>
                        <input id='uploader' type='file' accept='audio/*' capture />
                    </div>
                </div>}
                {stage.fileUrl && <div>
                    {!uploaded && <Button fluid size='massive' color={'green'} icon labelPosition='left'
                                          onClick={ this.uploadAudio(Recorder.getFile(), stage.fileName) }
                                          disabled={ uploading } loading={ uploading }>
                        <Icon name='upload' />
                        Upload
                    </Button>}
                    {uploaded && <Message icon positive>
                        <Icon name='check' />
                        <Message.Content>
                            <Message.Header>Success</Message.Header>
                            Your file was uploaded!
                        </Message.Content>
                    </Message>}
                    <Divider />
                    <audio src={ stage.fileUrl } controls controlsList='nodownload' autoPlay
                           style={{ display: 'block', width: '100%', marginBottom: '1em' }} />
                    <Button as='a' icon labelPosition='left'
                            download={ stage.fileName } href={ stage.fileUrl }>
                        <Icon name='download' />
                        Download
                    </Button>
                </div>}
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

export default connect(mapStateToProps, dispatch => bindActionCreators({...studioActions}, dispatch))(Studio);