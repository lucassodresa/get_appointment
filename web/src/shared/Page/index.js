import React from 'react';
import Button from '../Button';
import { StyledHeader, StyledPage, StyledTitle, StyledBody } from './styles';
import { Tooltip } from 'antd';

const Page = ({ children, title, actionButtonIcon, action, tooltipText }) => {
  return (
    <StyledPage className="animationLeft">
      <StyledHeader>
        {actionButtonIcon && (
          <Tooltip title={tooltipText}>
            <Button
              style={{ marginLeft: '9px', marginRight: '9px' }}
              onClick={action}
              shape="circle"
            >
              {actionButtonIcon}
            </Button>
          </Tooltip>
        )}
        <StyledTitle>{title}</StyledTitle>
      </StyledHeader>
      <StyledBody>{children}</StyledBody>
    </StyledPage>
  );
};

export default Page;
