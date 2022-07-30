import React, { useContext } from "react"
import { styled, Box, Typography, useMediaQuery } from "@mui/material"
import { Navigation, Autoplay, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { GatsbyImage } from "gatsby-plugin-image"

import { AddToCart, Link } from "components"
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

const AbsoluteImage = styled(GatsbyImage)(({ theme }) => ({
  position: "absolute",
  top: 0,
  borderRadius: "20px",

  [theme.breakpoints.down("md")]: {
    margin: "0 30px",
  },
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
  const matches = useMediaQuery("(max-width:1100px)")

  return (
    <Wrapper>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={matches ? false : true}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          "@0.75": {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          "@1.00": {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          "@1.50": {
            slidesPerView: 4,
            spaceBetween: 50,
          },
          "@2.00": {
            slidesPerView: 5,
            spaceBetween: 60,
          },
        }}
        modules={[Navigation, Autoplay, Pagination]}
        className="mySwiper"
      >
        {featuredProducts.map(item => (
          <SwiperSlide key={item.shopifyId}>
            <ImageBox minHeight={matches ? "650px" : "600px"}>
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
                <Link to={`products/${item.handle}`}>
                  <Typography
                    textAlign={"center"}
                    variant="subtitle2"
                    color="black"
                  >
                    {item.title}
                  </Typography>
                </Link>

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
