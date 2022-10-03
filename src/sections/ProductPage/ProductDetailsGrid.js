import React from "react"
import { Box, Grid, Divider, Typography, useMediaQuery } from "@mui/material"

export const ProductDetailsGrid = ({
  title,
  body1Title,
  body2Title,
  body1,
  body2,
  children,
  backgroundColor,
  accentColor,
}) => {
  const matches = useMediaQuery("(max-width:900px)")
  return (
    <Box
      sx={{
        backgroundColor: backgroundColor ? backgroundColor : "#FDFDF5",
        borderColor: accentColor ? accentColor : "rgba(0, 0, 0, 0.12)",
        borderStyle: "solid",
        borderWidth: "1px",
        borderRadius: "20px",
        padding: 4,
        marginTop: 2,
        marginBottom: 2,
      }}
    >
      <Typography mb={matches && "30px"} variant="h4">
        {title}
      </Typography>
      <Divider />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12} md={4}>

        </Grid>
        {body1 && (
          <Grid item xs={12} md={4}>
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
          <Grid item xs={12} md={4}>
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
