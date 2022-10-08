import React from "react"
import { useTheme, Box, Grid, Stack, Typography, Button } from "@mui/material"

import { Link } from "components"

export function Details({ data, children }) {
  const theme = useTheme();
  const { title, subText, htmlText, buttonText, buttonLink, hrefLink } = data

  return (
    <Box
      sx={{
        marginTop: 4,
        marginBottom: 4,

        [theme.breakpoints.down("sm")]: {
          margin: 0,
        },
      }}>
      <Grid container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12} md={6}>
          {children}
        </Grid>


        <Grid item xs={12} md={6}>
          <Stack
            sx={{
              margin: { xs: 0, md: 4 },
              marginBottom: { xs: 4, md: 0 },
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
                component={"span"}
              >
                {subText}
              </Typography>
            )}

            <Typography component="span" sx={{ mb: "30px" }}>
              {htmlText && <div dangerouslySetInnerHTML={{ __html: htmlText }} />}
            </Typography>

            {buttonText && (
              <Box>
                {hrefLink ? (
                  <Button
                    variant="outlined"
                    rel="noopener noreferrer"
                    target="_blank"
                    component="a"
                    href={hrefLink}
                  >
                    {buttonText}
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    component={Link}
                    to={buttonLink}
                  >
                    {buttonText}
                  </Button>
                )}
              </Box>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}
