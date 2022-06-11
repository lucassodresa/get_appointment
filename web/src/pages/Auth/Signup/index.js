import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { StyledSection } from '../styles';
import { UserOutlined, DesktopOutlined } from '@ant-design/icons';
import Title from 'shared/Title';
import Paragraph from 'shared/Paragraph';
import { Tabs } from 'antd';

import 'react-image-crop/dist/ReactCrop.css';
import UserForm from './components/UserForm';
import CompanyForm from './components/CompanyForm';
import styled from 'styled-components';

const { TabPane } = Tabs;
const StyledTabs = styled(Tabs)`
  .ant-tabs-nav-more {
    display: none;
  }
`;

const SignUp = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <StyledSection>
      <Title>Sign Up</Title>
      <Paragraph marginBottom="52px">Access the app by signing up</Paragraph>

      <StyledTabs activeKey={pathname} onChange={navigate}>
        <TabPane
          tab={
            <span>
              <UserOutlined />
              User
            </span>
          }
          key="/signup"
        />
        <TabPane
          tab={
            <span>
              <DesktopOutlined />
              Company
            </span>
          }
          key="/signup/company"
        />
      </StyledTabs>

      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/company" element={<CompanyForm />} />
      </Routes>
    </StyledSection>
  );
};

export default SignUp;
