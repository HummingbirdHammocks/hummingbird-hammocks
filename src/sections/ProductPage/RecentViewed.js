import React, { useContext } from "react"
import { Typography, styled, Box, Divider } from "@mui/material"

import { RecentViewedContext } from "contexts"
import { ProductCard } from "sections"

const Wrapper = styled("section")(() => ({
  marginTop: "70px",
}))

const ProductGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}))

export const RecentViewed = ({ title }) => {
  const { recentViewedProducts } = useContext(RecentViewedContext)

  return (
    <Wrapper>
      <Typography pb="30px" textAlign="center" variant="h5">
        {title}
      </Typography>
      <Divider />
      <ProductGrid>
        <ProductCard
          minHeight="220px"
          mdMinHeight="300px"
          products={recentViewedProducts.slice(1, recentViewedProducts.length)}
        />
      </ProductGrid>
    </Wrapper>
  )
}
