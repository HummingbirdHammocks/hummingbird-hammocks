import React, { useEffect } from "react"
import { Typography } from "@mui/material"

export const ProductReviewWidget = ({ title, id }) => {

  useEffect(() => {
    if (!window || !window.jdgmCacheServer) return;
    const jdgmCacheServer = window.jdgmCacheServer;
    jdgmCacheServer.reloadAllWidgets();
  }, [id])

  if (!id) {
    return null
  }

  const id_only = id.split("gid://shopify/Product/")[1]

  return (
    <Typography component={"div"} sx={{ padding: "10px" }}>
      <div className="jdgm-widget jdgm-review-widget jdgm-outside-widget" data-id={id_only} data-product-title={title}></div>
    </Typography>
  )
}
