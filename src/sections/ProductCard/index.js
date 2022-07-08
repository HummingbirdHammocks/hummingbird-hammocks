import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Box, Typography, styled } from "@mui/material"

import { Link, AddToCart } from "components"

const ProductWrapper = styled(Box)(() => ({
  padding: "60px 15px",
}))

const TextBox = styled(Box)(() => ({}))

export const ProductCard = ({ products }) => {
  return (
    <>
      {products?.map(product => (
        <ProductWrapper key={product.id}>
          <Link to={`/products/${product.handle}`}>
            <GatsbyImage
              alt={product.title}
              image={product.images[0].gatsbyImageData}
            />
            <TextBox>
              <Typography variant="subtitle2" color="black">
                {product.title}
              </Typography>
              <Typography
                textAlign={"center"}
                variant="subtitle3"
                color="black"
              >
                {`$${product.priceRangeV2.minVariantPrice.amount} ${product.priceRangeV2.minVariantPrice.currencyCode}`}
              </Typography>
            </TextBox>
          </Link>
          <AddToCart
            variantId={product.variants[0].shopifyId}
            available={product.variants.availableForSale}
          />
        </ProductWrapper>
      ))}
    </>
  )
}
