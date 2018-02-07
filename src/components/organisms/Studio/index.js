import React from 'react';
import PropTypes from 'prop-types';
import { Audio } from 'components';

const Studio = ({ startRecording, stopRecording, info, recording, started, startFailed, stopped, stopFailed, ...props }) => {
    return (
        <div {...props}>
            In the stu-jo
            {stopped || <button onClick={started ? stopRecording : startRecording}>
                {started ? 'Stop' : 'Start'}
            </button>}
            {!stopped || <Audio src={recording.fileUrl} autoPlay />}
        </div>
    );
};

Studio.propTypes = {
    info: PropTypes.object,
    recording: PropTypes.object,
    startFailed: PropTypes.bool,
    stopFailed: PropTypes.bool,
    started: PropTypes.bool,
    stopped: PropTypes.bool
};

export default Studio;
