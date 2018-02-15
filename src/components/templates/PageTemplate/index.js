import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { font } from 'styled-theme';

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

const PageTemplate = ({ children, staticContext, ...props }) => {
    return (
        <Wrapper {...props}>
            <Content>{children}</Content>
        </Wrapper>
    )
};

PageTemplate.propTypes = {
    children: PropTypes.any.isRequired,
};

export default PageTemplate;
