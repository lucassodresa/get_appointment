import styled from 'styled-components';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Routes, Route, Navigate } from 'react-router-dom';
import useAxios from 'hooks/useAxios';
import { isLoggedInSelector } from 'recoil/user';
import GlobalLoading from 'shared/GlobalLoading';
import SignUp from 'pages/Auth/Signup';
import SignIn from 'pages/Auth/SignIn';
import ProtectedRoute from 'shared/ProtectedRoute';
import Profile from 'pages/Private/Profile';
import Services from 'pages/Private/Services';
import Appointments from 'pages/Private/Appointments';

const Container = styled.div`
  background: ${(props) => (props.isLoggedIn ? '#F2F2F2' : '#fff')};
  height: 100vh;
  width: 100%;
`;
function App() {
  const isLoggedIn = useRecoilValue(isLoggedInSelector);
  const { login, isLoadingLogin } = useAxios({ withAuth: true });

  useEffect(login, [login]);

  if (isLoadingLogin) return <GlobalLoading />;
  return (
    <Container isLoggedIn={isLoggedIn}>
      <Routes>
        <Route
          path="signup/*"
          element={isLoggedIn ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="signin"
          element={isLoggedIn ? <Navigate to="/" /> : <SignIn />}
        />
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<Navigate to="/appointments" />} />

          <Route path="appointments/*" element={<Appointments />} />

          <Route path="services/*" element={<Services />} />

          <Route path="profile/*" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
