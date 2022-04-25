import styled from 'styled-components';
import { Layout } from 'antd/lib';
const { Sider } = Layout;

export const StyledSider = styled(Sider)`
  height: 100%;
  background: white;
  & .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const StyledLogoutButton = styled.h3`
  background: #e6f2ff;
  color: #0079ff;
  border: none;
  text-align: center;
  padding: 6px 0;
  margin: 0 25px;
  margin-bottom: 35px;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 2px;

  &:hover {
    filter: brightness(0.95);
  }
`;
