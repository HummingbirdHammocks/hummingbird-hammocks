import React from "react"
import { useMediaQuery, styled, Box, Typography } from "@mui/material"
import { Close } from "@mui/icons-material"

import { useTopBannerContext } from "contexts"
import { MainWrapper, AnotherLink } from "components"

const TopBarWrapper = styled(Box)(({ theme }) => ({
  background: "rgb(41, 85, 36)",
  position: "fixed",
  top: 0,
  zIndex: 1201,
  width: "100%",
}))

const TopBarContent = styled(Box)(({ theme }) => ({
  minHeight: "50px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  [theme.breakpoints.down("md")]: {
    minHeight: "90px",
  },
}))

const CloseTopBar = styled(Box)(({ theme }) => ({
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
}))

export const TopBanner = () => {
  const matches = useMediaQuery("(max-width:900px)")
  const { banner, setBanner } = useTopBannerContext()

  return (
    <>
      {banner && (
        <TopBarWrapper>
          <MainWrapper>
            <TopBarContent>
              <Box display={!matches && "flex"} textAlign="center">
                <Typography
                  pb={matches && "10px"}
                  fontSize={matches && "14px"}
                  color="#fff"
                >
                  USPS Service Suspension in select countries. Alternate
                  shipping service is recommended.
                </Typography>

                <AnotherLink
                  sx={{
                    background: "rgb(16, 34, 14)",
                    color: "#fff",
                    padding: "5px 7px",
                    borderRadius: "5px",
                    marginLeft: "10px",
                  }}
                  href="https://about.usps.com/newsroom/service-alerts/international/?utm_source=residential&utm_medium=link&utm_campaign=res_to_intl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CURRENT SUSPENSION LIST
                </AnotherLink>
              </Box>
            </TopBarContent>
          </MainWrapper>
          <CloseTopBar onClick={() => setBanner(false)}>
            <Close color="white" />
          </CloseTopBar>
        </TopBarWrapper>
      )}
    </>
  )
}
