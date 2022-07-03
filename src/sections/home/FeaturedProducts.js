import React, { useContext, useEffect } from "react"
import { styled, Box, Typography, Button } from "@mui/material"
import { Navigation, Autoplay } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { GatsbyImage } from "gatsby-plugin-image"

import { AddToCart } from "components"
import { ProductContext } from "contexts"

const Wrapper = styled("section")(() => ({
  padding: "100px 0",
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

const AbsoluteImage = styled(GatsbyImage)(() => ({
  position: "absolute",
  top: 0,
  borderRadius: "20px",
}))

const TextBox = styled(Box)(() => ({
  position: "absolute",
  bottom: 30,
  left: "0",
  right: "0",
  textAlign: "center",
}))

export function FeaturedProduct() {
  const { featuredProducts } = useContext(ProductContext)

  return (
    <Wrapper>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        navigation={true}
        // loop={true}
        // autoplay={{
        //   delay: 1500,
        //   disableOnInteraction: false,
        // }}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
      >
        {featuredProducts.map(item => (
          <SwiperSlide key={item.shopifyId}>
            <ImageBox minHeight={550}>
              <AbsoluteImage
                className="image-1"
                image={item.featuredImage.gatsbyImageData}
                alt={item.featuredImage.altText}
              />

              <AbsoluteImage
                className="image-2"
                image={item.images[1].gatsbyImageData}
                alt={item.images[1].altText}
              />
              <TextBox>
                <Typography
                  textAlign={"center"}
                  variant="subtitle2"
                  color="black"
                >
                  {item.title}
                </Typography>
                <Typography
                  textAlign={"center"}
                  variant="subtitle3"
                  color="black"
                >
                  {`$${item.priceRangeV2.minVariantPrice.amount} ${item.priceRangeV2.minVariantPrice.currencyCode}`}
                </Typography>

                <AddToCart
                  variantId={item.variants[0].shopifyId}
                  available={item.variants.availableForSale}
                />
              </TextBox>
            </ImageBox>
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  )
}
