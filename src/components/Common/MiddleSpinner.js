import React from "react"
import { styled, Box, CircularProgress } from "@mui/material"

export const MiddleBox = styled(Box)(({ divMinHeight }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: divMinHeight ? divMinHeight : " ",
}))

export const MiddleSpinner = ({ divMinHeight, size }) => (
  <MiddleBox divMinHeight={divMinHeight}>
    <CircularProgress size={size} />
  </MiddleBox>
)
