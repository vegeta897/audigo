import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledAudio = styled.audio.attrs({ controlsList: 'nodownload' })`
  width: 100%;
`;

const Audio = ({ progress, hidden, playing, onProgress, getRef, ...props }) => {
    return (
        <div>
            <StyledAudio controls={!hidden} {...props} innerRef={getRef}
                         onTimeUpdate={e => onProgress(e.target.currentTime/e.target.duration)} />
        </div>
    );
};

Audio.propTypes = {
    src: PropTypes.string.isRequired,
    autoPlay: PropTypes.bool,
    hidden: PropTypes.bool,
    progress: PropTypes.object
};

export default Audio;
