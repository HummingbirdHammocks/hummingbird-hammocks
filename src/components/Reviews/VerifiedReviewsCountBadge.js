import React from "react"
import { Box } from "@mui/material"

/* import { useImportScript } from 'hooks'; */
/* import { getVerifiedReviewsCountBadge } from "utils/judgeMe" */

export const VerifiedReviewsCountBadge = () => {
  /* const [reviews, setReviews] = React.useState(null)

  React.useEffect(() => {
    setReviews(getVerifiedReviewsCountBadge().then(data => setReviews(data)))
  }, []) */

  return (
    <Box sx={{ padding: "10px" }}>
      <div className="jdgm-verified-badge-wrapper"></div>
      {/* {reviews && (
        <div dangerouslySetInnerHTML={{ __html: reviews.verified_badge }} />
      )} */}
    </Box>
  )
}
