import React from 'react';
import { useRecoilValue } from 'recoil';
import { userRoleSelector } from '../../../recoil/user';
import Page from '../../../shared/Page';
import { GLOBALS } from '@get_appointment/shared';
const { ROLES } = GLOBALS.USER;

const Profile = () => {
  const userRole = useRecoilValue(userRoleSelector);

  if (!userRole) return null;

  return (
    <Page title="Profile">
      {userRole === ROLES.NORMAL && 'You are a Normal user'}
      {userRole === ROLES.COMPANY && 'You are a Company user'}
    </Page>
  );
};

export default Profile;
