import React, { useState, useEffect } from "react"
import { Typography } from "@mui/material"

import { getProductPreviewBadge } from "utils/judgeMe"

export const ProductPreviewBadge = ({ handle }) => {
  const [reviews, setReviews] = useState(null)

  useEffect(() => {
    setReviews(getProductPreviewBadge(handle).then(data => setReviews(data)))
  }, [handle])

  return (
    <Typography component={"div"} sx={{ padding: "10px" }}>
      {reviews && (
        <div dangerouslySetInnerHTML={{ __html: reviews.badge }} />
      )}
    </Typography>
  )
}
