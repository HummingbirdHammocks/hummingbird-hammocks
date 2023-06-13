import { Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

export const MiddleBox = styled(Box)(({ divminheight, itemposition }) => ({
  display: 'flex',
  alignItems: itemposition ? itemposition : 'center',
  justifyContent: itemposition ? itemposition : 'center',
  minHeight: divminheight && divminheight
}));

export const MiddleSpinner = ({ divminheight, size, itemposition }) => (
  <MiddleBox itemposition={itemposition} divminheight={divminheight}>
    <CircularProgress size={size} />
  </MiddleBox>
);
