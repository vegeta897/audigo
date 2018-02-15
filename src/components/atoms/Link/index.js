import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { font, palette } from 'styled-theme';
import { ifProp } from 'styled-tools';
import NavLink from 'react-router-dom/NavLink';

const styles = css`
  font-family: ${font('primary')};
  text-decoration: none;
  font-weight: 500;
  color: ${ifProp('light', palette({ grayscale: 6 }, 3), palette({ grayscale: 0 }, 1))};

  &:hover {
    text-decoration: underline;
    ${ifProp('light', css`
      color: ${palette({ grayscale: 5 }, 1)};
    `)}
  }
`;

const StyledNavLink = styled(({ theme, reverse, palette, light, ...props }) =>
    <NavLink {...props} />)`${styles}`;

const Anchor = styled.a`${styles}`;

const Link = ({ ...props }) => {
    if(props.to) {
        return <StyledNavLink {...props} />
    }
    return <Anchor {...props} />
};

Link.propTypes = {
    palette: PropTypes.string,
    reverse: PropTypes.bool,
    to: PropTypes.string,
    light: PropTypes.bool
};

Link.defaultProps = {
    palette: 'primary'
};

export default Link;
