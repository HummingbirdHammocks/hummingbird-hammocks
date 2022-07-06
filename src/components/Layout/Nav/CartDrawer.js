import React, { useState, useContext } from "react"
import {
  Drawer,
  Box,
  Divider,
  Typography,
  Button,
  styled,
  IconButton,
} from "@mui/material"
import { ShoppingBasket, Add, Remove, Close, Delete } from "@mui/icons-material"
import { Link } from "gatsby"

import { useUICartContext, CartContext } from "contexts"

export const CartDrawer = () => {
  const { cartOpen, setCartOpen } = useUICartContext()
  const { checkout, updateLineItem } = useContext(CartContext)
  const [open, setOpen] = useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  //handle adjust quantity
  const handleAdjuctQuantity = ({ quantity, variantId }) => {
    updateLineItem({ quantity, variantId })
  }

  let totalQuantity = 0

  if (checkout) {
    checkout.lineItems.forEach(lineItem => {
      totalQuantity = totalQuantity + lineItem.quantity
    })
  }

  return (
    <Drawer
      PaperProps={{
        sx: { width: "385px", borderRadius: "20px 0 0 20px" },
      }}
      anchor="right"
      open={cartOpen}
    >
      <Box display="flex" justifyContent="space-between" padding="25px 20px">
        <Box display="flex" justifyContent="center" alignItems="center">
          <ShoppingBasket sx={{ mr: "10px" }} />
          <Typography sx={{ mt: "6px" }} variant="navMenu">
            {totalQuantity} Item
          </Typography>
        </Box>
        <Box>
          <IconButton onClick={() => setCartOpen(!cartOpen)} ml={2.5}>
            <Close fontSize="lg" />
          </IconButton>
        </Box>
      </Box>
      <Divider />

      <Box>
        {checkout?.lineItems?.map(item => (
          <Box
            key={item.id}
            alignItems="center"
            py={2}
            px={2.5}
            borderBottom="1px solid #4f4c4c00"
            display="flex"
          >
            <Box display="flex" alignItems="center" flexDirection="column">
              <QuantityButton
                variant="outlined"
                color="primary"
                sx={{
                  height: "32px",
                  width: "32px",
                  borderRadius: "300px",
                }}
              >
                <Add fontSize="small" />
              </QuantityButton>
              <Box fontWeight={600} fontSize="15px" my="3px">
                {item.quantity}
              </Box>
              <QuantityButton
                variant="outlined"
                color="primary"
                sx={{
                  height: "32px",
                  width: "32px",
                  borderRadius: "300px",
                }}
              >
                <Remove fontSize="small" />
              </QuantityButton>
            </Box>

            <img
              alt={item.variant.image.altText}
              src={item.variant.image.src}
              height="76px"
              width="76px"
            />

            <Box flex="1 1 0">
              <Typography fontSize="14px">{item.title}</Typography>

              <Typography fontSize="12px" color="grey.600">
                {item.variant.title === "Default Title"
                  ? ""
                  : item.variant.title}
              </Typography>
              <Box
                fontWeight={600}
                fontSize="14px"
                color="primary.main"
                mt={0.5}
              >
                {item.variant.priceV2.currencyCode}{" "}
                {(item.quantity * item.variant.price).toFixed(2)}
              </Box>
            </Box>

            <IconButton ml={2.5} size="small">
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>
      <Box p={2.5}>
        <Link href="/checkout-alternative" passHref>
          <Button
            variant="contained"
            color="primary"
            sx={{
              mb: "0.75rem",
              height: "40px",
            }}
            fullWidth
          >
            Checkout Now
          </Button>
        </Link>
        <Link href="/cart" passHref>
          <Button
            color="primary"
            variant="outlined"
            sx={{
              height: 40,
            }}
            fullWidth
          >
            View Cart
          </Button>
        </Link>
      </Box>
    </Drawer>
  )
}

const QuantityButton = styled(Button)({
  minWidth: 0,
  minHeight: 0,
})
