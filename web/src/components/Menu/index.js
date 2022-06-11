import React from 'react';
import { Can } from 'shared/Can';
import { ROLE_PERMISSIONS_USER } from 'helpers/permissions';

import { StyledMenu, StyledNavLink, StyleMenuTitle, StyleSpan } from './styles';

const Menu = ({ items }) => {
  return (
    <StyledMenu>
      <StyleMenuTitle>Labels</StyleMenuTitle>
      {items?.map(({ to, icon, name, permission }) => (
        <Can key={to} I={ROLE_PERMISSIONS_USER.ACTIONS.SEE} a={permission}>
          <StyledNavLink key={to} to={to}>
            {icon}
            <StyleSpan>{name}</StyleSpan>
          </StyledNavLink>
        </Can>
      ))}
    </StyledMenu>
  );
};

export default Menu;
