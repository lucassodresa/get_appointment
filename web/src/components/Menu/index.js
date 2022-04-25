import React from 'react';

import { StyledMenu, StyledNavLink, StyleMenuTitle, StyleSpan } from './styles';

const Menu = ({ items }) => {
  return (
    <StyledMenu>
      <StyleMenuTitle>Labels</StyleMenuTitle>
      {items.map(({ to, icon, name }) => (
        <StyledNavLink key={to} to={to}>
          {icon}
          <StyleSpan>{name}</StyleSpan>
        </StyledNavLink>
      ))}
    </StyledMenu>
  );
};

export default Menu;
