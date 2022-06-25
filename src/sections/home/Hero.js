import React from "react"
import { Box, Button, Typography } from "@mui/material"
import { StaticImage } from "gatsby-plugin-image"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    minHeight: "500px",
  },
  middle: {
    gridArea: "1/1",
    position: "relative",
    placeItems: "center",
    display: "grid",
  },
}))

export function Hero() {
  const classes = useStyles()

  return (
    <section className={classes.root}>
      <StaticImage
        style={{
          gridArea: "1/1",
        }}
        layout="fullWidth"
        alt="Ultralight Hammock"
        src="../../assets/images/home/Ultralight Hammock.jpeg"
        placeholder="blurred"
      />
      <div className={classes.middle}>
        <Box
          borderRadius={4}
          sx={{
            p: "20px 40px",
            backgroundColor: "titleBackground",
            "&:hover": {
              backgroundColor: "primary",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <Typography textAlign="center" variant="subtitle1">
            Tiny on the Scale, Tiny in your Pocket
          </Typography>
          <Typography
            textTransform="uppercase"
            textAlign="center"
            sx={{ maxWidth: "450px" }}
            color="white.main"
            variant="h1"
          >
            ULTRALIGHT HAMMOCKS FOR EVERY ADVENTURE
          </Typography>
          <Typography textAlign="center" variant="subtitle1">
            One Order Placed = Two Trees Planted
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button>Hello</Button>
            <Button>Hello</Button>
          </Box>
        </Box>
      </div>
    </section>
  )
}
