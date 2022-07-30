import React from "react"
import { Typography, styled, Box, Divider } from "@mui/material"

import { ProductCard } from "sections"

const Wrapper = styled("section")(() => ({}))

const ProductGrid = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
}))

export const RecentViewed = ({ products }) => {
  return (
    <Wrapper>
      <Typography p="30px" textAlign="center" variant="h5">
        RECENTLY VIEWED PRODUCTS
      </Typography>
      <Divider />
      <ProductGrid>
        <ProductCard products={products} />
      </ProductGrid>
    </Wrapper>
  )
}
