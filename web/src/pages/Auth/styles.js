import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledSection = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;

  h1 {
    margin-top: 80px;
  }
`;

export const StyledLink = styled(Link)`
  background: #e6f2ff;
  color: #0079ff;
  border: none;

  &:hover {
    filter: brightness(0.95);
  }
`;
