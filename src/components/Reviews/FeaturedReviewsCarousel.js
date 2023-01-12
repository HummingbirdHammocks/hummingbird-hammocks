import React, { useEffect } from "react"
import { Typography, Box, Grid } from "@mui/material"


export const FeaturedReviewsCarousel = () => {
  useEffect(() => {
    if (!window || !window.jdgmCacheServer) return;
    const jdgmCacheServer = window.jdgmCacheServer;
    jdgmCacheServer.reloadAll();
  }, [])

  return (
    <div className="jdgm-carousel-wrapper">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12}>
          <Typography
            sx={{
              textDecoration: "underline",
              textUnderlineOffset: "10px",
              textDecorationColor: "#cccc",
            }}
            textTransform="uppercase"
            textAlign="center"
            variant="h2"
          >
            Community Feedback
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="div">
            <a href="/reviews" className="jdgm-all-reviews-rating-wrapper">
              <Box data-score="" className="jdgm-all-reviews-rating"></Box>
              from <span className="jdgm-all-reviews-count"></span> reviews
            </a>
          </Typography>
        </Grid>
      </Grid>
    </div >
  )
}
