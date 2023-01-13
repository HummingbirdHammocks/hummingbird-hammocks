import React from "react"
import { styled, Box, CircularProgress } from "@mui/material"

export const MiddleBox = styled(Box)(({ divminheight, itemposition }) => ({
  display: "flex",
  alignItems: itemposition ? itemposition : "center",
  justifyContent: itemposition ? itemposition : "center",
  minHeight: divminheight && divminheight,
}))

export const MiddleSpinner = ({ divminheight, size, itemposition }) => (
  <MiddleBox itemposition={itemposition} divminheight={divminheight}>
    <CircularProgress size={size} />
  </MiddleBox>
)
