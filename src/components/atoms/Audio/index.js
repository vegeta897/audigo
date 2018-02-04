import React from 'react';
import PropTypes from 'prop-types';

const Audio = ({ ...props }) => {
    return (
        <audio {...props} controls controlsList='nodownload'  />
    );
};

Audio.propTypes = {
    src: PropTypes.string.isRequired,
    autoPlay: PropTypes.bool
};

export default Audio;
