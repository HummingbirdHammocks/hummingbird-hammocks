import React from "react"
import { graphql } from "gatsby"
import { Box, Typography, styled } from "@mui/material"
import { GatsbyImage } from "gatsby-plugin-image"

import { Seo, Layout, MainWrapper } from "components"
import { ProductCard } from "sections"

const Wrapper = styled("section")(() => ({
  display: "grid",
  minHeight: "340px",
  position: "relative",
}))

const Middle = styled("div")(() => ({
  position: "absolute",
  display: "flex",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: "100",
}))

const Gradient = styled("div")(() => ({
  background: "rgba(0,0,0,.6)",
  position: "absolute",
  inset: "0 0 0 0",
}))

const ProductWrapper = styled("div")(() => ({
  padding: "60px 15px",
}))

const MainGridWrapper = styled("div")(({ theme }) => ({
  display: "grid",
  position: "relative",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridGap: "20px",
  margin: "auto",

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(1, 1fr)",
  },
}))

const CollectionsPage = ({ data }) => {
  const { title, image, products, description } = data.shopifyCollection

  return (
    <Layout>
      <Seo title={title} description={description} />
      <Wrapper>
        <GatsbyImage image={image.gatsbyImageData} alt={title} />
        <Middle>
          <Box>
            <Typography
              sx={{ margin: "20px 10px;" }}
              textAlign="center"
              variant="h1"
              color="white"
            >
              {title}
            </Typography>
          </Box>
        </Middle>
        <Gradient />
      </Wrapper>
      <MainWrapper>
        <ProductWrapper>
          <MainGridWrapper>
            <ProductCard products={products} />
          </MainGridWrapper>
        </ProductWrapper>
      </MainWrapper>
    </Layout>
  )
}

export default CollectionsPage

export const query = graphql`
  query ProductCollectionQuery($shopifyId: String) {
    shopifyCollection(shopifyId: { eq: $shopifyId }) {
      image {
        gatsbyImageData(placeholder: BLURRED)
      }
      title
      description
      products {
        ...ShopifyProductFields
        ...ProductTileFields
      }
    }
  }
`
