import React from 'react';
import PropTypes from 'prop-types';
import { Audio, AudioInput } from 'components';

const Studio = ({ startRecording, stopRecording, info, recording, startFailed, stopFailed, clip, getInput, ...props }) => {
    return (
        <div {...props}>
            <h2>In the stu-jo</h2>
            {!clip && <div>
                <button onClick={recording ? stopRecording : startRecording}>
                    {recording ? 'Stop' : 'Start'}
                </button>
                <AudioInput id='recorder' getInput={getInput} />
            </div>}
            {clip && <Audio src={clip.fileUrl} autoPlay />}
        </div>
    );
};

Studio.propTypes = {
    info: PropTypes.object,
    clip: PropTypes.object,
    startFailed: PropTypes.bool,
    stopFailed: PropTypes.bool,
    recording: PropTypes.bool,
    startRecording: PropTypes.func.isRequired,
    stopRecording: PropTypes.func.isRequired
};

export default Studio;
