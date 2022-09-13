import React from "react"
import { Box, Typography, useMediaQuery } from "@mui/material"

import { ProductDetailsGrid } from "sections"

export const Specs = ({ metas }) => {
  const matches = useMediaQuery("(max-width:900px)")
  const width = []
  const length = []
  let weight
  let height
  let weightRating

  for (let i = 0; i < metas.length; i++) {
    if (metas[i].key === "width") {
      width.push(metas[i].value)
    }

    if (metas[i].key === "length") {
      length.push(metas[i].value)
    }

    if (metas[i].key === "weight") {
      weight = metas[i].value
    }

    if (metas[i].key === "height") {
      height = metas[i].value
    }

    if (metas[i].key === "weight_rating") {
      weightRating = metas[i].value
    }
  }

  return (
    <ProductDetailsGrid title="SPECS">
      <Box mb={matches && "30px"}>
        <Typography marginBottom="15px" variant="h5">
          Packed
        </Typography>
        <Typography variant="body1">
          <b>Weight:</b> {weight} oz (
          {Number(parseFloat(weight * 28.3495)).toFixed(1)}g)
          <br />
          <b>Length:</b> {length[1]} in (
          {Number(parseFloat(length[1] * 2.54)).toFixed(1)}cm)
          <br />
          <b>Width:</b> {width[1]} in (
          {Number(parseFloat(width[1] * 2.54)).toFixed(1)}cm)
          <br />
          <b>Height:</b> {height} in (
          {Number(parseFloat(height * 2.54)).toFixed(1)}cm)
          <br />
        </Typography>
      </Box>
      <Box>
        <Typography marginBottom="15px" variant="h5">
          In Use
        </Typography>
        <Typography variant="body1">
          <b>Weight Rating:</b> {weightRating} oz (
          {Number(parseFloat(weightRating * 0.453592)).toFixed(1)}kg)
          <br />
          <b>Length:</b> {length[0]} in (
          {Number(parseFloat(length[0] * 2.54)).toFixed(1)}cm)
          <br />
          <b>Width:</b> {width[0]} in (
          {Number(parseFloat(width[0] * 2.54)).toFixed(1)}cm)
        </Typography>
      </Box>
    </ProductDetailsGrid>
  )
}
