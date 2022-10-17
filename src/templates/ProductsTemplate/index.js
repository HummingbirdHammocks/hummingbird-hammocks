import React, { useState, useEffect, useContext } from "react"
import { graphql, navigate } from "gatsby"
import {
  useTheme,
  Box,
  Grid,
  Typography,
  Button,
  ButtonGroup,
  Stack,
  Divider,
  Container,
  Tooltip,
} from "@mui/material"
import { useLocation } from "@gatsbyjs/reach-router"
import queryString from "query-string"

import {
  Seo,
  Layout,
  Link,
  MainWrapper,
  Socials,
  ProductReviewWidget,
  ProductPreviewBadge,
} from "components"
import { CartContext, RecentViewedContext } from "contexts"
import Color from "utils/color"
import {
  ProductHero,
  ProductQuantityAdder,
  Fbt,
  ProductDetailsTabs,
  ProductFeatures,
  RecentViewed,
  YouTubeEmbed,
  Details,
  DetailsImage,
  SoldOutIcon,
  Inventory,
} from "sections"
import ProductGallery from "../../sections/ProductPage/ProductGallery"

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

  const theme = useTheme()

  const url = typeof window !== "undefined" ? window.location.href : ""

  const [product, setProduct] = useState(null)
  const [selectedVariantStatic, setSelectedVariantStatic] = useState(null)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [variantColorName, setVariantColorName] = useState("")
  const [variantSizeName, setVariantSizeName] = useState("")
  const [variantColorValues, setVariantColorValues] = useState({})

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

        /* console.log(variantId) */
        /* console.log(data.shopifyProduct.variants) */
        const staticVariant =
          data.shopifyProduct.variants.find(({ shopifyId }) => shopifyId === variantId) ||
          data.shopifyProduct.variants[0]

        setSelectedVariant(resultVariant)
        setSelectedVariantStatic(staticVariant)

        /* console.log(resultVariant) */
        /* console.log(staticVariant) */

        if (staticVariant?.metafields.length > 0) {
          for (let i = 0; i < staticVariant.metafields.length; i++) {
            if (staticVariant.metafields[i].key === "colors") {
              setVariantColorValues(JSON.parse(staticVariant.metafields[i].value))
              /* console.log(JSON.parse(staticVariant.metafields[i].value)) */
            }
          }
        }

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
        image={`${featuredImage?.originalSrc}`}
      />
      <Box
        sx={{
          background: theme.palette.white,
        }}
      >

        <ProductHero
          handle={handle}
          backgroundColor={variantColorValues?.background}
          accentColor={variantColorValues?.primary}
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={4}
          >
            <Grid item xs={12} md={6} lg={5}>
              <ProductGallery
                images={images}
                variantImageId={selectedVariant?.image.id}
                accentColor={variantColorValues?.primary}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={7}>
              <Box>
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
                      direction={{ xs: "column", sm: "row" }}
                      justifyContent="space-between"
                      alignItems={{ xs: "flex-start", sm: "center" }}
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
                      <ProductPreviewBadge id={product?.id} />
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
                </Box>

                <Box sx={{ marginTop: 4 }}>
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
                                      <Tooltip key={index} title={item.value}>
                                        <Box
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
                                      </Tooltip>
                                    )
                                  }
                                )}
                              </Box>

                              <Typography variant="navUser" m="20px 0">
                                {variantSizeName ? `Size: ${variantSizeName}` : "Size"}
                              </Typography>
                              <Box display="flex">
                                {product?.options[1]?.values.map(
                                  (item, index) => {
                                    return (
                                      <Tooltip key={index} title={item.value}>
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
                                      </Tooltip>
                                    )
                                  }
                                )}
                              </Box>
                            </>
                          ) : product.options[0].name === "Color" &&
                            product.options.length === 1 ? (
                            <>
                              <Typography variant="navUser" m="20px 0">
                                {variantColorName ? `Color: ${variantColorName}` : "Color"}
                              </Typography>
                              <Box display="flex">
                                {product?.options[0]?.values.map(
                                  (item, index) => {
                                    return (
                                      <Tooltip key={index} title={item.value}>
                                        <Box
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
                                      </Tooltip>
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
                                      <Tooltip key={index} title={item.value}>
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
                                          <Typography>{item.value}</Typography>
                                          {!product.variants[index].available && (
                                            <SoldOutIcon margin="2px" />
                                          )}
                                        </Box>
                                      </Tooltip>
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
                      productHandle={product.handle}
                      productTitle={product.title}
                      variantSku={selectedVariant.sku}
                      variantTitle={selectedVariant.title}
                      accentColor={variantColorValues?.primary}
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
        </ProductHero>

        <MainWrapper>
          <Container maxWidth="lg">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
              sx={{
                marginTop: 2,
                marginBottom: 6,
                color: variantColorValues?.primary,
              }}
            >
              <Typography variant="collectionName" >
                <Link to="/" sx={{ color: variantColorValues?.primary, textDecoration: "none" }}>HOME</Link> /{" "}
                <Link to={`/collections/${collection.handle}`} sx={{ color: variantColorValues?.primary, textDecoration: "none" }}>
                  {collection.title}
                </Link>{" "}
                / <Link to={`/products/${handle}`} sx={{ color: variantColorValues?.primary, textDecoration: "none" }}>{title}</Link>
              </Typography>
              <ButtonGroup variant="outlined" aria-label="navigation button group">
                {prev.handle && (
                  <Tooltip title={prev.title}>
                    <Button
                      size="small"
                      component={Link}
                      to={`/products/${prev.handle}`}
                      sx={{
                        color: variantColorValues?.primary,
                        borderColor: variantColorValues?.primary,
                        "&:hover": {
                          borderColor: variantColorValues?.primary,
                          backgroundColor: variantColorValues?.primary,
                          color: variantColorValues?.primary && "#fff",
                        },
                      }}
                    >
                      Prev
                    </Button>
                  </Tooltip>
                )}
                {next.handle && (
                  <Tooltip title={next.title}>
                    <Button
                      size="small"
                      component={Link}
                      to={`/products/${next.handle}`}
                      sx={{
                        color: variantColorValues?.primary,
                        borderColor: variantColorValues?.primary,
                        "&:hover": {
                          borderColor: variantColorValues?.primary,
                          backgroundColor: variantColorValues?.primary,
                          color: variantColorValues?.primary && "#fff",
                        },
                      }}
                    >
                      Next
                    </Button>
                  </Tooltip>
                )}
              </ButtonGroup>
            </Stack>

            <Typography
              variant="body1"
              color="#414042"
            >
              {description}
            </Typography>

            {selectedVariant && metaFBT && (
              <Fbt
                fbtData={metaFBT.value}
                product={product}
                currentVariant={selectedVariant}
              />
            )}

            <ProductDetailsTabs
              specs={selectedVariantStatic?.metafields}
              features={metaMain?.value}
              included={metaIncluded?.value}
              materials={metaMaterials?.value}
              manufacturing={metaManufacturing?.value}
              manualUrl={metaManualUrl?.value}
              oshwaId={metaOshwaId?.value}
              oshwaUrl={metaOshwaUrl?.value}
              careInstructions={metaCareInstructions?.value}
              video={metaVideo?.value}
              repo={metaReository?.value}
              backgroundColor={variantColorValues?.background}
              accentColor={variantColorValues?.primary}
            />

            {details && (
              <ProductFeatures
                details={details?.details}
                backgroundColor={variantColorValues?.background}
                accentColor={variantColorValues?.primary}
              />
            )}

            {/* Review */}
            <ProductReviewWidget title={title} id={product?.id} />

            {metaVideo && <YouTubeEmbed url={metaVideo.value} title={title} />}

            {recentViewedProducts.length > 1 && (
              <RecentViewed title="RECENTLY VIEWED PRODUCTS" />
            )}
          </Container>
        </MainWrapper >
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
