import React from 'react';
import PropTypes from 'prop-types';
import { Audio, AudioInput, Button, Input } from 'components';

const Studio = ({ startRecording, stopRecording, info, startFailed, stopFailed, clip, getInput, clear, ...props }) => {
    const recording = info.status === 'recording';
    return (
        <div {...props}>
            <h2>In the stu-jo</h2>
            {!clip && <div>
                <Button onClick={recording ? stopRecording : startRecording}>
                    {recording ? 'Stop' : 'Start'}
                </Button>
                {!recording && <AudioInput id='recorder' getInput={getInput} />}
            </div>}
            {clip && <div>
                <Audio src={clip.fileUrl} autoPlay />
                <div>
                    <Button>Upload</Button>
                    <Input type='text' placeholder='Title' defaultValue={clip.title} />
                </div>
                {info.status !== 'file' && <div>
                    <Button onClick={clear}>Try Again</Button>
                    <Button download={'audio.mp4'} href={clip.fileUrl}>Download</Button>
                </div>}
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
