import React from 'react';
import PropTypes from 'prop-types';
import { Field as reduxField, reduxForm } from 'redux-form';
import { Audio, AudioInput, Button, Field, Block } from 'components';

const maxLength = (max, field) => value => value && value.length > max ? `That ${field} is ${value.length - max} characters over the limit` : undefined;

const titleMaxLength = maxLength(100, 'title');
const descriptionMaxLength = maxLength(2000, 'description');

let ClipSubmitForm = props => {
    const { handleSubmit, invalid, submitting } = props;
    return <form onSubmit={handleSubmit}>
        <Button big success type='submit' disabled={invalid || submitting}>Upload</Button>
        <reduxField component={Field} big type='text' name='title' placeholder='Title' validate={titleMaxLength} />
        <reduxField component={Field} big type='textarea' name='description' placeholder='Describe this clip...' validate={descriptionMaxLength} />
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
                {info.error === 'size' && <Block role="alert" palette="danger">Sorry, you can't upload files over 100mb</Block>}
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
