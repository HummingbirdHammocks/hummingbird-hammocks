import React, { useState, useEffect, useContext } from "react"
import { graphql, navigate } from "gatsby"
import { useTheme, Box, Grid, Stack, Typography, Divider, useMediaQuery, Tooltip } from "@mui/material"
import { FreeMode, Navigation, Thumbs } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { GatsbyImage } from "gatsby-plugin-image"
import { useLocation } from "@gatsbyjs/reach-router"
import queryString from "query-string"

import {
  Seo,
  Layout,
  MainWrapper,
  Link,
  AnotherLink,
  Socials,
  ProductReviewWidget,
  ProductPreviewBadge
} from "components"
import { CartContext, RecentViewedContext } from "contexts"
import Color from "utils/color"
import {
  ProductQuantityAdder,
  Fbt,
  ProductDetailsGrid,
  RecentViewed,
  YouTubeEmbed,
  Details,
  DetailsImage,
  Specs,
  SoldOutIcon,
  Inventory,
} from "sections"


const ProductPage = ({ data, pageContext }) => {
  const { title, handle, images, description, shopifyId, featuredImage } =
    data.shopifyProduct
  const {
    metaDescription,
    metaTitle,
    metaFBT,
    metaVideo,
    metaDetails,
    metaMain,
    metaIncluded,
    metaMaterials,
    metaManufacturing,
    metaCareInstructions,
    metaOshwaUrl,
    metaManualUrl,
    metaOshwaId,
    metaReository,
  } = data
  const { collection, next, prev } = pageContext

  const theme = useTheme();

  const matches = useMediaQuery("(max-width:900px)")
  const url = typeof window !== "undefined" ? window.location.href : ""

  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [product, setProduct] = useState(null)
  const [selectedVariantStatic, setSelectedVariantStatic] = useState(null)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [swiper, setSwiper] = useState(null)
  const [variantColorName, setVariantColorName] = useState("")
  const [variantSizeName, setVariantSizeName] = useState("")

  const { getProductById } = useContext(CartContext)
  const { addRecentProducts, recentViewedProducts } =
    useContext(RecentViewedContext)

  // Product Details
  let details

  if (metaDetails?.value) details = JSON.parse(metaDetails.value)

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

        const staticVariant =
          data.shopifyProduct.variants.find(({ id }) => id === variantId) ||
          data.shopifyProduct.variants[0]

        setSelectedVariant(resultVariant)
        setSelectedVariantStatic(staticVariant)

        console.log(staticVariant)

        let resultTitle = resultVariant?.title

        if (result.options.length === 2) {
          let csIndex = resultTitle?.indexOf("/")

          if (csIndex > 1 && resultTitle) {
            setVariantColorName(resultTitle.slice(0, csIndex - 1))
            setVariantSizeName(
              resultTitle.slice(csIndex + 2, resultTitle.length)
            )
          }
        } else if (result.options[0].name === "Color") {
          setVariantColorName(resultTitle)
        } else {
          setVariantSizeName(resultTitle)
        }
      }

      /* eslint-disable react-hooks/exhaustive-deps */
    })
  }, [variantId])

  /* console.log(details) */
  /* console.log(product) */
  /* console.log(variantSizeName) */
  /* console.log(selectedVariant) */

  return (
    <Layout>
      <Seo
        title={metaTitle?.value || title}
        description={metaDescription?.value || description}
      />
      <Box
        sx={{
          background: theme.palette.white,
          padding: "60px 15px",

          ".swiper-button-prev, .swiper-button-next": {
            color: "#34542a",
          },

          [theme.breakpoints.down("md")]: {
            padding: "60px 0",
          },
        }}>
        <MainWrapper>
          <Box
            sx={{
              margin: "10px 70px 0 70px",

              [theme.breakpoints.down("md")]: {
                margin: "0",
              },
            }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                margin: "10px 50px 50px 50px",

                [theme.breakpoints.down("md")]: {
                  margin: "0",
                },
              }}>
              <Box
                display="inline-flex"
                alignItems="center"
                sx={{
                  background: "#34542a",
                  color: "#fff",
                  padding: "3px 10px",
                }}
                justifyContent="center"
                borderRadius="10px"
                order="2"
              >
                {prev.handle && (
                  <Tooltip title={prev.title}>
                    <Typography variant="collectionName">
                      <Link
                        sx={{
                          color: "#fff",
                          textDecoration: "none",
                          "&:hover": {
                            opacity: "0.7",
                          },
                        }}
                        to={`/products/${prev.handle}`}
                      >
                        Prev
                      </Link>
                    </Typography>
                  </Tooltip>
                )}
                {prev.handle && next.handle && <Box m="0 10px">|</Box>}
                {next.handle && (
                  <Tooltip title={next.title}>
                    <Typography variant="collectionName">
                      <Link
                        sx={{
                          color: "#fff",
                          textDecoration: "none",
                          "&:hover": {
                            opacity: "0.7",
                          },
                        }}
                        to={`/products/${next.handle}`}
                      >
                        Next
                      </Link>
                    </Typography>
                  </Tooltip>
                )}
              </Box>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Typography variant="collectionName">
                  <Link to="/">HOME</Link> /{" "}
                  <Link to={`/collections/${collection.handle}`}>
                    {collection.title}
                  </Link>{" "}
                  / <Link to={`/products/${handle}`}>{title}</Link>
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={4}>
              <Grid item xs={12} lg={6}>
                <Box
                  justifyContent="center"
                  alignItems="center"
                  display={matches && "flex"}
                  m={matches && "40px 0"}
                >
                  <Swiper
                    onSwiper={setSwiper}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[Navigation, FreeMode, Thumbs]}
                    className="mySwiper"
                  >
                    {images.map(image => (
                      <SwiperSlide key={image.id}>
                        <GatsbyImage
                          placeholder="blurred"
                          imgStyle={{ borderRadius: "20px" }}
                          image={image.gatsbyImageData}
                          alt={image.altText}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  <Swiper
                    style={{ marginTop: "30px" }}
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Thumbs]}
                    className="mySwiper"
                  >
                    {images.map(image => (
                      <SwiperSlide key={image.id}>
                        <GatsbyImage
                          imgStyle={{ borderRadius: "10px" }}
                          placeholder="blurred"
                          image={image.gatsbyImageData}
                          alt={image.altText}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Box>
              </Grid>

              <Grid item xs={12} lg={6}>
                <Box margin={matches ? "0 0 50px 0" : "50px 0 0 0"}>
                  <Box>
                    <Typography
                      textTransform="uppercase"
                      sx={{
                        mb: "20px",
                        lineHeight: "80px",
                      }}
                      variant="h1"
                      color="#414042"
                    >
                      {title}
                      <Divider />
                    </Typography>



                    {!!selectedVariant && (
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                      >
                        <Typography
                          variant="h5"
                          color="#414042"
                          sx={{
                            paddingTop: 1,
                            paddingBottom: 1,
                          }}
                        >
                          ${selectedVariant.price} USD
                        </Typography>
                        {!selectedVariant?.available && (
                          <Box
                            sx={{
                              background: "#f41901",
                              padding: "8px 10px",
                              color: theme.palette.white.main,
                              fontFamily: theme.typography.fontFamily,
                              borderRadius: "10px",
                              letterSpacing: "2px",

                              [theme.breakpoints.down("md")]: {
                                top: "70px",
                                right: "80px",
                              },
                            }}
                          >
                            Sold Out
                          </Box>
                        )}
                      </Stack>
                    )}

                    <Typography
                      sx={{ m: "20px 0 20px 0", maxWidth: "550px" }}
                      variant="body1"
                      color="#414042"
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
                                <Typography variant="navUser" m="20px 0">
                                  Color
                                </Typography>
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
                                              ? "1px solid #000"
                                              : "1px solid #e2e2e2"
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
                                            <SoldOutIcon />
                                          )}
                                        </Box>
                                      )
                                    }
                                  )}
                                </Box>

                                <Typography variant="navUser" m="20px 0">
                                  Size
                                </Typography>
                                <Box display="flex">
                                  {product?.options[1]?.values.map(
                                    (item, index) => {
                                      return (
                                        <Box
                                          margin="5px"
                                          padding="15px"
                                          sx={{ cursor: "pointer" }}
                                          border={
                                            item.value === variantSizeName
                                              ? "1px solid #000"
                                              : "1px solid #e2e2e2"
                                          }
                                          borderRadius="5px"
                                          onClick={() =>
                                            handleVariantSizeChange(item.value)
                                          }
                                        >
                                          <div>{item.value}</div>
                                          {!product.variants[index].available && (
                                            <SoldOutIcon margin="2px" />
                                          )}
                                        </Box>
                                      )
                                    }
                                  )}
                                </Box>
                              </>
                            ) : product.options[0].name === "Color" &&
                              product.options.length === 1 ? (
                              <>
                                <Typography variant="navUser" m="20px 0">
                                  Color
                                </Typography>
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
                                              ? "1px solid #000"
                                              : "1px solid #e2e2e2"
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
                                            <SoldOutIcon />
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
                                <Typography variant="navUser" m="20px 0">
                                  {product?.options[0].name}
                                </Typography>
                                <Box display="flex">
                                  {product?.options[0]?.values.map(
                                    (item, index) => {
                                      return (
                                        <Box
                                          position="relative"
                                          margin="5px"
                                          padding="15px"
                                          sx={{ cursor: "pointer" }}
                                          border={
                                            item.value === variantSizeName
                                              ? "1px solid #000"
                                              : "1px solid #e2e2e2"
                                          }
                                          borderRadius="5px"
                                          onClick={() =>
                                            handleVariantSizeChange(item.value)
                                          }
                                        >
                                          <div>{item.value}</div>
                                          {!product.variants[index].available && (
                                            <SoldOutIcon margin="2px" />
                                          )}
                                        </Box>
                                      )
                                    }
                                  )}
                                </Box>
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}

                    {!!selectedVariant && (
                      <Box m="30px 0">
                        <Inventory handle={handle} id={selectedVariant?.id} />
                      </Box>
                    )}

                    {!!selectedVariant && (
                      <ProductQuantityAdder
                        variantId={selectedVariant.id}
                        available={selectedVariant.available}
                      />
                    )}
                  </Box>
                  <Box>
                    <Socials
                      title={metaTitle?.value || title}
                      url={url}
                      media={featuredImage?.originalSrc}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>

            {selectedVariant && metaFBT && (
              <Fbt
                fbtData={metaFBT.value}
                product={product}
                currentVariant={selectedVariant}
              />
            )}

            {/* Main Product Details */}
            {selectedVariantStatic?.metafields.length > 1 && (
              <Specs metas={selectedVariantStatic.metafields} top={true} />
            )}

            {metaMain && metaIncluded && (
              <ProductDetailsGrid
                top={!selectedVariantStatic?.metafields.length > 1 && true}
                title="FEATURES"
                body2Title="Included"
                body1={metaMain.value}
                body2={metaIncluded.value}
              />
            )}

            {metaMaterials || metaManufacturing ? (
              <ProductDetailsGrid
                title="TRANSPARENCY"
                body1Title={metaMaterials && "MATERIALS"}
                body2Title={metaManufacturing && "MANUFACTURING"}
                body1={metaMaterials?.value}
                body2={metaManufacturing?.value}
              />
            ) : (
              ""
            )}

            {metaManualUrl && metaOshwaId && (
              <ProductDetailsGrid title="SUPPORT">
                <Grid item xs={12} lg={4}>
                  <Typography variant="body1">
                    <AnotherLink
                      href={metaManualUrl.value}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Typography variant="productDetails">
                        Online Manual
                      </Typography>
                    </AnotherLink>
                    <br />
                    {metaCareInstructions && (
                      <>
                        <AnotherLink
                          href={metaCareInstructions.value}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Typography variant="productDetails">
                            Care Instructions
                          </Typography>
                        </AnotherLink>
                        <br />
                      </>
                    )}

                    {metaVideo?.value && (
                      <>
                        <AnotherLink
                          href={metaVideo?.value}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Typography variant="productDetails">
                            Video Guide
                          </Typography>
                        </AnotherLink>
                        <br />
                      </>
                    )}

                    <AnotherLink
                      href="https://help.hummingbirdhammocks.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Typography variant="productDetails">
                        Knowledgebase
                      </Typography>
                    </AnotherLink>
                    <br />
                    <AnotherLink
                      href="https://help.hummingbirdhammocks.com/help/1694808310"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Typography variant="productDetails">
                        Get Help
                      </Typography>
                    </AnotherLink>
                    <br />
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Typography variant="h5">Open Source</Typography>
                  <br />
                  <Typography variant="body1">
                    {`OSHWA UID ${metaOshwaId.value}`} <br />
                    <AnotherLink
                      href={metaOshwaUrl.value}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Typography variant="productDetails">
                        OSHWA Certification Listing
                      </Typography>
                    </AnotherLink>
                    <br />
                    <AnotherLink
                      href={metaReository.value}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Typography variant="productDetails">
                        Design Files
                      </Typography>
                    </AnotherLink>
                  </Typography>
                </Grid>
              </ProductDetailsGrid>
            )}

            {details && (
              <>
                {details.details.map((item, index) => (
                  <Details
                    order={index % 2 === 0 && 2}
                    data={{ title: item.title, htmlText: item.html_text }}
                  >
                    <DetailsImage
                      title={item.title}
                      src={item.image_url}
                    />
                  </Details>
                ))}
              </>
            )}

            {/* Review */}
            <div class="jdgm-medals-wrapper"></div>
            <ProductReviewWidget title={title} handle={handle} />
            <ProductPreviewBadge title={title} handle={handle} />

            {metaVideo && <YouTubeEmbed url={metaVideo.value} title={title} />}

            {recentViewedProducts.length > 1 && (
              <RecentViewed title="RECENTLY VIEWED PRODUCTS" />
            )}
          </Box>
        </MainWrapper>
      </Box >
    </Layout >
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

    metaMain: shopifyProductMetafield(
      productId: { eq: $id }
      key: { eq: "main" }
    ) {
      value
    }

    metaIncluded: shopifyProductMetafield(
      productId: { eq: $id }
      key: { eq: "included" }
    ) {
      value
    }

    metaMaterials: shopifyProductMetafield(
      productId: { eq: $id }
      key: { eq: "materials" }
    ) {
      value
    }

    metaManufacturing: shopifyProductMetafield(
      productId: { eq: $id }
      key: { eq: "manufacturing" }
    ) {
      value
    }

    metaCareInstructions: shopifyProductMetafield(
      productId: { eq: $id }
      key: { eq: "care_instructions" }
    ) {
      value
    }

    metaManualUrl: shopifyProductMetafield(
      productId: { eq: $id }
      key: { eq: "manual_url" }
    ) {
      value
    }

    metaOshwaUrl: shopifyProductMetafield(
      productId: { eq: $id }
      key: { eq: "oshwa_url" }
    ) {
      value
    }

    metaOshwaId: shopifyProductMetafield(
      productId: { eq: $id }
      key: { eq: "oshwa_id" }
    ) {
      value
    }

    metaReository: shopifyProductMetafield(
      productId: { eq: $id }
      key: { eq: "repository" }
    ) {
      value
    }

    metaVideo: shopifyProductMetafield(
      productId: { eq: $id }
      key: { eq: "video" }
    ) {
      value
    }

    metaDetails: shopifyProductMetafield(
      productId: { eq: $id }
      key: { eq: "details" }
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
