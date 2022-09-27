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
        <div dangerouslySetInnerHTML={{ __html: reviews.verified_badge }} />
      )}
    </Box>
  )
}
