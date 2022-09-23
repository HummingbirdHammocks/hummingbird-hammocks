import React from "react"
import { Box } from "@mui/material"

import { MainWrapper } from "components"

export const IframeWrap = ({ children }) => {
  return (
    <MainWrapper>
      <Box
        sx={{
          marginBottom: "50px",
        }}>
        {children}
      </Box>
    </MainWrapper>
  )
}
