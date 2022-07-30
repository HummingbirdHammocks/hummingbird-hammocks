import React from "react"
import { styled, Box, Divider, Typography } from "@mui/material"

const Wrapper = styled("section")(() => ({
  padding: "10px",
}))

const DetailsWrap = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
}))

export const ProductDetailsGrid = ({ title, productDetails }) => {
  return (
    <Wrapper>
      <DetailsWrap p="40px 10px">
        {productDetails.map(item => (
          <Box>
            <Divider />
            <Box p="60px">
              <Typography variant="h5">{item.title}</Typography>
              <div dangerouslySetInnerHTML={{ __html: item.body }} />
            </Box>
          </Box>
        ))}
      </DetailsWrap>
    </Wrapper>
  )
}
