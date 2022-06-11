import React from 'react';
import { useRecoilValue } from 'recoil';
import { userRoleSelector } from '../../../recoil/user';
// import { GLOBALS } from '@get_appointment/shared';
import { Route, Routes } from 'react-router-dom';
import List from './components/List';
import New from './components/New';
import ServiceType from './components/New/components/ServiceType';
// const { ROLES } = GLOBALS.USER;

const Services = () => {
  const userRole = useRecoilValue(userRoleSelector);

  if (!userRole) return null;

  return (
    <Routes>
      <Route element={<List />} index />
      <Route path="new">
        <Route index element={<New />} />
        <Route path="service-type" element={<ServiceType />} />
      </Route>
      {/* <Route path="/:serviceId" element={<h1>Edit</h1>} /> */}
      <Route path="*" element={<h1>No match</h1>} />
    </Routes>
    // {userRole === ROLES.NORMAL && 'You are a Normal user'}
    // {userRole === ROLES.COMPANY && 'You are a Company user'}
  );
};

export default Services;
