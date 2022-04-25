import React from 'react';

import { StyledPage, StyledTitle } from './styles';

const Page = ({ children, title }) => {
  return (
    <StyledPage className="animationLeft">
      <StyledTitle>{title}</StyledTitle>
      {children}
    </StyledPage>
  );
};

export default Page;
