import React from "react"
import { Typography } from "@mui/material"

export const FeaturedReviewsCarousel = () => {

  return (
    <Typography component={"div"} sx={{ padding: "10px" }}>
      <div class="jdgm-carousel-wrapper">
        <h2 class="jdgm-carousel-title">Community Feedback</h2>
        <a href="/reviews" class="jdgm-all-reviews-rating-wrapper">
          <div data-score="" class="jdgm-all-reviews-rating"></div>
          from <span class="jdgm-all-reviews-count"></span> reviews  </a>
      </div>
    </Typography >
  )
}
