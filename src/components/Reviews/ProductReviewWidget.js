import React, { useState, useEffect } from "react"
import { Typography } from "@mui/material"

/* import { useImportScript } from 'hooks'; */
import { getProductReviewWidget } from "utils/judgeMe"

export const ProductReviewWidget = ({ handle, title }) => {
  const [reviews, setReviews] = useState(null)

  useEffect(() => {
    setReviews(getProductReviewWidget(handle).then(data => setReviews(data)))
  }, [handle])

  return (
    <Typography component={"div"} sx={{ padding: "10px" }}>
      {reviews && (
        <div
          className="jdgm-widget jdgm-review-widget jdgm-outside-widget"
          data-id={reviews.product_external_id}
          data-product-title={title}
        >
          <div dangerouslySetInnerHTML={{ __html: reviews.widget }} />
        </div>
      )}
    </Typography>
  )
}
