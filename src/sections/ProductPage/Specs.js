import React from "react"
import { Grid, Typography } from "@mui/material"

export const Specs = ({ metas, top }) => {
  const width = []
  const length = []
  let weight
  let height
  let weightRating
  let inUseNotes

  /* console.log(metas) */

  if (!metas) return null

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

    if (metas[i].key === "notes") {
      inUseNotes = metas[i].value
    }
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      spacing={2}
    >
      <Grid item xs={12} lg={6}>
        <Typography marginBottom={2} variant="h5">
          Packed
        </Typography>
        <Typography variant="body1">
          <b>Weight:</b> {weight} oz (
          {Number(parseFloat(weight * 28.3495)).toFixed(1)} g)
          <br />
          <b>Length:</b> {length[1]} in (
          {Number(parseFloat(length[1] * 2.54)).toFixed(1)} cm)
          <br />
          <b>Width:</b> {width[1]} in (
          {Number(parseFloat(width[1] * 2.54)).toFixed(1)} cm)
          <br />
          <b>Height:</b> {height} in (
          {Number(parseFloat(height * 2.54)).toFixed(1)} cm)
          <br />
        </Typography>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Typography marginBottom={2} variant="h5">
          In Use
        </Typography>
        <Typography variant="body1">
          <b>Weight Rating:</b> {weightRating} lbs (
          {Number(parseFloat(weightRating * 0.453592)).toFixed(1)} kg)
          <br />
          <b>Length:</b> {length[0]} in (
          {Number(parseFloat(length[0] * 2.54)).toFixed(1)} cm)
          <br />
          <b>Width:</b> {width[0]} in (
          {Number(parseFloat(width[0] * 2.54)).toFixed(1)} cm)
          {inUseNotes &&
            <div dangerouslySetInnerHTML={{ __html: inUseNotes }} />
          }
        </Typography>
      </Grid>
    </Grid>
  )
}
