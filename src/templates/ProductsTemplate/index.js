import { useLocation } from '@gatsbyjs/reach-router';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Grid,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { graphql, navigate } from 'gatsby';
import queryString from 'query-string';
import React, { useContext, useEffect, useState } from 'react';

// components
import {
  Layout,
  Link,
  MainWrapper,
  ProductReviewStars,
  ProductReviewWidget,
  Seo,
  Socials
} from '../../components';
import { CartContext } from '../../contexts';
import {
  Fbt,
  Inventory,
  ProductDetailsTabs,
  ProductFeatures,
  ProductHero,
  ProductPrice,
  ProductQuantityAdder,
  RecentlyViewed,
  SoldOutIcon,
  YouTubeEmbed
} from '../../sections';
import ProductGallery from '../../sections/ProductPage/ProductGallery';
// stores
import { useRecentlyViewedDispatch } from '../../stores';
// utils
import { Color, convertToPlain } from '../../utils';

const ProductPage = ({ data, pageContext }) => {
  const { title, handle, media, description, shopifyId, featuredImage, metafields } =
    data.shopifyProduct;
  const { collection, next, prev } = pageContext;

  const theme = useTheme();

  const url = typeof window !== 'undefined' ? window.location.href : '';

  const [product, setProduct] = useState(null);
  const [selectedVariantStatic, setSelectedVariantStatic] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [variantColorName, setVariantColorName] = useState('');
  const [variantSizeName, setVariantSizeName] = useState('');
  const [variantColorValues, setVariantColorValues] = useState({});
  const [variantRestockDate, setVariantRestockDate] = useState(null);

  const rvpDispatch = useRecentlyViewedDispatch();

  const { getProductById } = useContext(CartContext);

  // Variants & Product Image
  const { search, pathname } = useLocation();
  const variantId = queryString.parse(search).variant;

  // Product Metafields

  let sale_reason;
  let video;
  let details;
  let rating;
  let rating_count;
  let frequently_bought_together;

  if (!metafields || !metafields.length) return null;
  for (let i = 0; i < metafields.length; i++) {
    switch (metafields[i].namespace) {
      case 'reviews':
        switch (metafields[i].key) {
          case 'rating':
            rating = JSON.parse(metafields[i].value);
            break;
          case 'rating_count':
            rating_count = metafields[i].value;
            break;
        }
        break;
      case 'related':
        switch (metafields[i].key) {
          case 'frequently_bought_together':
            frequently_bought_together = metafields[i].value;
            break;
        }
        break;
      case 'features':
        switch (metafields[i].key) {
          case 'details':
            details = JSON.parse(metafields[i].value);
            break;
        }
        break;
      case 'support':
        switch (metafields[i].key) {
          case 'video':
            video = metafields[i].value;
            break;
        }
        break;
      case 'general':
        switch (metafields[i].key) {
          case 'sale_reason':
            sale_reason = metafields[i].value;
            break;
        }
        break;
    }
  }

  const handleVariantColorChange = (variantName) => {
    let newVariantName;
    let newVariant;
    if (variantSizeName) {
      newVariantName = `${variantName} / ${variantSizeName}`;
      newVariant = product?.variants.find((v) => v.title === newVariantName);
    }

    if (!variantSizeName) {
      newVariant = product?.variants.find((v) => v.title === variantName);
    }

    setSelectedVariant(newVariant);

    navigate(`${pathname}?variant=${encodeURIComponent(newVariant.id)}`, {
      replace: true
    });
  };

  const handleVariantSizeChange = (variantName) => {
    let newVariant;

    if (variantColorName) {
      newVariant = product?.variants.find(
        (v) => v.title === `${variantColorName} / ${variantName}`
      );
    } else {
      newVariant = product?.variants.find((v) => v.title === variantName);
    }

    setSelectedVariant(newVariant);

    navigate(`${pathname}?variant=${encodeURIComponent(newVariant.id)}`, {
      replace: true
    });
  };

  useEffect(() => {
    rvpDispatch({ type: 'addRecentlyViewedProduct', recentlyViewedProduct: data.shopifyProduct });

    getProductById(shopifyId).then((result) => {
      setProduct(result);
      setVariantRestockDate(null);

      if (result?.variants) {
        const resultVariant =
          result.variants.find(({ id }) => id === variantId) || result.variants[0];

        const staticVariant =
          data.shopifyProduct.variants.find(({ shopifyId }) => shopifyId === variantId) ||
          data.shopifyProduct.variants[0];

        setSelectedVariant(resultVariant);
        setSelectedVariantStatic(staticVariant);

        if (staticVariant?.metafields.length > 0) {
          for (let i = 0; i < staticVariant.metafields.length; i++) {
            //Get Accent Colors
            if (staticVariant.metafields[i].key === 'colors') {
              setVariantColorValues(JSON.parse(staticVariant.metafields[i].value));
            }
            //Get Restock Date
            if (staticVariant.metafields[i].key === 'restock_date') {
              if (staticVariant.metafields[i].value) {
                const currentDate = new Date();
                const restockDate = new Date(staticVariant.metafields[i].value);
                if (restockDate.getTime() > currentDate.getTime()) {
                  setVariantRestockDate(
                    Math.round(
                      (restockDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24 * 7)
                    )
                  );
                }
              }
            }
          }
        }

        const resultTitle = resultVariant?.title;

        if (result.options.length === 2) {
          const csIndex = resultTitle?.indexOf('/');

          if (csIndex > 1 && resultTitle) {
            setVariantColorName(resultTitle.slice(0, csIndex - 1));
            setVariantSizeName(resultTitle.slice(csIndex + 2, resultTitle.length));
          }
        } else if (result.options[0].name === 'Color') {
          setVariantColorName(resultTitle);
        } else {
          setVariantSizeName(resultTitle);
        }
      }
    });
  }, [variantId]);

  return (
    <Layout>
      <Box
        sx={{
          background: theme.palette.white
        }}>
        <ProductHero
          handle={handle}
          backgroundColor={variantColorValues?.background}
          accentcolor={variantColorValues?.primary}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={4}>
            <Grid item xs={12} md={6} lg={5}>
              <ProductGallery
                media={media}
                selectedVariant={selectedVariant}
                accentcolor={variantColorValues?.primary}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={7}>
              <Box>
                <Box>
                  <Typography
                    textTransform="uppercase"
                    sx={{
                      mb: '20px',
                      lineHeight: '80px'
                    }}
                    variant="h1"
                    color="#414042">
                    {title}
                    <Divider />
                  </Typography>

                  {!!selectedVariant && (
                    <Stack
                      direction={{ xs: 'column', sm: 'row', md: 'column', lg: 'row' }}
                      justifyContent="space-between"
                      alignItems={{
                        xs: 'flex-start',
                        sm: 'center',
                        md: 'flex-start',
                        lg: 'center'
                      }}
                      spacing={2}>
                      <Stack
                        direction={{ xs: 'column', sm: 'row', md: 'row', lg: 'row' }}
                        justifyContent="space-between"
                        alignItems={{
                          xs: 'flex-start',
                          sm: 'center',
                          md: 'space-between',
                          lg: 'center'
                        }}
                        spacing={2}>
                        <ProductPrice
                          price={selectedVariant.price}
                          compareAtPrice={selectedVariant.compareAtPrice}
                          saleReason={sale_reason}
                        />
                      </Stack>
                      {rating && rating_count && (
                        <ProductReviewStars
                          max={rating.scale_max}
                          rating={rating.value}
                          count={rating_count}
                          accentcolor={variantColorValues?.primary}
                        />
                      )}
                      {!selectedVariant?.available && (
                        <Box>
                          <Box
                            sx={{
                              background: '#f41901',
                              padding: '8px 10px',
                              color: theme.palette.white.main,
                              borderRadius: '10px',
                              letterSpacing: '2px',

                              [theme.breakpoints.down('md')]: {
                                top: '70px',
                                right: '80px'
                              }
                            }}>
                            <Typography align={'center'}>Sold Out</Typography>
                          </Box>
                          {variantRestockDate && (
                            <Box
                              sx={{
                                padding: '8px 10px',
                                letterSpacing: '2px',

                                [theme.breakpoints.down('md')]: {
                                  top: '70px',
                                  right: '80px'
                                }
                              }}>
                              <Typography align={'center'}>
                                ~{variantRestockDate} Weeks ETA
                              </Typography>
                            </Box>
                          )}
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
                          {product.options.length === 2 && product.options[0].name === 'Color' ? (
                            <>
                              <Typography variant="navUser" m="20px 0">
                                Color
                              </Typography>
                              <Box display="flex">
                                {product?.options[0]?.values.map((item, index) => {
                                  return (
                                    <Tooltip key={index} title={item.value}>
                                      <Box
                                        margin="5px"
                                        padding="5px"
                                        position="relative"
                                        sx={{
                                          cursor: 'pointer'
                                        }}
                                        border={
                                          item.value === variantColorName
                                            ? '1px solid #000'
                                            : '1px solid #e2e2e2'
                                        }
                                        borderRadius="50%"
                                        onClick={() => handleVariantColorChange(item.value)}>
                                        <Color key={item.value} title={item.value} />
                                        {!product.variants[index].available && <SoldOutIcon />}
                                      </Box>
                                    </Tooltip>
                                  );
                                })}
                              </Box>

                              <Typography variant="navUser" m="20px 0">
                                {variantSizeName ? `Size: ${variantSizeName}` : 'Size'}
                              </Typography>
                              <Box display="flex">
                                {product?.options[1]?.values.map((item, index) => {
                                  return (
                                    <Tooltip key={index} title={item.value}>
                                      <Box
                                        margin="5px"
                                        padding="15px"
                                        sx={{ cursor: 'pointer' }}
                                        border={
                                          item.value === variantSizeName
                                            ? '1px solid #000'
                                            : '1px solid #e2e2e2'
                                        }
                                        borderRadius="5px"
                                        onClick={() => handleVariantSizeChange(item.value)}>
                                        <div>{item.value}</div>
                                        {!product.variants[index].available && (
                                          <SoldOutIcon margin="2px" />
                                        )}
                                      </Box>
                                    </Tooltip>
                                  );
                                })}
                              </Box>
                            </>
                          ) : product.options[0].name === 'Color' &&
                            product.options.length === 1 ? (
                            <>
                              <Typography variant="navUser" m="20px 0">
                                {variantColorName ? `Color: ${variantColorName}` : 'Color'}
                              </Typography>
                              <Box display="flex">
                                {product?.options[0]?.values.map((item, index) => {
                                  return (
                                    <Tooltip key={index} title={item.value}>
                                      <Box
                                        margin="5px"
                                        padding="5px"
                                        position="relative"
                                        sx={{
                                          cursor: 'pointer'
                                        }}
                                        border={
                                          item.value === variantColorName
                                            ? '1px solid #000'
                                            : '1px solid #e2e2e2'
                                        }
                                        borderRadius="50%"
                                        onClick={() => handleVariantColorChange(item.value)}>
                                        <Color key={item.value} title={item.value} />
                                        {!product.variants[index].available && <SoldOutIcon />}
                                      </Box>
                                    </Tooltip>
                                  );
                                })}
                              </Box>
                            </>
                          ) : product.options[0].name === 'Title' ? (
                            ''
                          ) : (
                            <>
                              <Typography variant="navUser" m="20px 0">
                                {product?.options[0].name}
                              </Typography>
                              <Box display="flex">
                                {product?.options[0]?.values.map((item, index) => {
                                  return (
                                    <Tooltip key={index} title={item.value}>
                                      <Box
                                        position="relative"
                                        margin="5px"
                                        padding="15px"
                                        sx={{ cursor: 'pointer' }}
                                        border={
                                          item.value === variantSizeName
                                            ? '1px solid #000'
                                            : '1px solid #e2e2e2'
                                        }
                                        borderRadius="5px"
                                        onClick={() => handleVariantSizeChange(item.value)}>
                                        <Typography>{item.value}</Typography>
                                        {!product.variants[index].available && (
                                          <SoldOutIcon margin="2px" />
                                        )}
                                      </Box>
                                    </Tooltip>
                                  );
                                })}
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
                      accentcolor={variantColorValues?.primary}
                    />
                  )}
                </Box>
                <Box>
                  <Socials
                    title={selectedVariant?.title || title}
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
                color: variantColorValues?.primary
              }}>
              <Typography variant="collectionName">
                <Link to="/" sx={{ color: variantColorValues?.primary, textDecoration: 'none' }}>
                  HOME
                </Link>{' '}
                /{' '}
                <Link
                  to={`/collections/${collection.handle}`}
                  sx={{ color: variantColorValues?.primary, textDecoration: 'none' }}>
                  {collection.title}
                </Link>{' '}
                /{' '}
                <Link
                  to={`/products/${handle}`}
                  sx={{ color: variantColorValues?.primary, textDecoration: 'none' }}>
                  {title}
                </Link>
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
                        '&:hover': {
                          borderColor: variantColorValues?.primary,
                          backgroundColor: variantColorValues?.primary,
                          color: variantColorValues?.primary && '#fff'
                        }
                      }}>
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
                        '&:hover': {
                          borderColor: variantColorValues?.primary,
                          backgroundColor: variantColorValues?.primary,
                          color: variantColorValues?.primary && '#fff'
                        }
                      }}>
                      Next
                    </Button>
                  </Tooltip>
                )}
              </ButtonGroup>
            </Stack>

            {product?.descriptionHtml ? (
              <Typography component="div">
                <div dangerouslySetInnerHTML={{ __html: product?.descriptionHtml }} />
              </Typography>
            ) : (
              <Typography variant="body1">{description}</Typography>
            )}

            {selectedVariant && frequently_bought_together && (
              <Fbt
                fbtData={frequently_bought_together}
                product={product}
                currentVariant={selectedVariant}
              />
            )}

            {!title.includes('Bargain') && !title.includes('rec') && (
              <ProductDetailsTabs
                variantMetafields={selectedVariantStatic?.metafields}
                productMetafields={metafields}
                backgroundColor={variantColorValues?.background}
                accentcolor={variantColorValues?.primary}
              />
            )}

            {details && details.details && (
              <ProductFeatures
                details={details.details}
                backgroundColor={variantColorValues?.background}
                accentcolor={variantColorValues?.primary}
              />
            )}

            {/* Review */}
            {/* <ProductReviewWidget title={title} id={product?.id} /> */}

            {video && <YouTubeEmbed url={video} title={title} />}

            <RecentlyViewed title="RECENTLY VIEWED" />
          </Container>
        </MainWrapper>
      </Box>
    </Layout>
  );
};

export default ProductPage;

export const query = graphql`
  query ProductQuery($id: String) {
    shopifyProduct(id: { eq: $id }) {
      ...ShopifyProductFields
      ...ProductTileFields
    }
  }
`;

export const Head = ({ data }) => {
  let description = '';
  if (data?.shopifyProduct?.seo?.description) {
    description = convertToPlain(data?.product?.descriptionHtml);
  } else if (data?.shopifyProduct?.description) {
    description = convertToPlain(data?.product?.description);
  }

  let title = '';
  if (data?.shopifyProduct?.seo?.title) {
    title = data?.shopifyProduct?.seo?.title;
  } else if (data?.shopifyProduct?.title) {
    title = data?.shopifyProduct?.title;
  } else {
    title = 'Ultralight Gear';
  }

  return (
    <Seo
      title={`${title} | Hummingbird Hammocks`}
      description={description}
      image={`${data?.shopifyProduct?.featuredImage?.originalSrc}`}
    />
  );
};
