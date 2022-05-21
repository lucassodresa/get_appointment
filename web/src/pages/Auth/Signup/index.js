import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { StyledSection } from '../styles';

import Title from '../../../shared/Title';
import Paragraph from '../../../shared/Paragraph';
import { Tabs } from 'antd';

import 'react-image-crop/dist/ReactCrop.css';
import UserForm from './components/UserForm';
import CompanyForm from './components/CompanyForm';

const { TabPane } = Tabs;

const SignUp = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <StyledSection>
      <Title>Sign Up</Title>
      <Paragraph marginBottom="52px">Access the app by signing up</Paragraph>

      <Tabs type="card" activeKey={pathname} onChange={navigate}>
        <TabPane tab="User" key="/signup" />
        <TabPane tab="Company" key="/signup/company" />
      </Tabs>

      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/company" element={<CompanyForm />} />
      </Routes>
    </StyledSection>
  );
};

export default SignUp;
