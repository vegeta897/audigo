import React from 'react';
import PropTypes from 'prop-types';
import { Field as ReduxField, reduxForm } from 'redux-form';
import { Audio, AudioInput, Button, Field, Block } from 'components';

const maxLength = (max, field) => value => value && value.length > max ? `That ${field} is ${value.length - max} characters over the limit` : undefined;

const titleMaxLength = maxLength(100, 'title');
const descriptionMaxLength = maxLength(2000, 'description');

let ClipSubmitForm = props => {
    const { handleSubmit, invalid, submitting } = props;
    return <form onSubmit={handleSubmit}>
        <Button big go type='submit' disabled={invalid || submitting}>Upload</Button>
        <ReduxField component={Field} big type='text' name='title' placeholder='Title' validate={titleMaxLength} />
        <ReduxField component={Field} big type='textarea' name='description' placeholder='Describe this clip...' validate={descriptionMaxLength} />
    </form>
};

ClipSubmitForm = reduxForm({ form: 'clipSubmit' })(ClipSubmitForm);

const Studio = ({ startRecording, stopRecording, info, clip, getInput, clear, handleSubmit, ...props }) => {
    const recording = info.status === 'recording';
    return (
        <div {...props}>
            <h2>In the stu-jo</h2>
            {!clip && <div>
                <Button big onClick={recording ? stopRecording : startRecording} palette={recording ? 'danger' : 'primary'}>
                    {recording ? 'Stop' : 'Record'}
                </Button>
                {!recording && <AudioInput id='recorder' getInput={getInput} />}
                {info.error === 'size' && <Block role="alert" palette="danger">Sorry, you can't upload files over 100mb</Block>}
            </div>}
            {clip && <div>
                <Audio src={clip.url} autoPlay />
                <div>
                    <ClipSubmitForm onSubmit={handleSubmit} initialValues={{title: clip.title}} />
                </div>
                <div>
                    <Button secondary onClick={clear} type='reset'>{info.status !== 'file' ? 'Try Again' : 'Clear'}</Button>
                    {info.status !== 'file' &&
                        <Button secondary download={'audio.mp4'} href={clip.url}>Download</Button>
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
