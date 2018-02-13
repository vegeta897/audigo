import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Audio, AudioInput, Button, Input } from 'components';

let ClipSubmitForm = props => {
    const { handleSubmit } = props;
    return <form onSubmit={handleSubmit}>
        <Button big success type='submit'>Upload</Button>
        <Field big type='text' name='title' placeholder='Title' component={Input} />
        <Field big type='textarea' name='description' placeholder='Describe this clip...' component={Input} />
    </form>
};

ClipSubmitForm = reduxForm({ form: 'clipSubmit' })(ClipSubmitForm);

const Studio = ({ startRecording, stopRecording, info, clip, getInput, getInputRef, clear, handleSubmit, ...props }) => {
    const recording = info.status === 'recording';
    return (
        <div {...props}>
            <h2>In the stu-jo</h2>
            {!clip && <div>
                <Button big onClick={recording ? stopRecording : startRecording}>
                    {recording ? 'Stop' : 'Record'}
                </Button>
                {!recording && <AudioInput id='recorder' getInput={getInput} getInputRef={getInputRef} />}
            </div>}
            {clip && <div>
                <Audio src={clip.fileUrl} autoPlay />
                <div>
                    <ClipSubmitForm onSubmit={handleSubmit} initialValues={{title: clip.title}} />
                </div>
                <div>
                    <Button secondary onClick={clear} type='reset'>{info.status !== 'file' ? 'Try Again' : 'Clear'}</Button>
                    {info.status !== 'file' &&
                        <Button secondary download={'audio.mp4'} href={clip.fileUrl}>Download</Button>
                    }
                </div>
            </div>}
        </div>
    );
};

Studio.propTypes = {
    info: PropTypes.object,
    clip: PropTypes.object,
    startFailed: PropTypes.bool,
    stopFailed: PropTypes.bool,
    startRecording: PropTypes.func.isRequired,
    stopRecording: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired
};

export default Studio;
