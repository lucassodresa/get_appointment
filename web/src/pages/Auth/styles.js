import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`;

export const StyledLink = styled(Link)`
  background: #e6f2ff;
  color: #0079ff;
  border: none;

  &:hover {
    filter: brightness(0.95);
  }
`;
