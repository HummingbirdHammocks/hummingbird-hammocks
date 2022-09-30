import React from "react"

export const FeaturedReviewsCarousel = () => {

  return (
    <div className="jdgm-carousel-wrapper">
      <h2 className="jdgm-carousel-title">Community Feedback</h2>
      <a href="/reviews" className="jdgm-all-reviews-rating-wrapper">
        <div data-score="" className="jdgm-all-reviews-rating"></div>
        from <span className="jdgm-all-reviews-count"></span> reviews  </a>
    </div>
  )
}
