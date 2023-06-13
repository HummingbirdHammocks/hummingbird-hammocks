import { Box, Button, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'components';
import React from 'react';

export function Hero({ children, data }) {
  const theme = useTheme();
  const { subtitle1, mainText, subtitle2, button, position } = data;

  return (
    <Box
      sx={{
        display: 'grid',
        minHeight: '600px',
        position: 'relative',

        [theme.breakpoints.down('md')]: {
          minHeight: '0'
        }
      }}>
      {children}
      <Box
        sx={{
          position: { xs: 'center', md: 'absolute' },
          display: 'flex',
          left: position === 'left' ? '30%' : position === 'right' ? '67%' : '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',

          [theme.breakpoints.down('md')]: {
            left: '50%',
            position: 'inherit',
            display: 'block'
          }
        }}>
        <Box
          sx={{
            p: '20px 40px',
            backgroundColor: { xs: 'blackBackground', md: 'titleBackground' },
            borderRadius: { xs: '0', md: '20px' }
          }}>
          <Typography
            sx={{
              margin: '20px 10px;',
              color: { xs: '#000000', md: '#ffffff' },
              textAlign: {
                xs: 'center',
                md: position === 'left' ? 'left' : position === 'right' ? 'right' : 'center'
              }
            }}
            variant="subtitle1">
            {subtitle1}
          </Typography>
          <Typography
            textTransform="uppercase"
            sx={{
              marginBottom: 4,
              color: { xs: '#000000', md: '#ffffff' },
              maxWidth: { xs: '100%', md: '550px' },
              textAlign: {
                xs: 'center',
                md: position === 'left' ? 'left' : position === 'right' ? 'right' : 'center'
              }
            }}
            variant="h1">
            {mainText}
          </Typography>
          {subtitle2 && (
            <Typography
              sx={{
                marginBottom: { xs: 1, md: 4 },
                color: { xs: '#000000', md: '#ffffff' },
                maxWidth: { xs: '100%', md: '550px' },
                textAlign: {
                  xs: 'center',
                  md: position === 'left' ? 'left' : position === 'right' ? 'right' : 'center'
                }
              }}
              variant="subtitle1">
              {subtitle2}
            </Typography>
          )}

          {button && (
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              justifyContent="center"
              alignItems="center"
              spacing={2}>
              {button.map((item) =>
                item.type === 'href' ? (
                  <Button
                    variant="contained"
                    href={item.url}
                    key={item.id}
                    compoent="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      padding: { xs: '12px 40px', md: '11px 22px' },
                      margin: { xs: '2px', md: '10px' }
                    }}>
                    <Typography textAlign="center" variant="subtitle2">
                      {item.text}
                    </Typography>
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    key={item.id}
                    component={Link}
                    to={item.url}
                    sx={{
                      padding: { xs: '12px 40px', md: '11px 22px' },
                      margin: { xs: '2px', md: '10px' }
                    }}>
                    <Typography textAlign="center" variant="subtitle2">
                      {item.text}
                    </Typography>
                  </Button>
                )
              )}
            </Stack>
          )}
        </Box>
      </Box>
    </Box>
  );
}
