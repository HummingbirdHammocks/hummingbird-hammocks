import { Box, Container, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { productBackgrounds } from '../../utils';

export function ProductHero({ children, handle, backgroundColor, accentcolor }) {
  const [background, setBackground] = useState(null);

  useEffect(() => {
    if (handle) {
      setBackground(productBackgrounds(handle));
    }
  }, [handle]);

  return (
    <>
      <Box display={{ xs: 'none', md: 'block' }}>
        <Box
          sx={{
            height: '100%',
            width: 'auto',
            backgroundColor: backgroundColor ? backgroundColor : '#FDFDF5',
            backgroundImage: background,
            backgroundSize: 'cover'
          }}>
          <Container
            maxWidth="lg"
            sx={{
              paddingTop: 4,
              paddingBottom: 4,
              paddingLeft: 2,
              paddingRight: 2
            }}>
            <Paper
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                borderColor: accentcolor ? accentcolor : 'rgba(0, 0, 0, 0.12)',
                borderStyle: 'solid',
                borderWidth: '2px',
                borderRadius: '20px',
                padding: 4
              }}>
              {children}
            </Paper>
          </Container>
        </Box>
      </Box>
      <Box display={{ xs: 'block', md: 'none' }}>
        <Box
          sx={{
            padding: 2
          }}>
          {children}
        </Box>
      </Box>
    </>
  );
}
