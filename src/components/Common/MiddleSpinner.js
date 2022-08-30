import React from "react"
import { styled, Box, CircularProgress } from "@mui/material"

export const MiddleBox = styled(Box)(({ divMinHeight, itemPosition }) => ({
  display: "flex",
  alignItems: itemPosition ? itemPosition : "center",
  justifyContent: itemPosition ? itemPosition : "center",
  minHeight: divMinHeight && divMinHeight,
}))

export const MiddleSpinner = ({ divMinHeight, size, itemPosition }) => (
  <MiddleBox itemPosition={itemPosition} divMinHeight={divMinHeight}>
    <CircularProgress size={size} />
  </MiddleBox>
)
