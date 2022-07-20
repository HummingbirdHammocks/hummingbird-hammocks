import React, { useState, useEffect, useContext } from "react"
import { graphql } from "gatsby"
import { styled, Box, Typography, useMediaQuery } from "@mui/material"
import { FreeMode, Navigation, Thumbs } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { GatsbyImage } from "gatsby-plugin-image"

import { Seo, Layout, MainWrapper } from "components"
import { CartContext } from "contexts"
import JudgeMe from "utils/judgeMe"

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
  const { title, handle, images, description, shopifyId } = data.shopifyProduct

  const { metaDescription, metaTitle, metaProductDetails } = data

  const matches = useMediaQuery("(max-width:900px)")

  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [product, setProduct] = useState(null)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [reviews, setReviews] = useState(null)

  const { getProductById } = useContext(CartContext)

  let reviewWidget = new JudgeMe(handle)

  let productDetails

  if (metaProductDetails?.value)
    productDetails = JSON.parse(metaProductDetails.value)

  console.log(productDetails)

  useEffect(() => {
    setReviews(reviewWidget.getReviewWidget().then(data => setReviews(data)))
  }, [])

  useEffect(() => {
    getProductById(shopifyId).then(result => {
      setProduct(result)
      setSelectedVariant(result.variants[0])

      /* eslint-disable react-hooks/exhaustive-deps */
    })
  }, [getProductById, shopifyId, setProduct])

  return (
    <Layout>
      <Seo
        title={metaTitle?.value || title}
        description={metaDescription?.value || description}
      />
      <TemplateSection>
        <MainWrapper>
          <MainGridWrapper>
            <Box maxWidth={600}>
              <Swiper
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Thumbs]}
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
                navigation={true}
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
              <Box>
                {product?.availableForSale && !!selectedVariant && (
                  <>
                    {product?.variants.length > 1 && (
                      <>
                        <div>
                          <strong>Varients</strong>
                          <select value={selectedVariant.id}>
                            {product?.variants.map(v => (
                              <option key={v.id} value={v.id}>
                                {v.title}
                              </option>
                            ))}
                          </select>
                        </div>
                        {!!selectedVariant && (
                          <>
                            <div>
                              Price: {selectedVariant.priceV2.currencyCode}{" "}
                              {selectedVariant.price}
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </Box>
            </Box>
          </MainGridWrapper>

          {reviews && (
            <div
              className="jdgm-widget jdgm-review-widget jdgm-outside-widget"
              data-id={reviews.product_external_id}
              data-product-title={title}
            >
              <div dangerouslySetInnerHTML={{ __html: reviews.widget }} />
            </div>
          )}

          {productDetails &&
            productDetails?.map((item, index) => (
              <div key={index}>
                <div>{item.title}</div>
                <div dangerouslySetInnerHTML={{ __html: item.body }} />
              </div>
            ))}
        </MainWrapper>
      </TemplateSection>
    </Layout>
  )
}

export default ProductPage

export const query = graphql`
  query ProductQuery($id: String) {
    shopifyProduct(id: { eq: $id }) {
      ...ShopifyProductFields
    }

    metaTitle: shopifyProductMetafield(
      productId: { eq: $id }
      key: { eq: "title_tag" }
    ) {
      value
    }

    metaDescription: shopifyProductMetafield(
      productId: { eq: $id }
      key: { eq: "description_tag" }
    ) {
      value
    }

    metaProductDetails: shopifyProductMetafield(
      productId: { eq: $id }
      key: { eq: "product_details" }
    ) {
      value
    }
  }
`
