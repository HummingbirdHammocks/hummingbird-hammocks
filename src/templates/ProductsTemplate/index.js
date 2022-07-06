import React, { useState } from "react"
import { graphql } from "gatsby"
import { styled, Box, Typography, useMediaQuery } from "@mui/material"
import { FreeMode, Navigation, Thumbs } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { GatsbyImage } from "gatsby-plugin-image"

import { Seo, Layout, MainWrapper } from "components"

const TemplateSection = styled("section")(({ theme }) => ({
  background: theme.palette.white,
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

const ProductPage = ({ data }) => {
  const { title, images, description, shopifyId } = data.shopifyProduct
  const matches = useMediaQuery("(max-width:900px)")

  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  return (
    <Layout>
      <Seo title={title} description={description} />
      <TemplateSection>
        <MainWrapper>
          <MainGridWrapper>
            <Box maxWidth={600}>
              <Swiper
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
              >
                {images.map(image => (
                  <SwiperSlide key={image.id}>
                    <GatsbyImage
                      image={image.gatsbyImageData}
                      alt={image.altText}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
              >
                {images.map(image => (
                  <SwiperSlide key={image.id}>
                    <GatsbyImage
                      image={image.gatsbyImageData}
                      alt={image.altText}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
            <Box marginBottom={matches ? "50px" : "0"}>
              <Box>
                <Typography
                  textTransform="uppercase"
                  sx={{ mb: "30px" }}
                  variant="h2"
                >
                  {title}
                </Typography>
                <Typography
                  sx={{ mt: "30px", maxWidth: "1200px" }}
                  variant="body1"
                >
                  {description}
                </Typography>
              </Box>
            </Box>
          </MainGridWrapper>
        </MainWrapper>
      </TemplateSection>
    </Layout>
  )
}

export default ProductPage

export const query = graphql`
  query ProductQuery($shopifyId: String) {
    shopifyProduct(shopifyId: { eq: $shopifyId }) {
      ...ShopifyProductFields
    }
  }
`
