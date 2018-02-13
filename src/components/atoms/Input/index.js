import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { font, palette } from 'styled-theme';
import { ifProp } from 'styled-tools';

const fontSize = ({ height, big }) => `${height / 35.5555555556 * big ? 1.5 : 1}rem`;

const styles = css`
  font-family: ${font('primary')};
  display: block;
  width: 100%;
  margin: 0;
  box-sizing: border-box;
  font-size: ${fontSize};
  padding: ${ifProp({ type: 'textarea' }, '0.4444444444em', '0 0.4444444444em')};
  height: ${ifProp({ type: 'textarea' }, 'auto', '2.2222222222em')};
  color: ${palette('grayscale', 0)};
  background-color: ${palette('grayscale', 0, true)};
  border: 1px solid ${ifProp('invalid', palette('danger', 2), palette('grayscale', 3))};
  border-radius: 2px;

  &[type=checkbox], &[type=radio] {
    display: inline-block;
    border: 0;
    border-radius: 0;
    width: auto;
    height: auto;
    margin: 0 0.2rem 0 0;
  }
`;

const StyledTextarea = styled.textarea`${styles}`;
const StyledSelect = styled.select`${styles}`;
const StyledInput = styled.input`${styles}`;
const Error = styled.div`
  color: ${palette('danger', 0)};
  background-color: ${palette('danger', 3)};
  margin-bottom: 1rem;
  padding: 0.3rem 0.5rem;
`;

const Input = ({ input, meta: { error, warning } = {}, ...props }) => {
    return <div>
        {props.type === 'textarea' ? <StyledTextarea {...input} {...props} /> :
            props.type === 'select' ? <StyledSelect {...input} {...props} /> :
                <StyledInput {...input} {...props} />
        }
        {error && <Error>{error}</Error>}
    </div>
};

Input.propTypes = {
    type: PropTypes.string,
    reverse: PropTypes.bool,
    height: PropTypes.number,
    invalid: PropTypes.bool,
};

Input.defaultProps = {
    type: 'text',
    height: 40,
};

export default Input
