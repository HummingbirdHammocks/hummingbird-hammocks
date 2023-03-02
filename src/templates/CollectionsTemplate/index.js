import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import {
  useTheme,
  Box,
  Typography,
  List,
  ListItem,
  Collapse,
  ListItemButton,
  ListItemText,
  Checkbox,
  ListItemIcon,
  Divider,
  FormControl,
  IconButton,
  Slider,
  Button,
  Stack,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"
import { ExpandLess, ExpandMore, Delete } from "@mui/icons-material"
// stores
import { useRecentlyViewedStore } from "../../stores"
// components
import { Seo, Layout, MainWrapper, Link } from "components"
import { ProductCard, BargainBinNotifications } from "sections"

const CollectionsPage = ({ data }) => {
  const theme = useTheme();
  const { title, image, products, description } = data.shopifyCollection
  const { collections } = data.allShopifyCollection

  const { recentlyViewedProducts } = useRecentlyViewedStore()

  const productType = Array.from(new Set(products.map(j => j.productType)))

  const heightPrice = Math.max(
    ...products.map(i => Number(i.priceRangeV2.minVariantPrice.amount))
  )

  const minHeightPrice = Math.min(
    ...products.map(i => Number(i.priceRangeV2.minVariantPrice.amount))
  )

  const [theProducts, setTheProducts] = useState(null)
  const [productTypeChecked, setProductTypeChecked] = useState([])
  const [collapse, setCollapse] = useState({
    collections: false,
    price: false,
    productType: false,
    recentViewed: false,
    availability: false,
  })
  const [filterOptions, setFilterOptions] = useState({
    sort: "relevance",
    inStock: false,
  })
  const [selectedPrice, setSelectedPrice] = useState([
    minHeightPrice,
    heightPrice,
  ])

  // Handle Collapse
  const handleCollapse = target => {
    setCollapse({ ...collapse, [target]: !collapse[target] })
  }

  // Handle Product Sort Change
  const handleProductSortChange = e => {
    setFilterOptions({ ...filterOptions, sort: e.target.value })
  }

  //Handle Product Type Checked
  const handleProductTypeToggle = value => () => {
    const currentIndex = productTypeChecked.indexOf(value)
    const newChecked = [...productTypeChecked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setProductTypeChecked(newChecked)

    setFilterOptions({
      ...filterOptions,
      productType: newChecked.map(item => item),
    })
  }

  //Handle Product In Stock Checked
  const handleProductInStock = () => {
    setFilterOptions({
      ...filterOptions,
      inStock: !filterOptions.inStock,
    })
  }

  // Handle Price Filter
  const handleChangePrice = (event, value) => {
    setSelectedPrice(value)
  }

  // Handle Price Filter OnClick
  const handlePriceFilterClick = () => {
    setFilterOptions({
      ...filterOptions,
      price: true,
    })
  }

  // Handle Clear Price Filter OnClick
  const handleClearPriceFilterClick = () => {
    setSelectedPrice([0, heightPrice])
    setFilterOptions({
      ...filterOptions,
      price: false,
    })
  }

  // Product Sorting
  const productSorting = (data, value) => {
    if (value === "relevance") {
      return data
    } else if (value === "low") {
      return data.sort(
        (a, b) =>
          Number(a.priceRangeV2.minVariantPrice.amount) -
          Number(b.priceRangeV2.minVariantPrice.amount)
      )
    } else if (value === "high") {
      return data.sort(
        (a, b) =>
          Number(b.priceRangeV2.minVariantPrice.amount) -
          Number(a.priceRangeV2.minVariantPrice.amount)
      )
    } else if (value === "featured") {
      return data.filter(i => i.tags.includes("Featured"))
    } else if (value === "newToOld") {
      return data.sort(
        (a, b) => new Date(a.publishedAt) - new Date(b.publishedAt)
      )
    } else if ((value = "oldToNew")) {
      return data.sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
      )
    }

    return data
  }

  // Product Filter by Product Type
  const filterByProductType = (data, values) => {
    return data.filter(item => values.includes(item.productType))
  }

  // Product Filter by Availability
  const filterByAvailability = data => {
    return data.filter(item =>
      item.variants.some(i => i.availableForSale === true)
    )
  }

  // Product Filter by Price
  const filterByPrice = data => {
    return data.filter(
      item =>
        Number(item.priceRangeV2.minVariantPrice.amount) >= selectedPrice[0] &&
        Number(item.priceRangeV2.minVariantPrice.amount) <= selectedPrice[1]
    )
  }

  // Filter Function
  const filterFunction = () => {
    let filterProducts = [...products]

    // Filter for Product Type
    if (filterOptions?.productType?.length > 0) {
      filterProducts = filterByProductType(
        filterProducts,
        filterOptions.productType
      )
    }

    // Filter for Sorting
    if (filterOptions.sort) {
      filterProducts = productSorting(filterProducts, filterOptions.sort)
    }

    // Filter for Availablility
    if (filterOptions.inStock) {
      filterProducts = filterByAvailability(filterProducts)
    }

    // Filter by Price
    if (filterOptions.price) {
      filterProducts = filterByPrice(filterProducts)
    }

    setTheProducts(filterProducts)
  }

  useEffect(() => {
    filterFunction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterOptions])

  /* console.log(filterOptions) */

  return (
    <Layout>
      <Seo title={title} description={description} />
      <Box
        sx={{
          display: "grid",
          minHeight: { xs: "200px", md: "340px" },
          position: "relative",
        }}>
        <GatsbyImage
          placeholder="blurred"
          image={image.gatsbyImageData}
          alt={title}
          loading="eager"
        />
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "100",
          }}>
          <Box>
            <Typography
              sx={{ margin: "20px 10px" }}
              textAlign="center"
              variant="h1"
              color="white.main"
            >
              {title}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            background: "rgba(0,0,0,.6)",
            position: "absolute",
            inset: "0 0 0 0",
          }} />
      </Box>
      <MainWrapper>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ margin: 2 }}
        >
          <Box display={{ xs: "block", md: "row" }}>
            <Typography variant="collectionName">
              <Link to="/">HAMMOCK SHOP</Link> / {title}
            </Typography>
          </Box>

          {/* Sorting Product */}
          <Box sx={{ minWidth: 120, maxWidth: 320 }}>
            <FormControl>
              <InputLabel id="sort-select-label">Sort By</InputLabel>
              <Select
                labelId="sort-select-label"
                id="sort-select"
                value={filterOptions.sort}
                label="Sort By"
                onChange={handleProductSortChange}
              >
                <MenuItem value="featured">Featured</MenuItem>
                <MenuItem value="relevance">Relevance</MenuItem>
                <MenuItem value="high">Price(High to Low)</MenuItem>
                <MenuItem value="low">Price(Low to High)</MenuItem>
                <MenuItem value="newToOld">Data(New to Old)</MenuItem>
                <MenuItem value="oldToNew">Data(Old to New)</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>

        <Divider color="#e2dfd9" />
        <Box
          sx={{
            padding: "0 15px 10px 15px",
            display: "grid",
            gridTemplateColumns: "1fr 3fr",

            [theme.breakpoints.down("md")]: {
              gridTemplateColumns: "repeat(1, 1fr)",
              padding: "0",
            },
          }}>
          <Box
            sx={{
              padding: "20px 15px",

              [theme.breakpoints.down("md")]: {
                padding: "0",
              },
            }}>
            {/* All the filter option that selected */}

            <Box
              sx={{
                padding: "20px",
                marginTop: 2,
                background: "#e3e3e3",
                borderRadius: "20px",
                display:
                  filterOptions.inStock ||
                    filterOptions.price ||
                    filterOptions?.productType?.length > 0
                    ? "block"
                    : "none",
              }}

            >
              <Typography variant="h6">Selected Filters</Typography>
              <List>
                {filterOptions?.productType?.map((item, index) => (
                  <ListItem
                    secondaryAction={
                      <IconButton
                        onClick={handleProductTypeToggle(item)}
                        edge="end"
                        aria-label="delete"
                      >
                        <Delete />
                      </IconButton>
                    }
                    key={index}
                  >
                    <ListItemText primary={item} />
                  </ListItem>
                ))}

                {filterOptions?.inStock && (
                  <ListItem
                    secondaryAction={
                      <IconButton
                        onClick={handleProductInStock}
                        edge="end"
                        aria-label="delete"
                      >
                        <Delete />
                      </IconButton>
                    }
                  >
                    <ListItemText primary="In Stock" />
                  </ListItem>
                )}

                {filterOptions?.price && (
                  <ListItem
                    secondaryAction={
                      <IconButton
                        onClick={handleClearPriceFilterClick}
                        edge="end"
                        aria-label="delete"
                      >
                        <Delete />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={`Price [$${selectedPrice[0]} - $${selectedPrice[1]}]`}
                    />
                  </ListItem>
                )}
              </List>
            </Box>

            <List
              sx={{
                borderRight: { sx: "0", md: "1px solid #e2dfd9" },
                paddingR: { sx: "0 15px", md: "0 20px 0 0" },
                margin: "20px 0",
              }}
            >
              {/* All the Collections */}
              <ListItemButton onClick={() => handleCollapse("collections")}>
                <ListItemText
                  secondaryTypographyProps={{
                    fontSize: 20,
                    letterSpacing: 1.2,
                    fontWeight: 400,
                    textTransform: "uppercase",
                    color: "#000",
                  }}
                  secondary="Collections"
                />
                {collapse["collections"] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse
                in={collapse["collections"]}
                timeout="auto"
                unmountOnExit
              >
                {collections?.map(collection => (
                  <ListItem m="20px" key={collection.shopifyId}>
                    <Link to={`/collections/${collection.handle}`}>
                      <Typography>{collection.title}</Typography>
                    </Link>
                  </ListItem>
                ))}
              </Collapse>
              <Divider />
              {/* Product Type Filtering */}
              <ListItemButton onClick={() => handleCollapse("productType")}>
                <ListItemText
                  secondaryTypographyProps={{
                    fontSize: 20,
                    letterSpacing: 1.2,
                    fontWeight: 400,
                    textTransform: "uppercase",
                    color: "#000",
                  }}
                  secondary="Product Type"
                />
                {collapse["productType"] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse
                in={collapse["productType"]}
                timeout="auto"
                unmountOnExit
              >
                {productType.map((value, index) => {
                  return (
                    <ListItem m="20px" key={index} disablePadding>
                      <ListItemButton
                        role={undefined}
                        onClick={handleProductTypeToggle(value)}
                        dense
                      >
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={productTypeChecked.indexOf(value) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ "aria-labelledby": index }}
                          />
                        </ListItemIcon>
                        <ListItemText id={index} primary={value} />
                      </ListItemButton>
                    </ListItem>
                  )
                })}
              </Collapse>
              <Divider />

              {/* Product Availbility */}
              <ListItemButton onClick={() => handleCollapse("availbility")}>
                <ListItemText
                  secondaryTypographyProps={{
                    fontSize: 20,
                    letterSpacing: 1.2,
                    fontWeight: 400,
                    textTransform: "uppercase",
                    color: "#000",
                  }}
                  secondary="AVAILABILITY"
                />
                {collapse["availbility"] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse
                in={collapse["availbility"]}
                timeout="auto"
                unmountOnExit
              >
                <ListItem m="20px" disablePadding>
                  <ListItemButton
                    onClick={handleProductInStock}
                    role={undefined}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={filterOptions?.inStock}
                        onClick={handleProductInStock}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": "controlled" }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="In Stock" />
                  </ListItemButton>
                </ListItem>
              </Collapse>
              <Divider />
              {/* Price Filtering */}
              <ListItemButton onClick={() => handleCollapse("price")}>
                <ListItemText
                  secondaryTypographyProps={{
                    fontSize: 20,
                    letterSpacing: 1.2,
                    fontWeight: 400,
                    textTransform: "uppercase",
                    color: "#000",
                  }}
                  secondary="Price"
                />
                {collapse["price"] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse
                sx={{ m: "40px" }}
                in={collapse["price"]}
                timeout="auto"
                unmountOnExit
              >
                <Slider
                  sx={{ m: "15px 0 40px 0" }}
                  value={selectedPrice}
                  onChange={handleChangePrice}
                  valueLabelDisplay="on"
                  min={minHeightPrice}
                  size="small"
                  max={heightPrice}
                  marks={[
                    { value: minHeightPrice, label: `$${minHeightPrice}` },
                    { value: heightPrice, label: `$${heightPrice}` },
                  ]}
                />


                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                >

                  <Button variant="contained" onClick={handlePriceFilterClick}>Apply</Button>
                  {filterOptions?.price && (
                    <Button
                      variant="outlined"
                      color="error"
                      margin="0 0 0 15px"
                      onClick={handleClearPriceFilterClick}
                    >
                      Clear
                    </Button>
                  )}
                </Stack>
              </Collapse>
              <Divider />

              {/* Recent Products */}
              <ListItemButton onClick={() => handleCollapse("recentViewed")}>
                <ListItemText
                  secondaryTypographyProps={{
                    fontSize: 20,
                    letterSpacing: 1.2,
                    fontWeight: 400,
                    textTransform: "uppercase",
                    color: "#000",
                  }}
                  secondary="Recently Viewed"
                />
                {collapse["recentViewed"] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse
                in={collapse["recentViewed"]}
                timeout="auto"
                unmountOnExit
              >
                {recentlyViewedProducts.length > 0 ? (
                  <ProductCard
                    minHeight="230px"
                    products={recentlyViewedProducts.slice(0, 3)}
                  />
                ) : (
                  <Box m="20px">
                    <Typography variant="body1">No Products Found!</Typography>
                  </Box>
                )}
              </Collapse>
            </List>

            {title === "Bargain Bin" && (
              <BargainBinNotifications />
            )}
          </Box>

          <Box
            sx={{
              padding: "10px 50px",

              [theme.breakpoints.down("md")]: {
                padding: "0",
              },
            }}>
            {/* Showing Product */}
            <Box
              sx={{
                display: "grid",
                position: "relative",
                gridTemplateColumns: "repeat(2, 1fr)",
                gridGap: "20px",
                margin: "auto",

                [theme.breakpoints.down("md")]: {
                  gridTemplateColumns: "repeat(1, 1fr)",
                },
              }}>
              {theProducts && (
                <ProductCard mdminheight="250px" products={theProducts} />
              )}
            </Box>
          </Box>
        </Box>
      </MainWrapper>
    </Layout>
  )
}

export default CollectionsPage

export const query = graphql`
  query ProductCollectionQuery($shopifyId: String) {
    shopifyCollection(shopifyId: { eq: $shopifyId }) {
      image {
        gatsbyImageData(placeholder: BLURRED)
      }
      title
      description
      products {
        ...ShopifyProductFields
        ...ProductTileFields
      }
    }
    allShopifyCollection {
      collections: nodes {
        handle
        shopifyId
        title
      }
    }
  }
`
