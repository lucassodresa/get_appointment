import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoggedInSelector } from 'recoil/user';
import Layout from 'components/Layout';

const ProtectedRoute = () => {
  const isLoggedIn = useRecoilValue(isLoggedInSelector);

  return isLoggedIn ? <Layout /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
