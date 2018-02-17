import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { font } from 'styled-theme';
import { Player } from 'containers';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  box-sizing: border-box;
  font-family: ${font('primary')};
  margin: 0 1rem;
`;

const Content = styled.section`
  width: 100%;
  box-sizing: border-box;
  max-width: 480px;
`;

const Footer = styled.footer`
  margin: 2rem 0 1rem;
`;

const PageTemplate = ({ children, footer, staticContext, ...props }) => {
    return (
        <Wrapper {...props}>
            <Content>{children}</Content>
            <Player />
            <Footer>{footer}</Footer>
        </Wrapper>
    )
};

PageTemplate.propTypes = {
    children: PropTypes.any.isRequired,
};

export default PageTemplate;
