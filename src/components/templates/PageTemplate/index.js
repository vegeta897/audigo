import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 3.75rem;
  min-height: 100vh;
  box-sizing: border-box;
`;

const Content = styled.section`
  width: 100%;
  box-sizing: border-box;
  margin: 2rem auto;
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
