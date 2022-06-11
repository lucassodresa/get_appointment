import React from 'react';
import { StyledFormPage, StyledForm } from './styles';

const Form = ({ children, type, ...props }) => {
  return type === 'page' ? (
    <StyledFormPage {...props}>{children}</StyledFormPage>
  ) : (
    <StyledForm {...props}>{children}</StyledForm>
  );
};

export default Form;
