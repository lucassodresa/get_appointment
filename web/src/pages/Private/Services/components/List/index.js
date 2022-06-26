import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Page from 'shared/Page';
// import { PlusOutlined } from '@ant-design/icons';
// import useAxios from 'hooks/useAxios';
// import { useQuery } from 'react-query';
// import serviceService from 'services/service';
// import { Card } from 'antd';
// import {
//   EditOutlined,
//   ClockCircleOutlined,
//   EuroCircleOutlined
// } from '@ant-design/icons';
// import { StyledCardListContainer } from './styles';
import { GLOBALS } from '@get_appointment/shared';
import { useRecoilValue } from 'recoil';
import { userRoleSelector } from 'recoil/user';
import User from './components/User';
import Company from './components/Company';
const { ROLES } = GLOBALS.USER;
const List = () => {
  const userRole = useRecoilValue(userRoleSelector);
  // const { api } = useAxios({ withAuth: true });

  // const { data } = useQuery('services', serviceService.getServices(api));

  // const onChange = (currentSlide) => {
  //   // console.log(currentSlide);
  // };

  if (userRole === ROLES.NORMAL) return <User />;
  else if (userRole === ROLES.COMPANY) return <Company />;
  else return null;
};

export default List;
