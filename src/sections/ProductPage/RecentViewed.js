import React, { useContext } from "react"
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Divider } from "@mui/material"

import { RecentViewedContext } from "contexts"
import { ProductCard } from "sections"


export const RecentViewed = ({ title }) => {
  const theme = useTheme();
  const { recentViewedProducts } = useContext(RecentViewedContext)

  return (
    <Box sx={{ marginTop: "70px", }}>
      <Typography pb="30px" textAlign="center" variant="h4">
        {title}
      </Typography>
      <Divider />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
          marginTop: "70px",

          [theme.breakpoints.down("md")]: {
            gridTemplateColumns: "1fr",
          },
        }}>
        <ProductCard
          minHeight="220px"
          mdMinHeight="300px"
          products={recentViewedProducts.slice(1, recentViewedProducts.length)}
        />
      </Box>
    </Box>
  )
}
