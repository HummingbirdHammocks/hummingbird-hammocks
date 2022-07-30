import React, { useEffect, useState, useContext } from "react"
import { graphql } from "gatsby"
import {
  Box,
  Typography,
  styled,
  List,
  ListItem,
  Collapse,
  ListItemButton,
  ListItemText,
  Checkbox,
  ListItemIcon,
  Divider,
  FormControl,
  NativeSelect,
  IconButton,
  Slider,
} from "@mui/material"
import { GatsbyImage } from "gatsby-plugin-image"
import { ExpandLess, ExpandMore, Delete } from "@mui/icons-material"

import { Seo, Layout, MainWrapper, Link, OnButton } from "components"
import { ProductCard } from "sections"
import { RecentViewedContext } from "contexts"

const Wrapper = styled("section")(() => ({
  display: "grid",
  minHeight: "340px",
  position: "relative",
}))

const Middle = styled("div")(() => ({
  position: "absolute",
  display: "flex",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: "100",
}))

const Gradient = styled("div")(() => ({
  background: "rgba(0,0,0,.6)",
  position: "absolute",
  inset: "0 0 0 0",
}))

const ProductWrapper = styled("div")(({ theme }) => ({
  padding: "0 15px 60px 15px",
  display: "grid",
  gridTemplateColumns: "1fr 3fr",

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(1, 1fr)",
  },
}))

const ProductGridContent = styled("div")(() => ({
  padding: "10px 50px",
}))

const ProductGridWrapper = styled("div")(({ theme }) => ({
  display: "grid",
  position: "relative",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridGap: "20px",
  margin: "auto",

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(1, 1fr)",
  },
}))

const FilterGridWrapper = styled("div")(() => ({
  padding: "60px 15px",
}))

const CollectionsPage = ({ data }) => {
  const { title, image, products, description } = data.shopifyCollection
  const { collections } = data.allShopifyCollection
  const { recentViewedProducts } = useContext(RecentViewedContext)

  const productType = Array.from(new Set(products.map(j => j.productType)))

  const heightPrice = Math.max(
    ...products.map(i => Number(i.priceRangeV2.minVariantPrice.amount))
  )

  const [theProducts, setTheProducts] = useState(null)
  const [productTypeChecked, setProductTypeChecked] = useState([])
  // const [colorChecked, setColorChecked] = useState([])
  const [collapse, setCollapse] = useState({
    collections: false,
    price: false,
    productType: false,
    recentViewed: false,
  })
  const [filterOptions, setFilterOptions] = useState({ sort: "relevance" })
  const [selectedPrice, setSelectedPrice] = useState([0, heightPrice])

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
    return data.filter(item => item.variants[0].availableForSale === true)
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

  return (
    <Layout>
      <Seo title={title} description={description} />
      <Wrapper>
        <GatsbyImage
          placeholder="blurred"
          image={image.gatsbyImageData}
          alt={title}
        />
        <Middle>
          <Box>
            <Typography
              sx={{ margin: "20px 10px;" }}
              textAlign="center"
              variant="h1"
              color="white"
            >
              {title}
            </Typography>
          </Box>
        </Middle>
        <Gradient />
      </Wrapper>
      <MainWrapper>
        <Box m="30px 10px">
          <Typography variant="navMenu">
            <Link to="/">HAMMOCK SHOP</Link> / {title}
          </Typography>
        </Box>
        {/*  
          
            Sorting Product
          
            */}
        <Box display="flex" justifyContent="right">
          <Box sx={{ minWidth: 120, maxWidth: 320, p: "20px 10px 20px 10px" }}>
            <FormControl>
              {/* <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Sort
            </InputLabel> */}
              <NativeSelect
                value={filterOptions.sort}
                onChange={handleProductSortChange}
              >
                <option value="featured">Featured</option>
                <option value="relevance">Relevance</option>
                <option value="high">Price(How to Low)</option>
                <option value="low">Price(Low to High)</option>
                <option value="newToOld">Data(New to Old)</option>
                <option value="oldToNew">Data(Old to New)</option>
              </NativeSelect>
            </FormControl>
          </Box>
        </Box>

        <Divider />
        <ProductWrapper>
          <FilterGridWrapper>
            {/* 
          
            All the filter option that selected
          
           */}
            {filterOptions?.productType?.length > 0 && (
              <Box
                sx={{ background: "#e3e3e3", borderRadius: "20px" }}
                padding="20px"
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
                </List>
              </Box>
            )}

            <List>
              {/* 
          
              All the Collections
          
              */}
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
                  <ListItem key={collection.shopifyId}>
                    <Link to={`/collections/${collection.handle}`}>
                      <Typography>{collection.title}</Typography>
                    </Link>
                  </ListItem>
                ))}
              </Collapse>
              <Divider />
              {/* 
          
              Product Type Filtering
          
            */}
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
                    <ListItem key={index} disablePadding>
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
              {/*

              Price Filtering
          
             */}
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
                sx={{ mb: "20px" }}
                in={collapse["price"]}
                timeout="auto"
                unmountOnExit
              >
                <Slider
                  sx={{ mt: "40px" }}
                  value={selectedPrice}
                  onChange={handleChangePrice}
                  valueLabelDisplay="on"
                  min={0}
                  max={heightPrice}
                />

                <OnButton onClick={handlePriceFilterClick}>Apply</OnButton>
                {filterOptions?.price && (
                  <OnButton onClick={handleClearPriceFilterClick}>
                    Clear
                  </OnButton>
                )}
              </Collapse>
              <Divider />

              {/* 
          
              Recent Products
          
              */}
              <ListItemButton onClick={() => handleCollapse("recentViewed")}>
                <ListItemText
                  secondaryTypographyProps={{
                    fontSize: 20,
                    letterSpacing: 1.2,
                    fontWeight: 400,
                    textTransform: "uppercase",
                    color: "#000",
                  }}
                  secondary="Recent Viewed Products"
                />
                {collapse["recentViewed"] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse
                in={collapse["recentViewed"]}
                timeout="auto"
                unmountOnExit
              >
                {recentViewedProducts && (
                  <ProductCard products={recentViewedProducts.slice(0, 3)} />
                )}
              </Collapse>
            </List>
          </FilterGridWrapper>

          <ProductGridContent>
            {/*  
          
             Showing Product
          
            */}
            <ProductGridWrapper>
              {theProducts && <ProductCard products={theProducts} />}
            </ProductGridWrapper>
          </ProductGridContent>
        </ProductWrapper>
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
