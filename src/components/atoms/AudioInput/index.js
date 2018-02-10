import React from 'react';
import PropTypes from 'prop-types';

const AudioInput = ({ getInput, id }) => {
    return (
        <div>
            <input id={id} type='file' accept='audio/*' capture onChange={getInput} />
        </div>
    );
};

AudioInput.propTypes = {
    id: PropTypes.string.isRequired,
    getInput: PropTypes.func.isRequired
};

export default AudioInput;
