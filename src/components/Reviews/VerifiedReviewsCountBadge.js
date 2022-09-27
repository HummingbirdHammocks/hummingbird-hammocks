import React, { useState, useEffect } from "react"
import { Box } from "@mui/material"

/* import { useImportScript } from 'hooks'; */
import { getVerifiedReviewsCountBadge } from "utils/judgeMe"

export const VerifiedReviewsCountBadge = () => {
  const [reviews, setReviews] = useState(null)

  useEffect(() => {
    setReviews(getVerifiedReviewsCountBadge().then(data => setReviews(data)))
  }, [])

  return (
    <Box sx={{ padding: "10px" }}>
      {reviews && (
        <div
          className="jdgm-widget jdgm-review-widget jdgm-outside-widget"
          data-id={reviews.product_external_id}
          data-product-title={"Hummingbird Hammocks Verified Reviews"}
        >
          <div dangerouslySetInnerHTML={{ __html: reviews.widget }} />
        </div>
      )}
    </Box>
  )
}
