import { Box } from '@mui/material';
import { MainWrapper } from 'components';
import React from 'react';

export const IframeWrap = ({ children }) => {
  return (
    <MainWrapper>
      <Box
        sx={{
          marginBottom: '50px'
        }}>
        {children}
      </Box>
    </MainWrapper>
  );
};
