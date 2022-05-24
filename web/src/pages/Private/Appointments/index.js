import React from 'react';
import { useRecoilValue } from 'recoil';
import { userRoleSelector } from '../../../recoil/user';
import Page from '../../../shared/Page';

const Appointments = () => {
  const userRole = useRecoilValue(userRoleSelector);

  console.log(userRole);

  return <Page title="Appointments"></Page>;
};

export default Appointments;
