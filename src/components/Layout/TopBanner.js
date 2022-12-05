import React, { useEffect, useCallback } from "react"
import { useTheme, Box, Button, Stack, IconButton, Typography } from "@mui/material"
import { Close } from "@mui/icons-material"
//firebase
import { getRemoteValue } from "../../utils/firebase/remoteConfig"

import { useTopBannerContext } from "contexts"
import { MainWrapper } from "components"

export const TopBanner = () => {
  const theme = useTheme();
  const { bannerOpen, setBannerOpen, banner, setBanner } = useTopBannerContext()

  const getConfig = useCallback(async () => {
    const val = await getRemoteValue("top_banner");
    /* console.log(val) */
    if (val && val._value !== "") {
      setBanner(JSON.parse(val._value))
    }
  }, [setBanner])

  useEffect(() => {
    getConfig()
  }, [getConfig])

  return (
    <>
      {(bannerOpen && banner) && (
        <Box
          sx={{
            background: "rgb(41, 85, 36)",
            zIndex: 1200,
            width: "100%",
          }}>
          <MainWrapper>
            <Stack
              direction={{ xs: 'column', lg: 'row' }}
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{
                padding: 1,
              }}
            >
              <Typography
                sx={{
                  color: "#ffffff",
                }}
                variant="body1"
              >
                {banner.description}
              </Typography>

              {(banner.buttonText && banner.buttonLink) && (
                <Button
                  component={'a'}
                  href={banner.buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    background: "rgb(16, 34, 14)",
                    color: "#fff",
                  }}
                >
                  {banner.buttonText}
                </Button>
              )}
            </Stack>
          </MainWrapper>
          <IconButton
            size="small"
            sx={{
              position: "absolute",
              top: "2px",
              right: "20px",

              [theme.breakpoints.down("md")]: {
                right: "7px",
              },
            }}
            onClick={() => setBannerOpen(false)}
          >
            <Close color="white" />
          </IconButton>
        </Box>
      )}
    </>
  )
}
