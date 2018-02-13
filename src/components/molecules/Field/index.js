import React from 'react';
import { Field as ReduxFormField } from 'redux-form';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Label, Input, Block } from 'components';

const Error = styled(Block)`
  margin: 0.4rem 0 0;
`;

const Wrapper = styled.div`
  margin-bottom: 1rem;
  input[type="checkbox"],
  input[type="radio"] {
    margin-right: 0.5rem;
  }
  label {
    vertical-align: middle;
  }
`;

const Field = ({ label, type, input, meta, ...props }) => {
    const { invalid, error } = meta;
    const inputProps = {
        id: input.name, type, invalid, 'aria-describedby': `${input.name}Error`, ...props, ...input
    };
    const renderInputFirst = type === 'checkbox' || type === 'radio';
    return (
        <Wrapper>
            {renderInputFirst && <Input {...inputProps} />}
            {label && <Label htmlFor={inputProps.id}>{label}</Label>}
            {renderInputFirst || <Input {...inputProps} />}
            {invalid && error && <Error id={`${name}Error`} role='alert' palette='danger'>{error}</Error>}
        </Wrapper>
    )
};

Field.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string
};

Field.defaultProps = {
    type: 'text'
};

export default Field;
