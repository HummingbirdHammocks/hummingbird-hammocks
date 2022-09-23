import React from "react"
import { useTheme, Box, Grid, Divider, Typography, useMediaQuery } from "@mui/material"

export const ProductDetailsGrid = ({
  title,
  body1Title,
  body2Title,
  body1,
  body2,
  children,
  top
}) => {
  const theme = useTheme();
  const matches = useMediaQuery("(max-width:900px)")
  return (
    <Box sx={{
      padding: "10px",

      [theme.breakpoints.down("md")]: {
        padding: "0",
      },
    }}>
      {!top && <Divider />}
      <Grid
        container
        spacing={2}
        sx={{
          padding: "40px 10px",

          [theme.breakpoints.down("md")]: {
            padding: "40px 0",
          },
        }}>
        <Grid item xs={12} lg={4}>
          <Typography mb={matches && "30px"} variant="h4">
            {title}
          </Typography>
        </Grid>
        {body1 && (
          <Grid item xs={12} lg={4}>
            <Box mb={matches && "30px"}>
              {body1Title && <Typography variant="h5">{body1Title}</Typography>}
              <Typography component="span">
                <div dangerouslySetInnerHTML={{ __html: body1 }} />
              </Typography>
            </Box>
          </Grid>
        )}
        {children}

        {body2Title && (
          <Grid item xs={12} lg={4}>
            <Box mb={matches && "30px"}>
              <Typography variant="h5">{body2Title}</Typography>
              <Typography component="span">
                <div dangerouslySetInnerHTML={{ __html: body2 }} />
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box >
  )
}
