import React, { useContext } from "react"
import {
  useTheme,
  Box,
  Divider,
  Typography,
  Button,
  IconButton,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Tooltip
} from "@mui/material"
import { Add, Remove, Delete, Forest, Co2 } from "@mui/icons-material"
// stores
import { CartContext } from "contexts"
// components
import { Seo, Layout, MainWrapper, Link } from "components"
import { RecentlyViewed, CartExtras } from "sections"


const CartPage = () => {
  const theme = useTheme();
  const matches = useMediaQuery("(max-width:900px)")

  const { checkout, updateLineItem, removeLineItem } = useContext(CartContext)

  let totalQuantity = 0

  if (checkout) {
    console.log(checkout);
    checkout.lineItems.forEach(lineItem => {
      totalQuantity = totalQuantity + lineItem.quantity
    })
  }

  const handleDecrementQuantity = ({ variantId }) => {
    updateLineItem({ quantity: -1, variantId })
  }
  const handleIncrementQuantity = ({ variantId }) => {
    updateLineItem({ quantity: 1, variantId })
  }

  return (
    <Layout>
      <Seo title="Cart" />
      <Box>
        <MainWrapper>
          <Box>
            <Box mt={2} pt={"10px"}>
              <MainWrapper>
                <Typography
                  sx={{ marginTop: 2, marginBottom: 2 }}
                  variant="h2"
                  color="black.main"
                  textAlign={
                    checkout?.lineItems.length >= 1 ? "left" : "center"
                  }
                >
                  {checkout?.lineItems.length >= 1
                    ? "Your Cart"
                    : "Your cart is empty"}
                </Typography>
                <Divider color="#e2dfd9" />
              </MainWrapper>
            </Box>
            {checkout?.lineItems.length >= 1 && (
              <Box
                sx={{
                  margin: "50px",
                  display: "grid",
                  position: "relative",
                  gridTemplateColumns: "2.5fr 1fr",
                  gridGap: "40px",

                  [theme.breakpoints.down("md")]: {
                    gridTemplateColumns: "1fr",
                    margin: "0",
                  },
                }}>
                <Box >
                  {checkout.lineItems.map((item, index) => (
                    <>
                      <Box
                        key={item.id}
                        alignItems="center"
                        py={2}
                        px={2.5}
                        borderBottom="1px solid #4f4c4c00"
                        display="flex"
                      >
                        <Link
                          sx={{
                            textDecoration: "none",
                            "&:hover": {
                              opacity: "0.7",
                            },
                          }}
                          to={`/products/${item.variant.product.handle}`}
                        >
                          <img
                            alt={item.variant.image.altText}
                            src={item.variant.image.src}
                            height={matches ? "80px" : "130px"}
                            width={matches ? "80px" : "130px"}
                          />
                        </Link>

                        <Box pl="20px" flex="1 1 0">
                          <Link
                            sx={{
                              textDecoration: "none",
                              "&:hover": {
                                opacity: "0.7",
                              },
                            }}
                            to={`/products/${item.variant.product.handle}`}
                          >
                            <Typography variant="cartTitle" fontSize="14px">
                              {item.title}
                            </Typography>
                          </Link>
                          <br />
                          <Typography variant="cartVariant" color="grey.600">
                            {item.variant.title === "Default Title"
                              ? ""
                              : item.variant.title}
                          </Typography>
                          <br />
                          <Box
                            fontWeight={600}
                            mr="15px"
                            fontSize="15px"
                            my="3px"
                          >
                            <Typography variant="subtitle3">
                              ${item.variant.price}{" "}
                              {item.variant.priceV2.currencyCode}
                            </Typography>
                          </Box>
                          <br />
                          <Box display="flex" alignItems="center">
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() =>
                                handleIncrementQuantity({
                                  variantId: item.variant.id,
                                })
                              }
                              sx={{
                                height: "32px",
                                width: "32px",
                                borderRadius: "300px",
                                mr: "15px",
                              }}
                            >
                              <Add fontSize="small" />
                            </Button>
                            <Box
                              fontWeight={600}
                              mr="15px"
                              fontSize="15px"
                              my="3px"
                            >
                              <Typography variant="subtitle3">
                                {item.quantity}
                              </Typography>
                            </Box>
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() =>
                                handleDecrementQuantity({
                                  variantId: item.variant.id,
                                })
                              }
                              sx={{
                                height: "32px",
                                width: "32px",
                                borderRadius: "300px",
                              }}
                            >
                              <Remove fontSize="small" />
                            </Button>
                          </Box>
                          <br />
                          <Box
                            fontWeight={600}
                            fontSize="14px"
                            color="primary.main"
                            mt={0.5}
                          >
                            <Typography variant="subtitle3">
                              <b>Total: </b> $
                              {(item.quantity * item.variant.price).toFixed(2)}{" "}
                              {item.variant.priceV2.currencyCode}
                            </Typography>
                          </Box>
                        </Box>

                        <IconButton
                          onClick={() => removeLineItem(item.id)}
                          ml={2.5}
                          size="small"
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>
                      <Divider />
                    </>
                  ))}
                </Box>
                <Box>
                  {checkout?.discountApplications.length >= 1 && (
                    checkout.discountApplications.map((discount, index) => (
                      <Box mb="20px" display="flex" justifyContent="space-between">
                        <Typography sx={{ color: "#F41901" }} variant="subtitle2">
                          {discount.title}
                        </Typography>
                        {discount.value.percentage !== null && (
                          <Typography sx={{ color: "#F41901" }} variant="subtitle2">
                            <b>{discount.value.percentage}% OFF</b>
                          </Typography>
                        )}
                      </Box>
                    ))
                  )}
                  <Box mb="20px" display="flex" justifyContent="space-between">
                    <Typography sx={{ color: "#000" }} variant="subtitle1">
                      <b>Subtotal: </b>
                    </Typography>
                    <Typography sx={{ color: "#000" }} variant="subtitle1">
                      <b>${checkout?.totalPrice}</b>
                    </Typography>
                  </Box>
                  <Typography variant="cartVariant" color="grey.600">
                    Taxes and <Link to="/shipping-policy">shipping </Link>
                    calculated at checkout
                  </Typography>

                  <Button
                    variant="contained"
                    sx={{
                      mt: "10px",
                    }}
                    fullWidth
                    onClick={() => {
                      window.location.href = checkout.webUrl
                    }}
                  >
                    Proceed to Checkout
                  </Button>

                  <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
                    <List>
                      <ListItem disablePadding>
                        <Tooltip title="Learn More" placement="bottom">
                          <ListItemButton component='a' href="https://www.shopify.com/climate/sustainability-fund/partners" target="_blank">
                            <ListItemIcon>
                              <Co2 />
                            </ListItemIcon>
                            <ListItemText primary="All deliveries are carbon neutral" />
                          </ListItemButton>
                        </Tooltip>
                      </ListItem>
                      <ListItem disablePadding>
                        <Tooltip title="Learn More" placement="bottom">
                          <ListItemButton component='a' href="https://ecologi.com/hummingbirdhammocks?r=60b8efa8e6e3c022ec95c2bb" target="_blank">
                            <ListItemIcon>
                              <Forest />
                            </ListItemIcon>
                            <ListItemText primary="We plant two trees for every order" />
                          </ListItemButton>
                        </Tooltip>
                      </ListItem>
                    </List>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
          <Box sx={{ marginTop: 4 }}>
            <CartExtras />
          </Box>
          <RecentlyViewed title="YOU MAY ALSO BE INTERESTED IN" />
        </MainWrapper>
      </Box >
    </Layout >
  )
}

export default CartPage
