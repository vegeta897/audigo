import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Link from 'react-router-dom/Link';
import { font, palette } from 'styled-theme';
import { ifProp } from 'styled-tools';

const fontSize = ({ height, big }) => `${height / 40 * big ? 1.8 : 1}rem`;

const foregroundColor = ({ transparent, disabled }) =>
    transparent ? palette(disabled ? 2 : 1) : palette('grayscale', 0, true);
const hoverForegroundColor = ({ disabled, transparent }) => !disabled && transparent && palette(0);

const styles = css`
  display: inline-flex;
  font-family: ${font('primary')};
  align-items: center;
  white-space: nowrap;
  font-size: ${fontSize};
  border: 0.0625em solid ${ifProp('transparent', 'currentcolor', 'transparent')};
  height: 2.5em;
  justify-content: center;
  text-decoration: none;
  cursor: ${ifProp('disabled', 'default', 'pointer')};
  appearance: none;
  padding: 0 1em;
  border-radius: 0.125em;
  box-sizing: border-box;
  pointer-events: ${ifProp('disabled', 'none', 'auto')};
  transition: background-color 200ms ease-out, color 200ms ease-out, border-color 200ms ease-out;
  background-color: ${
    ifProp('disabled', palette('grayscale', 7),
    ifProp('success', palette('success', 1),
    ifProp('secondary', palette('grayscale', 6),
        palette(1)
    )))};
  color: ${foregroundColor};

  &:hover, &:focus, &:active {
    background-color: ${
    ifProp('success', palette('success', 0),
        ifProp('secondary', palette('grayscale', 7),
            palette(0))
    )};
    color: ${hoverForegroundColor};
    transition: background-color 100ms ease-out, color 100ms ease-out, border-color 100ms ease-out;
  }

  &:focus {
    outline: none
  }
`;

const StyledLink = styled(({
   disabled, transparent, reverse, palette, height, theme, ...props
}) => <Link {...props} />)`${styles}`;

const Anchor = styled.a`${styles}`;
const StyledButton = styled.button`${styles}`;

const Button = ({ type, ...props }) => {
    if(props.to) {
        return <StyledLink {...props} />;
    } else if(props.href) {
        return <Anchor {...props} />;
    }
    return <StyledButton {...props} type={type}/>;
};

Button.propTypes = {
    disabled: PropTypes.bool,
    palette: PropTypes.string,
    transparent: PropTypes.bool,
    reverse: PropTypes.bool,
    height: PropTypes.number,
    type: PropTypes.string,
    to: PropTypes.string,
    href: PropTypes.string,
    big: PropTypes.bool
};

Button.defaultProps = {
    palette: 'primary',
    type: 'button',
    height: 40
};

export default Button;
