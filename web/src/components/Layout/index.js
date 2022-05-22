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

const items = [
  { to: '/appointments', icon: <CalendarOutlined />, name: 'Appointments' },
  { to: '/services', icon: <FileSearchOutlined />, name: 'Services' }
];

const Layout = () => {
  const { api } = useAxios({ withAuth: true });
  const { data } = useQuery('userInfo', userService.getMe(api));
  const setLoggedUserInfo = useSetRecoilState(loggedUserInfoState);

  useEffect(() => {
    data &&
      setLoggedUserInfo((prevState) => {
        const { user } = data?.data;

        return user;
      });
  }, [data, setLoggedUserInfo]);
  return (
    <StyledLayout>
      <SideNav>
        <Menu items={items} />
      </SideNav>
      <Outlet />
    </StyledLayout>
  );
};

export default Layout;
