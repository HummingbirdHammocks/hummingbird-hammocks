import { Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useContext } from 'react';

import { CartContext } from '../../contexts';

export const AddToCart = ({ variantId }) => {
  const theme = useTheme();
  const { updateLineItem } = useContext(CartContext);

  const handleSubmit = async () => {
    await updateLineItem({ variantId, quantity: 1 });
  };

  return (
    <Box
      justifyContent="center"
      display="flex"
      sx={{
        padding: '10px 0'
      }}>
      <Button
        onClick={handleSubmit}
        sx={{
          backgroundColor: 'transparent',

          [theme.breakpoints.down('md')]: {
            padding: '5px 10px',
            fontSize: '13px'
          }
        }}>
        Add to Cart
      </Button>
    </Box>
  );
};
