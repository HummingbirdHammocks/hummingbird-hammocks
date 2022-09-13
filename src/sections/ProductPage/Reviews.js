import React, { useState, useEffect } from "react"
import { styled } from "@mui/material"

import JudgeMe from "utils/judgeMe"

const Wrapper = styled("section")(() => ({
  padding: "10px",
}))

export const Reviews = ({ handle, title }) => {
  const [reviews, setReviews] = useState(null)
  let reviewWidget = new JudgeMe(handle)

  useEffect(() => {
    setReviews(reviewWidget.getReviewWidget().then(data => setReviews(data)))
  }, [reviewWidget])

  return (
    <Wrapper>
      {reviews && (
        <div
          className="jdgm-widget jdgm-review-widget jdgm-outside-widget"
          data-id={reviews.product_external_id}
          data-product-title={title}
        >
          <div dangerouslySetInnerHTML={{ __html: reviews.widget }} />
        </div>
      )}
    </Wrapper>
  )
}
