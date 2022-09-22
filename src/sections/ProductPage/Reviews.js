import React, { useState, useEffect } from "react"
import { Box } from "@mui/material"

import JudgeMe from "utils/judgeMe"

export const Reviews = ({ handle, title }) => {
  const [reviews, setReviews] = useState(null)
  let reviewWidget = new JudgeMe(handle)

  useEffect(() => {
    setReviews(reviewWidget.getReviewWidget().then(data => setReviews(data)))
  }, [reviewWidget])

  return (
    <Box sx={{ padding: "10px" }}>
      {reviews && (
        <div
          className="jdgm-widget jdgm-review-widget jdgm-outside-widget"
          data-id={reviews.product_external_id}
          data-product-title={title}
        >
          <div dangerouslySetInnerHTML={{ __html: reviews.widget }} />
        </div>
      )}
    </Box>
  )
}
