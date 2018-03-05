import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { palette } from 'styled-theme';
import { prop, ifProp, switchProp } from 'styled-tools';

const backgroundColor = ({ inactive, hovered }) => inactive ? palette('grayscale', hovered ? 9 : 10) : palette('go', 4);

const Bar = styled.div`
  background: ${backgroundColor};
  height: 100%;
  transition: background ${ifProp('hovered', '100ms ease-out', '200ms ease-in')};
  z-index: -1;
  ${ifProp('instant', css`transition-delay: 0ms;`)}
`;

/* TODO: Have clips container send play status updates like this:

5:00 clip length

paused at 0:00 or not started
set width to 0%, no transition

play at 0:00
set width to 100%, transition time 5:00

pause at 1:00
set width to 20%, no transition

play at 1:00
set width to 100%, transition time 4:00

seek to 0:30
send a [pause at 0:30], and if playing, follow immediately after with a [play at 0:30]

playback ended
hide playbar?

 */

const ProgressBar = ({ percent, paused, timeLeft, ...props }) => {
    timeLeft = timeLeft || 0;
    percent = !paused && timeLeft ? 1 : percent || 0;
    //console.log(paused, percent, timeLeft);
    return (
        <Bar style={{
            width: percent * 100 + '%',
            transition: `width ${timeLeft}ms linear`
        }}/>
    )
};

ProgressBar.propTypes = {
    percent: PropTypes.number,
    inactive: PropTypes.bool,
    selected: PropTypes.bool
};

export default ProgressBar;
