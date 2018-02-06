import React from 'react';
import PropTypes from 'prop-types';

import recorder from '../../../services/recorder'; // TODO: Remove this

const Studio = ({ startRecording, stopRecording, info, recording, started, startFailed, stopped, stopFailed, ...props }) => {
    return (
        <div {...props}>
            In the stu-jo
            {stopped || <button onClick={started ? stopRecording : startRecording}>
                {started ? 'Stop' : 'Start'}
            </button>}
            {!started || stopped ||
                <div>
                    <button onClick={() => recorder.pause()}>Pause</button>
                    <button onClick={() => recorder.resume()}>Resume</button>
                </div>
            }
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
