import styled from 'styled-components';

export const StyledParagraph = styled.p`
  color: #9cadbf;
  font-size: 14px;
  margin-top: ${(props) => props.marginTop || 0};
  margin-bottom: ${(props) => props.marginBottom || 0};
  text-align: center;
`;
