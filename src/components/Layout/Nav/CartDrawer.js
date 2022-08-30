import React, { useContext } from "react"
import {
  Drawer,
  Box,
  Divider,
  Typography,
  Button,
  styled,
  IconButton,
  useMediaQuery,
} from "@mui/material"
import {
  ShoppingCartOutlined,
  Add,
  Remove,
  Close,
  Delete,
} from "@mui/icons-material"

import { useUICartContext, CartContext } from "contexts"
import { OnButton } from "components"

export const CartDrawer = () => {
  const matches = useMediaQuery("(max-width:900px)")
  const { cartOpen, setCartOpen } = useUICartContext()
  const { checkout, updateLineItem, removeLineItem } = useContext(CartContext)

  // const [open, setOpen] = useState(true)

  // const handleClick = () => {
  //   setOpen(!open)
  // }

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
    <Drawer
      PaperProps={{
        sx: { width: matches ? "90%" : "450px", borderRadius: "20px 0 0 20px" },
      }}
      anchor="right"
      open={cartOpen}
    >
      <Box display="flex" justifyContent="space-between" padding="16px 25px">
        <Box display="flex" justifyContent="center" alignItems="center">
          <ShoppingCartOutlined sx={{ mr: "10px" }} />
          <Typography sx={{ mt: "2px" }} variant="navMenu">
            {totalQuantity} {totalQuantity > 1 ? "Items" : "Item"}
          </Typography>
        </Box>
        <Box>
          <IconButton onClick={() => setCartOpen(!cartOpen)} ml={2.5}>
            <Close fontSize="lg" />
          </IconButton>
        </Box>
      </Box>
      <Divider />

      <Box sx={{ overflow: "auto", height: "calc((100vh - 80px) - 3.25rem)" }}>
        {checkout?.lineItems?.map(item => (
          <Box
            key={item.id}
            alignItems="center"
            py={2}
            px={2.5}
            borderBottom="1px solid #4f4c4c00"
            display="flex"
          >
            <Box
              mr="20px"
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <QuantityButton
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
              </QuantityButton>
            </Box>

            <img
              alt={item.variant.image.altText}
              src={item.variant.image.src}
              height="76px"
              width="76px"
            />

            <Box pl="20px" flex="1 1 0">
              <Typography variant="cartTitle" fontSize="14px">
                {item.title}
              </Typography>
              <br />
              <Typography variant="cartVariant" color="grey.600">
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
                <Typography variant="subtitle3">
                  ${(item.quantity * item.variant.price).toFixed(2)}{" "}
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
        ))}
      </Box>
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.44)",
          backdropFilter: "saturate(180%) blur(20px)",
        }}
        p="15px 25px 30px  25px"
      >
        <OnButton
          variant="outlined"
          sx={{
            height: 40,
          }}
          fullWidth
        >
          Proceed to Checkout
        </OnButton>
      </Box>
    </Drawer>
  )
}

const QuantityButton = styled(Button)({
  minWidth: 0,
  minHeight: 0,
})
