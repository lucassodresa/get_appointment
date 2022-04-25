import { Spin } from 'antd';
import styled from 'styled-components';

export const StyledLoading = styled(Spin)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
`;
