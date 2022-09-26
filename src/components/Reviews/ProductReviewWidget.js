import React, { useState, useEffect } from "react"
import { Box } from "@mui/material"

/* import { useImportScript } from 'hooks'; */
import { getProductReviewWidget } from "utils/judgeMe"

export const ProductReviewWidget = ({ handle, title }) => {
  const [reviews, setReviews] = useState(null)

/*   useImportScript("https://cdn.judge.me/widget_preloader.js");
  useImportScript("https://cdn.judge.me/assets/installed.js"); */

  useEffect(() => {
    setReviews(getProductReviewWidget(handle).then(data => setReviews(data)))
  }, [handle])

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
