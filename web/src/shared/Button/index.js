import { Button as ButtonAntd } from 'antd';
import React from 'react';
import StyledButton from './styles';

const Button = ({ children, ...props }) => {
  return !props.type === 'primary' ? (
    <StyledButton {...props}>{children}</StyledButton>
  ) : (
    <ButtonAntd {...props}>{children}</ButtonAntd>
  );
};

export default Button;
