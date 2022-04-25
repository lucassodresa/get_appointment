import { Button } from 'antd';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  background: #e6f2ff;
  color: #0079ff;
  border: none;

  &:hover {
    filter: brightness(0.95);
  }
`;
export default StyledButton;
