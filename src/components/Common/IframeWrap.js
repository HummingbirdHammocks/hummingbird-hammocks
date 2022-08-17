import React from "react"
import { styled, Box } from "@mui/material"

import { MainWrapper } from "components"

export const IframeWrapper = styled(Box)(() => ({
  marginBottom: "50px",

  //   "& .formFieldAndSubmitContainer": {
  //     borderRadius: "20px",
  //     border: "1px solid red",
  //   },
}))

export const IframeWrap = ({ children }) => {
  return (
    <MainWrapper>
      <IframeWrapper>{children}</IframeWrapper>
    </MainWrapper>
  )
}
