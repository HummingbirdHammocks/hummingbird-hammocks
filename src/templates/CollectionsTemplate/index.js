import React, { useEffect, useState } from "react"
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
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"
import { GatsbyImage } from "gatsby-plugin-image"
import { ExpandLess, ExpandMore } from "@mui/icons-material"

import { Seo, Layout, MainWrapper } from "components"
import { ProductCard } from "sections"

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
  padding: "60px 15px",
  display: "grid",
  gridTemplateColumns: "1fr 3fr",

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(1, 1fr)",
  },
}))

const ProductGridContent = styled("div")(({ theme }) => ({
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

  const [productType, setProductType] = useState(
    Array.from(new Set(products.map(j => j.productType)))
  )

  const [theProducts, setTheProducts] = useState(null)
  const [productTypeChecked, setProductTypeChecked] = useState([])
  const [collapse, setCollapse] = useState({
    collections: false,
    price: false,
    productType: false,
  })
  const [filterOptions, setFilterOptions] = useState({})

  const handleCollapse = target => {
    setCollapse({ ...collapse, [target]: !collapse[target] })
  }

  const handleProductSortChange = e => {
    setFilterOptions({ ...filterOptions, sort: e.target.value })
  }

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
      productType: newChecked.map(item => productType[item]),
    })
  }

  // Product Sorting
  const productSorting = (data, value) => {
    if (value === "low") {
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

    setTheProducts(filterProducts)
  }

  useEffect(() => {
    filterFunction()
  }, [filterOptions])

  console.log(theProducts)

  return (
    <Layout>
      <Seo title={title} description={description} />
      <Wrapper>
        <GatsbyImage image={image.gatsbyImageData} alt={title} />
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
        <ProductWrapper>
          <FilterGridWrapper>
            <List>
              <ListItemButton onClick={() => handleCollapse("collections")}>
                <ListItemText primary="Collections" />
                {collapse["collections"] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse
                in={collapse["collections"]}
                timeout="auto"
                unmountOnExit
              >
                <ListItem>
                  <Typography>List of Collections with Link</Typography>
                </ListItem>
              </Collapse>
              <Divider />

              <ListItemButton onClick={() => handleCollapse("productType")}>
                <ListItemText primary="productType" />
                {collapse["productType"] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse
                in={collapse["productType"]}
                timeout="auto"
                unmountOnExit
              >
                {productType.map((value, index) => {
                  const labelId = `checkbox-list-label-${index}`

                  return (
                    <ListItem key={index} disablePadding>
                      <ListItemButton
                        role={undefined}
                        onClick={handleProductTypeToggle(index)}
                        dense
                      >
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={productTypeChecked.indexOf(index) !== -1}
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
            </List>
          </FilterGridWrapper>
          <ProductGridContent>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  {filterOptions.sort}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Shorting"
                  value={filterOptions.sort}
                  onChange={handleProductSortChange}
                >
                  <MenuItem value="low">Price(Low to High)</MenuItem>
                  <MenuItem value="high">Price(How to Low)</MenuItem>
                </Select>
              </FormControl>
            </Box>
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
  }
`
