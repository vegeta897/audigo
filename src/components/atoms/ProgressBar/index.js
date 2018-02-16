import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { palette } from 'styled-theme';
import { prop, ifProp, switchProp } from 'styled-tools';

const backgroundColor = ({ inactive, hovered }) => inactive ? palette('grayscale', hovered ? 9 : 10) : palette('go', 4);

const Bar = styled.div`
  background: ${backgroundColor};
  width: ${prop('width')}%;
  height: 100%;
  transition: width 500ms linear, background ${ifProp('hovered', '100ms ease-out', '200ms ease-in')};
  position: absolute;
  left: 0;
  top: 0;
`;

const ProgressBar = ({ progress = 0, ...props }) => {
    return (
        <Bar width={progress * 100} {...props} />
    )
};

ProgressBar.propTypes = {
    progress: PropTypes.number,
    inactive: PropTypes.bool,
    selected: PropTypes.bool
};

export default ProgressBar;
