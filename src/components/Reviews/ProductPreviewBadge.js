import React from "react"
import { Typography } from "@mui/material"

/* import { getProductPreviewBadge } from "utils/judgeMe" */

export const ProductPreviewBadge = ({ handle }) => {
  /* const [reviews, setReviews] = React.useState(null)

  React.useEffect(() => {
    setReviews(getProductPreviewBadge(handle).then(data => setReviews(data)))
  }, [handle])
 */
  return (
    <Typography component={"div"} sx={{ padding: "10px" }}>
      {/* {reviews && (
        <div dangerouslySetInnerHTML={{ __html: reviews.badge }} />
      )} */}
      <div class="jdgm-widget jdgm-preview-badge" data-id={handle}></div>
    </Typography>
  )
}
