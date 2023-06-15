import { Close } from '@mui/icons-material';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useCallback, useEffect } from 'react';

// components
import { MainWrapper } from '../../components';
// stores
import { useUIDispatch, useUIStore } from '../../stores';
//firebase
import { getRemoteValue } from '../../utils/firebase/remoteConfig';

export const TopBanner = () => {
  const theme = useTheme();

  const { bannerOpen, banner } = useUIStore();
  const uiDispatch = useUIDispatch();

  const getConfig = useCallback(async () => {
    const val = await getRemoteValue('top_banner');
    /* console.log(val) */
    if (val && val._value !== '') {
      uiDispatch({ type: 'setBanner', banner: JSON.parse(val._value) });
    }
  }, [uiDispatch]);

  useEffect(() => {
    getConfig();
  }, [getConfig]);

  return (
    <>
      {bannerOpen && banner && (
        <Box
          sx={{
            background: 'rgb(41, 85, 36)',
            zIndex: 1200,
            width: '100%'
          }}>
          <MainWrapper>
            <Stack
              direction={{ xs: 'column', lg: 'row' }}
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{
                padding: 1
              }}>
              <Typography
                sx={{
                  color: '#ffffff'
                }}
                variant="body1">
                {banner.description}
              </Typography>

              {banner.buttonText && banner.buttonLink && (
                <Button
                  component={'a'}
                  href={banner.buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    background: 'rgb(16, 34, 14)',
                    color: '#fff'
                  }}>
                  {banner.buttonText}
                </Button>
              )}
            </Stack>
          </MainWrapper>
          <IconButton
            size="small"
            sx={{
              position: 'absolute',
              top: '2px',
              right: '20px',

              [theme.breakpoints.down('md')]: {
                right: '7px'
              }
            }}
            onClick={() => uiDispatch({ type: 'setBannerOpen', bannerOpen: false })}>
            <Close color="white" />
          </IconButton>
        </Box>
      )}
    </>
  );
};
