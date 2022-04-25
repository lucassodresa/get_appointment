import React from 'react';
import StyledForm from './styles';

const Form = ({ children, ...props }) => {
  return <StyledForm {...props}>{children}</StyledForm>;
};

export default Form;
