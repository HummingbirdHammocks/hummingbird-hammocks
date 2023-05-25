import React from "react"
import { Grid, Typography } from "@mui/material"

export const Specs = ({ metas, top }) => {
  let packed_length
  let packed_width
  let packed_height
  let packed_weight
  let packed_notes
  let in_use_length
  let in_use_width
  let in_use_height
  let in_use_weight_rating
  let in_use_notes

  /* console.log(metas) */

  const convertInToCm = (inches) => {
    return Number(parseFloat(inches * 2.54)).toFixed(1)
  }

  const convertOzToGr = (oz) => {
    return Number(parseFloat(oz * 28.3495)).toFixed(1)
  }

  const convertLbToKg = (pounds) => {
    return Number(parseFloat(pounds * 0.453592)).toFixed(1)
  }

  if (!metas) return null

  for (let i = 0; i < metas.length; i++) {
    if (metas[i].namespace === "packed" && metas[i].key === "length") {
      packed_length = metas[i].value
    }

    if (metas[i].namespace === "packed" && metas[i].key === "width") {
      packed_width = metas[i].value
    }

    if (metas[i].namespace === "packed" && metas[i].key === "height") {
      packed_height = metas[i].value
    }

    if (metas[i].namespace === "packed" && metas[i].key === "notes") {
      packed_notes = metas[i].value
    }

    if (metas[i].namespace === "packed" && metas[i].key === "weight") {
      packed_weight = metas[i].value
    }

    if (metas[i].namespace === "in_use" && metas[i].key === "length") {
      in_use_length = metas[i].value
    }

    if (metas[i].namespace === "in_use" && metas[i].key === "width") {
      in_use_width = metas[i].value
    }

    if (metas[i].namespace === "in_use" && metas[i].key === "height") {
      in_use_height = metas[i].value
    }

    if (metas[i].namespace === "in_use" && metas[i].key === "weight_rating") {
      in_use_weight_rating = metas[i].value
    }

    if (metas[i].namespace === "in_use" && metas[i].key === "notes") {
      in_use_notes = metas[i].value
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
        <Typography variant="body1" component={"div"}>
          {packed_weight && (
            <p>
              <b>Weight:</b> {`${packed_weight} oz (${Number(convertOzToGr(packed_weight))} g)`}
            </p>
          )}
          {packed_length && (
            <p>
              <b>Length:</b> {`${packed_length} in (${Number(convertInToCm(packed_length))} cm)`}
            </p>
          )}
          {packed_width && (
            <p>
              <b>Width:</b> {`${packed_width} in (${Number(convertInToCm(packed_width))} cm)`}
            </p>
          )}
          {packed_height && (
            <p>
              <b>Height:</b> {`${packed_height} in (${Number(convertInToCm(packed_height))} cm)`}
            </p>
          )}
          {packed_notes &&
            <div dangerouslySetInnerHTML={{ __html: packed_notes }} />
          }
        </Typography>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Typography marginBottom={2} variant="h5">
          In Use
        </Typography>
        <Typography variant="body1" component={"div"}>
          {in_use_weight_rating && (
            <p>
              <b>Weight Rating:</b> {`${in_use_weight_rating} lbs (${Number(convertLbToKg(in_use_weight_rating))} kg)`}
            </p>
          )}
          {in_use_length && (
            <p>
              <b>Length:</b> {`${in_use_length} in (${Number(convertInToCm(in_use_length))} cm)`}
            </p>
          )}
          {in_use_width && (
            <p>
              <b>Width:</b> {`${in_use_width} in (${Number(convertInToCm(in_use_width))} cm)`}
            </p>
          )}
          {in_use_height && (
            <p>
              <b>Height:</b> {`${in_use_height} in (${Number(convertInToCm(in_use_height))} cm)`}
            </p>
          )}
          {in_use_notes &&
            <div dangerouslySetInnerHTML={{ __html: in_use_notes }} />
          }
        </Typography>
      </Grid>
    </Grid>
  )
}
