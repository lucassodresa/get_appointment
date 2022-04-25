import { Avatar } from 'antd';
import styled from 'styled-components';
export const StyledAvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
`;

export const StyledAvatar = styled(Avatar)`
  margin-top: 40px;
  margin-bottom: 15px;
`;

export const StyledName = styled.h3`
  color: #001940;
`;
