import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { CalendarOutlined, FileSearchOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import { loggedUserInfoState } from '../../recoil/user';
import userService from '../../services/user';
import { StyledLayout } from './styles';
import SideNav from '../SideNav';
import Menu from '../Menu';
import { getAbility, ROLE_PERMISSIONS_USER } from '../../helpers/permissions';
import { AbilityContext } from '../../shared/Can';

const { RESOURCES } = ROLE_PERMISSIONS_USER;
const items = [
  {
    name: 'Appointments',
    to: '/appointments',
    icon: <CalendarOutlined />,
    permission: RESOURCES.NAV_APPOINTMENTS
  },
  {
    name: 'Services',
    to: '/services',
    icon: <FileSearchOutlined />,
    permission: RESOURCES.NAV_SERVICES
  }
];

const Layout = () => {
  const { api } = useAxios({ withAuth: true });
  const { data } = useQuery('userInfo', userService.getMe(api));
  const setLoggedUserInfo = useSetRecoilState(loggedUserInfoState);
  const userRole = getAbility(data?.data?.user?.role);

  useEffect(() => {
    data &&
      setLoggedUserInfo((prevState) => {
        const { user } = data?.data;

        return user;
      });
  }, [data, setLoggedUserInfo]);
  return (
    <AbilityContext.Provider value={userRole}>
      <StyledLayout>
        <SideNav>
          <Menu items={items} />
        </SideNav>
        <Outlet />
      </StyledLayout>
    </AbilityContext.Provider>
  );
};

export default Layout;
