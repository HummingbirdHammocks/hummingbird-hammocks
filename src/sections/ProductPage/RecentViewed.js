import React from "react"
import { Typography, styled, Box, Divider } from "@mui/material"

import { ProductCard } from "sections"

const Wrapper = styled("section")(() => ({}))

const ProductGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}))

export const RecentViewed = ({ products }) => {
  return (
    <Wrapper>
      <Typography pb="30px" textAlign="center" variant="h5">
        RECENTLY VIEWED PRODUCTS
      </Typography>
      <Divider />
      <ProductGrid>
        <ProductCard
          minHeight="220px"
          mdMinHeight="300px"
          products={products}
        />
      </ProductGrid>
    </Wrapper>
  )
}
