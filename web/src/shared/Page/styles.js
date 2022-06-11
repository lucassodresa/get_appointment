import styled from 'styled-components';

export const StyledPage = styled.main`
  width: 100%;
  margin: 50px;
  padding-top: 40px;
  background: white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`;

export const StyledTitle = styled.h1`
  font-weight: 400;
  font-size: 27px;
  line-height: 32px;
  color: #002257;
`;

export const StyledHeader = styled.header`
  display: flex;
`;

export const StyledBody = styled.main`
  height: 100%;
  padding-left: 50px;
  padding-right: 50px;
  margin-top: 40px;
  overflow-y: auto;
  padding-bottom: 30px;
  /* scroll-margin-bottom: 50px; */
`;
