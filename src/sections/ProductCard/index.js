import React, { useState } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Box, Typography, styled } from "@mui/material"

import { Link, AddToCart, MiddleSpinner, SoldOutWrap } from "components"
// import JudgeMe from "utils/judgeMe"
import { useEffect } from "react"

const ProductWrapper = styled(Box)(() => ({
  padding: "40px 15px",
  position: "relative",
}))

const ImageBox = styled(Box)(() => ({
  "& .image-2": {
    display: "none",
  },

  "&:hover": {
    "& .image-2": {
      display: "block",
    },
    "& .image-1": {
      display: "none",
    },
  },
}))

const AbsoluteImage = styled(GatsbyImage)(({ theme }) => ({
  // position: "absolute",
  top: 0,

  [theme.breakpoints.down("md")]: {
    margin: "0 30px",
  },
}))

export const ProductCard = ({ products, minHeight, mdMinHeight }) => {
  const [loading, setLoading] = useState(true)
  const [productsData, setProductsData] = useState([])

  useEffect(() => {
    setLoading(true)

    let newData = products
    async function ProductsData() {
      for (let i = 0; i < newData?.length; i++) {
        // let reviewBadge = new JudgeMe(newData[i]?.handle)
        // const review = await reviewBadge.getPreviewBadge()
        const soldOut = await newData[i].variants.some(
          i => i.availableForSale === true
        )

        newData[i] = {
          ...newData[i],
          notSoldout: soldOut,
          // review: review.badge,
        }
      }

      setProductsData(newData)
      setLoading(false)
    }

    ProductsData()
  }, [products])

  return (
    <>
      {loading && <MiddleSpinner divMinHeight="460px" size={20} />}
      {!loading &&
        productsData.length > 0 &&
        productsData?.map(product => (
          <ProductWrapper key={product.id}>
            {!product.notSoldout && <SoldOutWrap>Sold Out</SoldOutWrap>}
            <Link to={`/products/${product.handle}`}>
              <ImageBox mdMinHeight={mdMinHeight} minHeight={minHeight}>
                <AbsoluteImage
                  className={product.images[1] ? "image-1" : ""}
                  image={product.images[0].gatsbyImageData}
                  alt={product.title}
                  placeholder="blurred"
                  style={{ margin: "1rem", maxHeight: "350px" }}
                  imgStyle={{
                    objectFit: "contain",
                    borderRadius: "20px",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    width: "auto",
                    height: "auto",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />

                {product.images[1] && (
                  <AbsoluteImage
                    className="image-2"
                    image={product.images[1].gatsbyImageData}
                    alt={product.title}
                    placeholder="blurred"
                    style={{ margin: "1rem", maxHeight: "350px" }}
                    imgStyle={{
                      objectFit: "contain",
                      borderRadius: "20px",
                      maxWidth: "100%",
                      maxHeight: "100%",
                      width: "auto",
                      height: "auto",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                )}
              </ImageBox>
              {/* <GatsbyImage
                alt={product.title}
                image={product.images[0].gatsbyImageData}
              /> */}
              <Box m="30px 0 5px 0">
                <Typography
                  textAlign="center"
                  variant="subtitle2"
                  color="black"
                >
                  {product.title}
                </Typography>
                {/* <div dangerouslySetInnerHTML={{ __html: product.review }} /> */}
                <Typography
                  textAlign="center"
                  variant="subtitle2"
                  color="primary"
                >
                  {`$${product.priceRangeV2.minVariantPrice.amount} ${product.priceRangeV2.minVariantPrice.currencyCode}`}
                </Typography>
              </Box>
            </Link>
            {/* <AddToCart
              variantId={product.variants[0].shopifyId}
              available={product.variants.availableForSale}
            /> */}
          </ProductWrapper>
        ))}
    </>
  )
}
