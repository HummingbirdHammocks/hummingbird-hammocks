import React, { useEffect, useCallback } from "react"
import { useTheme, useMediaQuery, Box, Typography } from "@mui/material"
import { Close } from "@mui/icons-material"
//firebase
import { getRemoteValue } from "../../utils/firebase/remoteConfig"

import { useTopBannerContext } from "contexts"
import { MainWrapper, AnotherLink } from "components"

export const TopBanner = () => {
  const theme = useTheme();
  const matches = useMediaQuery("(max-width:900px)")
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
            top: 0,
            zIndex: 1200,
            width: "100%",
          }}>
          <MainWrapper>
            <Box
              sx={{
                minHeight: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                [theme.breakpoints.down("md")]: {
                  minHeight: "90px",
                },
              }}>
              <Box display={!matches && "flex"} textAlign="center">
                <Typography
                  pb={matches && "10px"}
                  fontSize={matches && "14px"}
                  color="#fff"
                >
                  {banner.description}
                </Typography>

                {(banner.buttonText && banner.buttonLink) && (
                  <AnotherLink
                    sx={{
                      background: "rgb(16, 34, 14)",
                      color: "#fff",
                      padding: "5px 7px",
                      borderRadius: "5px",
                      marginLeft: "10px",
                    }}
                    href={banner.buttonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {banner.buttonText}
                  </AnotherLink>
                )}
              </Box>
            </Box>
          </MainWrapper>
          <Box
            sx={{
              position: "absolute",
              top: "12px",
              right: "20px",
              cursor: "pointer",

              "&:hover": {
                opacity: 0.7,
              },

              [theme.breakpoints.down("md")]: {
                right: "7px",
              },
            }}
            onClick={() => setBannerOpen(false)}
          >
            <Close color="white" />
          </Box>
        </Box>
      )}
    </>
  )
}
