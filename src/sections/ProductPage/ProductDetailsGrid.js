import React from "react"
import { Box, Grid, Divider, Typography } from "@mui/material"

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

  return (
    <Box
      sx={{
        backgroundColor: backgroundColor ? backgroundColor : "#FDFDF5",
        borderColor: accentColor ? accentColor : "rgba(0, 0, 0, 0.12)",
        borderStyle: "solid",
        borderWidth: "2px",
        borderRadius: "20px",
        padding: 4,
        marginTop: 2,
        marginBottom: 2,
        maxHeight: "800px",
      }}
    >
      <Typography variant="h4">
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
            {body1Title && <Typography variant="h5">{body1Title}</Typography>}
            <Typography component="span">
              <div dangerouslySetInnerHTML={{ __html: body1 }} />
            </Typography>
          </Grid>
        )}
        {children}

        {body2Title && (
          <Grid item xs={12} md={4}>
            <Typography variant="h5">{body2Title}</Typography>
            <Typography component="span">
              <div dangerouslySetInnerHTML={{ __html: body2 }} />
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box >
  )
}
