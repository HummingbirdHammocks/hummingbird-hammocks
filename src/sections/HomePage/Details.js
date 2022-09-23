import React from "react"
import { useTheme } from '@mui/material/styles';
import { styled, Box, Typography, useMediaQuery, Divider } from "@mui/material"

import { LinkButton, ButtonAnotherLink } from "components"

const MainGridWrapper = styled("div")(({ theme, orderkey, titleFont }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gridGap: "20px",
  margin: "0 200px",

  "& h2": {
    ...theme.typography.h2,
    textTransform: "uppercase",
    fontSize: titleFont ? titleFont : "31px",
  },

  "& p": {
    ...theme.typography.body1,
  },

  "& img": {
    borderRadius: "20px",
    width: "100%",
  },

  "& .order": {
    order: orderkey,

    [theme.breakpoints.down("md")]: {
      order: "1!important",
    },
  },

  [theme.breakpoints.down("lg")]: {
    margin: "0",
  },

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}))

export function Details({ data, children, order, divider, titleFont }) {
  const theme = useTheme();
  const { title, subText, htmlText, buttonText, buttonLink, hrefLink } = data
  const matches = useMediaQuery("(max-width:900px)")

  return (
    <Box
      sx={{
        background: theme.palette.white,
        padding: "80px 15px",
        whiteSpace: "pre-wrap",

        [theme.breakpoints.down("md")]: {
          padding: "40px 0",
        },
      }}>
      <MainGridWrapper titleFont={titleFont} orderkey={order}>
        <Box
          display={matches && "flex"}
          justifyContent={matches && "center"}
          className={!matches && "order"}
        >
          {children}
        </Box>

        <Box display={matches && "flex"} marginBottom={matches ? "50px" : "0"}>
          <Box
            sx={{
              padding: "0 60px",
              position: "relative",
              top: "50%",
              transform: "translateY(-50%)",
              maxWidth: "500px",

              [theme.breakpoints.down("md")]: {
                padding: "0",
              },
            }}>
            <Typography
              textTransform="uppercase"
              sx={{ mb: "30px" }}
              variant="h2"
            >
              {title}
            </Typography>
            {subText && (
              <Typography
                sx={{ mt: "30px", maxWidth: "1200px" }}
                variant="body1"
              >
                {subText}
              </Typography>
            )}

            {htmlText && <div dangerouslySetInnerHTML={{ __html: htmlText }} />}

            {buttonText && (
              <Box margin="40px 0 0 0">
                {hrefLink ? (
                  <ButtonAnotherLink
                    bordercolor="#34542a"
                    rel="noopener noreferrer"
                    target="_blank"
                    href={hrefLink}
                  >
                    {buttonText}
                  </ButtonAnotherLink>
                ) : (
                  <LinkButton
                    bordercolor="#34542a"
                    color="black"
                    background="transparent"
                    to={buttonLink}
                  >
                    {buttonText}
                  </LinkButton>
                )}
              </Box>
            )}
          </Box>
        </Box>
      </MainGridWrapper>
      {matches === divider && <Divider />}
    </Box>
  )
}
