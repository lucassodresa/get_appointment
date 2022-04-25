import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const StyledMenu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 100%;
  margin: 0;
  padding: 0;

  svg,
  span {
    color: #001940;
    transition: cubic-bezier(0.645, 0.045, 0.355, 1), color 0.3s;
  }
`;

export const StyledNavLink = styled(NavLink)`
  padding: 0 16px;
  height: 35px;
  margin-bottom: 8px;

  &:hover,
  &.active {
    svg,
    span {
      color: #1890ff;
    }
  }
`;

export const StyleSpan = styled.span`
  margin-left: 10px;
`;

export const StyleMenuTitle = styled.h4`
  padding: 0 16px;
  font-weight: bold;
  color: '#00194';
  margin-bottom: 25px;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.8px;
  text-transform: uppercase;
`;
