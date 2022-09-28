import React, { useContext } from "react"
import {
  useTheme,
  Box,
  Divider,
  Typography,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material"
import { Add, Remove, Delete } from "@mui/icons-material"

import { useTopBannerContext, CartContext, RecentViewedContext } from "contexts"
import { Seo, Layout, MainWrapper, Link } from "components"
import { RecentViewed, CartExtras } from "sections"


const CartPage = () => {
  const theme = useTheme();
  const matches = useMediaQuery("(max-width:900px)")
  const { banner } = useTopBannerContext()
  const { checkout, updateLineItem, removeLineItem } = useContext(CartContext)
  const { recentViewedProducts } = useContext(RecentViewedContext)

  let totalQuantity = 0

  if (checkout) {
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
          <Box
            sx={{
              margin: "10px 70px 10px 70px",

              [theme.breakpoints.down("md")]: {
                margin: "0",
              },
            }}>
            <Box mt={matches ? "40px" : "70px"} pt={!banner ? "10px" : "50px"}>
              <MainWrapper>
                <Typography
                  sx={{ margin: "20px 10px" }}
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
                <Box m="0 40px">
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
                            height="130px"
                            width="130px"
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
                              {item.quantity}
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
                </Box>
              </Box>
            )}
          </Box>
          <CartExtras />
          {recentViewedProducts.length > 1 && (
            <RecentViewed title="YOU MAY ALSO BE INTERESTED IN" />
          )}
        </MainWrapper>
      </Box>
    </Layout>
  )
}

export default CartPage
