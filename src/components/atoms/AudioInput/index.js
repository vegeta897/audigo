import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'components';

const AudioInput = ({ getInput, getInputRef, id }) => {
    return (
        <div>
            <Input id={id} type='file' accept='audio/*' capture onChange={e => getInput(e.target)} />
        </div>
    );
};

AudioInput.propTypes = {
    id: PropTypes.string.isRequired,
    getInput: PropTypes.func.isRequired
};

export default AudioInput;
