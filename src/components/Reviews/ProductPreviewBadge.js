import React, { useState, useEffect } from "react"
import { Box } from "@mui/material"

import { getProductPreviewBadge } from "utils/judgeMe"

export const ProductPreviewBadge = ({ handle, title }) => {
  const [reviews, setReviews] = useState(null)

  useEffect(() => {
    setReviews(getProductPreviewBadge(handle).then(data => setReviews(data)))
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
