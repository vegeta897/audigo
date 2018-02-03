// Recording, previewing, uploading clips
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Segment, Button, Icon, Divider, Form, Input } from 'semantic-ui-react';
import { studioActions } from '../actions';
import * as Recorder from '../recorder';

class Studio extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title: '' };
    }
    componentDidMount() {
        Recorder.init();
        Recorder.onFile(this.props.stageNew);
        let uploader = document.getElementById('uploader');
        if(uploader) Recorder.attachInput(uploader, this.props.stageNew);
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.stage !== this.props.stage) {
            this.setState({ title: nextProps.stage.title || '' });
        }
        if(nextProps.recorder !== this.props.recorder) {
            switch(nextProps.recorder) {
                case 'start': Recorder.start(); break;
                case 'stop': Recorder.stop(); break;
                case 'pause': Recorder.pause(); break;
                case 'resume': Recorder.resume(); break;
            }
        }
        if(nextProps.upload.status === 'success') {
            this.stageClear();
        }
    }
    stageClear = () => this.props.stageClear();
    uploadAudio = (file, fileName, title) => () => this.props.uploadAudio(file, fileName, title);
    changeTitle = e => this.setState({ title: e.target.value });
    render() {
        const { recorder, stage, recorderStart, recorderStop, upload } = this.props;
        const recording = recorder === 'start' || recorder === 'resume';
        const uploading = upload.status === 'uploading';
        const uploaded = upload.status === 'success';
        if(!Recorder.BROWSER_SUPPORTED) return <div>Your browser doesn't support audio recording!</div>;
        return (
            <Segment id='recorder'>
                {uploaded && <Redirect push to={'/play/' + upload.id}/>}
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
                    <audio src={ stage.fileUrl } controls controlsList='nodownload' autoPlay
                           style={{ display: 'block', width: '100%' }} />
                    <Divider />
                    <Form style={{ textAlign: 'left' }} loading={ uploading }>
                        <Button type='button' fluid size='massive' color={'green'} icon labelPosition='left'
                                onClick={ this.uploadAudio(Recorder.getFile(), stage.fileName, this.state.title) }
                                style={{ marginBottom: '0.8em' }}>
                            <Icon name='upload' />
                            Upload
                        </Button>
                        <Form.Field>
                            <Input size='big' title='Title' placeholder='Title'
                                   value={this.state.title} onChange={this.changeTitle}/>
                        </Form.Field>
                    </Form>
                    <Divider section/>
                    <Button icon labelPosition='left' onClick={ this.stageClear } size='big'>
                        <Icon name='undo' />
                        Try Again
                    </Button>
                    {stage.source === 'microphone' && <Button as='a' size='big' icon='download'
                            download={ stage.fileName } href={ stage.fileUrl } floated='right'/>}
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