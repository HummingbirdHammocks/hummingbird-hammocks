import React from "react"

export const DetailsImage = ({ src, title }) => {
  return <img style={{ borderRadius: "20px" }} src={src} alt={title} />
}
