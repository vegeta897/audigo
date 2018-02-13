import React from 'react';
import PropTypes from 'prop-types';
import { Audio, AudioInput, Button, Input } from 'components';

const Studio = ({ startRecording, stopRecording, info, startFailed, stopFailed, clip, getInput, getInputRef, clear, upload, ...props }) => {
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
                    <Button onClick={() => upload(clip)} big success type='submit'>Upload</Button>
                    <Input big type='text' placeholder='Title' defaultValue={clip.title} />
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
