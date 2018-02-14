import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledAudio = styled.audio.attrs({ controlsList: 'nodownload' })`
  width: 100%;
`;

const Audio = ({ ...props }) => {
    return (
        <StyledAudio controls {...props} />
    );
};

Audio.propTypes = {
    src: PropTypes.string.isRequired,
    autoPlay: PropTypes.bool
};

export default Audio;
