import React from "react"
import { Box, Grid, Stack, Typography, useMediaQuery } from "@mui/material"

import { LinkButton, ButtonAnotherLink } from "components"

export function Details({ data, children }) {
  const { title, subText, htmlText, buttonText, buttonLink, hrefLink } = data

  return (
    <Box
      sx={{
        margin: 4,
      }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {children}
        </Grid>


        <Grid item xs={12} md={6}>
          <Stack
            sx={{
              margin: 4,
            }}
            spacing={2}>
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

            <Box sx={{ mb: "30px" }}>
              {htmlText && <div dangerouslySetInnerHTML={{ __html: htmlText }} />}
            </Box>

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
