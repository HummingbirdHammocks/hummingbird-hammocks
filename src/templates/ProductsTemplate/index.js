import React, { useState, useEffect, useContext } from "react"
import { graphql, navigate } from "gatsby"
import { styled, Box, Typography, useMediaQuery } from "@mui/material"
import { FreeMode, Navigation, Thumbs } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
import { useLocation } from "@gatsbyjs/reach-router"
import queryString from "query-string"

import { Seo, Layout, MainWrapper, Link } from "components"
import { CartContext, RecentViewedContext } from "contexts"
import Color from "utils/color"
import {
  ProductQuantityAdder,
  FBT,
  ProductDetailsGrid,
  RecentViewed,
  Reviews,
  YouTubeEmbed,
} from "sections"

const TemplateSection = styled("section")(({ theme }) => ({
  background: theme.palette.white,
  padding: "60px 15px",
}))

const MainGridWrapper = styled(Box)(({ theme }) => ({
  display: "grid",
  position: "relative",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridGap: "20px",
  margin: "auto",

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(1, 1fr)",
  },
}))

const UpperLink = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  margin: "10px 100px 130px 100px",
}))

const ProductPage = ({ data, pageContext }) => {
  const { title, handle, images, description, shopifyId } = data.shopifyProduct
  const { metaDescription, metaTitle, metaProductDetails, metaFBT, metaVideo } =
    data
  const { collection, next, prev } = pageContext

  const matches = useMediaQuery("(max-width:900px)")

  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [product, setProduct] = useState(null)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [swiper, setSwiper] = useState(null)
  const [variantColorName, setVariantColorName] = useState("")
  const [variantSizeName, setVariantSizeName] = useState("")

  const { getProductById } = useContext(CartContext)
  const { addRecentProducts, recentViewedProducts } =
    useContext(RecentViewedContext)

  let productDetails

  if (metaProductDetails?.value)
    productDetails = JSON.parse(metaProductDetails.value)

  console.log(productDetails)

  // Variants & Product Image
  const { search, pathname } = useLocation()
  const variantId = queryString.parse(search).variant

  const handleVariantColorChange = variantName => {
    let newVariantName
    let newVariant
    if (variantSizeName) {
      newVariantName = `${variantName} / ${variantSizeName}`
      newVariant = product?.variants.find(v => v.title === newVariantName)
    }

    if (!variantSizeName) {
      newVariant = product?.variants.find(v => v.title === variantName)
    }

    setSelectedVariant(newVariant)
    swiper.slideTo(
      images.findIndex(image => {
        return image.shopifyId === newVariant.image.id
      })
    )

    navigate(`${pathname}?variant=${encodeURIComponent(newVariant.id)}`, {
      replace: true,
    })
  }

  const handleVariantSizeChange = variantName => {
    let newVariant

    if (variantColorName) {
      newVariant = product?.variants.find(
        v => v.title === `${variantColorName} / ${variantName}`
      )
    } else {
      newVariant = product?.variants.find(v => v.title === variantName)
    }

    setSelectedVariant(newVariant)

    swiper.slideTo(
      images.findIndex(image => {
        return image.shopifyId === newVariant.image.id
      })
    )

    navigate(`${pathname}?variant=${encodeURIComponent(newVariant.id)}`, {
      replace: true,
    })
  }

  useEffect(() => {
    addRecentProducts(data.shopifyProduct)
    getProductById(shopifyId).then(result => {
      setProduct(result)

      if (result?.variants) {
        const resultVariant =
          result.variants.find(({ id }) => id === variantId) ||
          result.variants[0]

        setSelectedVariant(resultVariant)

        let resultTitle = resultVariant?.title

        if (result.options.length === 2) {
          let csIndex = resultTitle?.indexOf("/")

          if (csIndex > 1 && resultTitle) {
            setVariantColorName(resultTitle.slice(0, csIndex - 1))
            setVariantSizeName(
              resultTitle.slice(csIndex + 2, resultTitle.length)
            )
          }
        } else if (result.options[0].name == "Color") {
          setVariantColorName(resultTitle)
        } else {
          setVariantSizeName(resultTitle)
        }
        console.log("Result Variant")
        console.log(resultVariant)
      }

      /* eslint-disable react-hooks/exhaustive-deps */
    })
  }, [variantId])

  return (
    <Layout>
      <Seo
        title={metaTitle?.value || title}
        description={metaDescription?.value || description}
      />
      <TemplateSection>
        <MainWrapper>
          <UpperLink>
            <Box>
              <Typography variant="navMenu">
                <Link to="/">HOME</Link> /{" "}
                <Link to={`/collections/${collection.handle}`}>
                  {collection.title}
                </Link>{" "}
                / <Link to={`/products/${handle}`}>{title}</Link>
              </Typography>
            </Box>
            <Box>
              {prev && (
                <Typography variant="navMenu">
                  <Link to={`/products/${prev}`}>&#x3c; Prev</Link>
                </Typography>
              )}
              {prev && next && " | "}
              {next && (
                <Typography variant="navMenu">
                  <Link to={`/products/${next}`}>Next &#x3e;</Link>
                </Typography>
              )}
            </Box>
          </UpperLink>
          <MainGridWrapper>
            <Box maxWidth={600}>
              <Swiper
                onSwiper={setSwiper}
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Thumbs]}
                className="mySwiper2"
              >
                {images.map(image => (
                  <SwiperSlide key={image.id}>
                    <GatsbyImage
                      placeholder="blurred"
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
                      placeholder="blurred"
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
                    {product?.variants.length >= 1 && (
                      <>
                        {product.options.length === 2 &&
                        product.options[0].name === "Color" ? (
                          <>
                            <strong>Color</strong>
                            <Box display="flex">
                              {product?.options[0]?.values.map(
                                (item, index) => {
                                  return (
                                    <Box
                                      key={index}
                                      margin="5px"
                                      padding="5px"
                                      position="relative"
                                      sx={{
                                        cursor: "pointer",
                                      }}
                                      border={
                                        item.value === variantColorName
                                          ? "1px solid red"
                                          : "1px solid black"
                                      }
                                      borderRadius="50%"
                                      onClick={() =>
                                        handleVariantColorChange(item.value)
                                      }
                                    >
                                      <Color
                                        key={item.value}
                                        title={item.value}
                                      />
                                      {!product.variants[index].available && (
                                        <StaticImage
                                          src="../../assets/images/soldout.png"
                                          alt="Soldout"
                                          height={34}
                                          placeholder="blurred"
                                          style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            margin: "5px",
                                            padding: "5px",
                                          }}
                                        />
                                      )}
                                    </Box>
                                  )
                                }
                              )}
                            </Box>

                            <strong>Size</strong>
                            <Box display="flex">
                              {product?.options[1]?.values.map(item => {
                                return (
                                  <Box
                                    margin="5px"
                                    padding="15px"
                                    sx={{ cursor: "pointer" }}
                                    border={
                                      item.value === variantSizeName
                                        ? "1px solid red"
                                        : "1px solid black"
                                    }
                                    borderRadius="5px"
                                    onClick={() =>
                                      handleVariantSizeChange(item.value)
                                    }
                                  >
                                    <div>{item.value}</div>
                                  </Box>
                                )
                              })}
                            </Box>
                          </>
                        ) : product.options[0].name === "Color" &&
                          product.options.length === 1 ? (
                          <>
                            <strong>Color</strong>
                            <Box display="flex">
                              {product?.options[0]?.values.map(
                                (item, index) => {
                                  return (
                                    <Box
                                      key={index}
                                      margin="5px"
                                      padding="5px"
                                      position="relative"
                                      sx={{
                                        cursor: "pointer",
                                      }}
                                      border={
                                        item.value === variantColorName
                                          ? "1px solid red"
                                          : "1px solid black"
                                      }
                                      borderRadius="50%"
                                      onClick={() =>
                                        handleVariantColorChange(item.value)
                                      }
                                    >
                                      <Color
                                        key={item.value}
                                        title={item.value}
                                      />
                                      {!product.variants[index].available && (
                                        <StaticImage
                                          src="../../assets/images/soldout.png"
                                          alt="Soldout"
                                          height={34}
                                          placeholder="blurred"
                                          style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            margin: "5px",
                                            padding: "5px",
                                          }}
                                        />
                                      )}
                                    </Box>
                                  )
                                }
                              )}
                            </Box>
                          </>
                        ) : product.options[0].name === "Title" ? (
                          ""
                        ) : (
                          <>
                            <strong>{product?.options[0].name}</strong>
                            <Box display="flex">
                              {product?.options[0]?.values.map(item => {
                                return (
                                  <Box
                                    margin="5px"
                                    padding="15px"
                                    sx={{ cursor: "pointer" }}
                                    border={
                                      item.value === variantSizeName
                                        ? "1px solid red"
                                        : "1px solid black"
                                    }
                                    borderRadius="5px"
                                    onClick={() =>
                                      handleVariantSizeChange(item.value)
                                    }
                                  >
                                    <div>{item.value}</div>
                                  </Box>
                                )
                              })}
                            </Box>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}

                {!!selectedVariant && (
                  <>
                    <Box>
                      Price:{selectedVariant.priceV2.currencyCode}{" "}
                      {selectedVariant.price}
                    </Box>
                    <ProductQuantityAdder
                      variantId={selectedVariant.id}
                      available={selectedVariant.available}
                    />
                  </>
                )}
              </Box>
            </Box>
          </MainGridWrapper>

          {selectedVariant && metaFBT && (
            <Box margin="100px 10px 10px 10px">
              <FBT
                fbtData={metaFBT.value}
                product={product}
                currentVariant={selectedVariant}
              />
            </Box>
          )}

          {/* Review */}
          <Reviews title={title} handle={handle} />

          {productDetails && (
            <ProductDetailsGrid title="Specs" productDetails={productDetails} />
          )}

          {metaVideo && <YouTubeEmbed url={metaVideo.value} title={title} />}

          {recentViewedProducts && (
            <RecentViewed
              products={recentViewedProducts.slice(
                1,
                recentViewedProducts.length
              )}
            />
          )}
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
      ...ProductTileFields
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

    metaVideo: shopifyProductMetafield(
      productId: { eq: $id }
      key: { eq: "video" }
    ) {
      value
    }

    metaFBT: shopifyProductMetafield(
      productId: { eq: $id }
      key: { eq: "frequently_bought_together" }
    ) {
      value
    }
  }
`
