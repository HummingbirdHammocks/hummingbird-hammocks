import React from "react"
import { useTheme, Box, Grid, Stack, Typography } from "@mui/material"

import { LinkButton, ButtonAnotherLink } from "components"

export function Details({ data, children }) {
  const theme = useTheme();
  const { title, subText, htmlText, buttonText, buttonLink, hrefLink } = data

  return (
    <Box
      sx={{
        margin: 4,

        [theme.breakpoints.down("sm")]: {
          margin: 0,
        },
      }}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          {children}
        </Grid>


        <Grid item xs={12} lg={6}>
          <Stack
            sx={{
              margin: 4,
            }}
            spacing={2}>
            <Typography
              textTransform="uppercase"
              sx={{ mb: 2 }}
              variant="h2"
            >
              {title}
            </Typography>
            {subText && (
              <Typography
                sx={{ mt: 2, maxWidth: "1200px" }}
                variant="body1"
              >
                {subText}
              </Typography>
            )}

            <Typography compoent="span" sx={{ mb: "30px" }}>
              {htmlText && <div dangerouslySetInnerHTML={{ __html: htmlText }} />}
            </Typography>

            {buttonText && (
              <Box>
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
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}
