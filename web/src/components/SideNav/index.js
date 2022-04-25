import React from 'react';
import { Divider } from 'antd';

import useAxios from '../../hooks/useAxios';
import { StyledLogoutButton, StyledSider } from './styles';
import AvatarContainer from '../AvatarContainer';

const SideNav = ({ children }) => {
  const { logout } = useAxios({ withAuth: true });

  return (
    <StyledSider>
      <div>
        <AvatarContainer />
        <Divider />
        {children}
      </div>
      <StyledLogoutButton onClick={logout}>Logout</StyledLogoutButton>
    </StyledSider>
  );
};

export default SideNav;
