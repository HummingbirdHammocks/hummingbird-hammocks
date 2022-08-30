import React, { useState, useContext } from "react"
import { Box, Typography, styled, Button } from "@mui/material"
import { Add, Remove } from "@mui/icons-material"

import { OnButton } from "components"
import { CartContext } from "contexts"

const OutofStock = styled(Box)(() => ({
  marginTop: "30px",
  maxWidth: "450px",
  borderRadius: "20px",
  border: "1px solid #000",
  padding: "25px 20px",
}))

const EmailBox = styled(Box)(() => ({
  display: "flex",

  "& input": {
    minHeight: "36px",
    padding: "0 10px 0 5px",
  },
}))

const QuantityWrapper = styled(Box)(() => ({
  margin: "10px 0",

  "& .quantity": {
    width: "47px",
    height: "30px",
    padding: "0 11px",
    margin: "0 10px",
    borderRadius: "10px",
    textAlign: "center",
  },

  "& input[type=number]": {
    appearance: "textfield",
    background: "#fff",
  },

  "& input[type=number]::-webkit-outer-spin-button": {
    appearance: "none",
    margin: 0,
  },

  "& input[type=number]::-webkit-inner-spin-button ": {
    appearance: "none",
    margin: 0,
  },
}))

const QuantityButton = styled(Button)({
  minWidth: 0,
  minHeight: 0,
})

export function ProductQuantityAdder({ variantId, available }) {
  const [quantity, setQuantity] = useState(1)
  const { updateLineItem } = useContext(CartContext)

  const handleQuantityChange = e => {
    setQuantity(Number(e.currentTarget.value))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    await updateLineItem({ variantId, quantity: parseInt(quantity, 10) })
  }

  return (
    <Box>
      <Typography variant="navUser">Quantity</Typography>
      <form style={{ marginTop: "10px" }} onSubmit={handleSubmit}>
        <QuantityWrapper>
          <QuantityButton
            variant="outlined"
            color="primary"
            disabled={!available}
            onClick={() => setQuantity(quantity - 1)}
            sx={{
              height: "32px",
              width: "32px",
              borderRadius: "300px",
            }}
          >
            <Remove fontSize="small" />
          </QuantityButton>
          <input
            className="quantity"
            disabled={!available}
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <QuantityButton
            variant="outlined"
            color="primary"
            disabled={!available}
            onClick={() => setQuantity(quantity + 1)}
            sx={{
              height: "32px",
              width: "32px",
              borderRadius: "300px",
            }}
          >
            <Add fontSize="small" />
          </QuantityButton>
        </QuantityWrapper>

        <OnButton
          margin="30px 0 0 0"
          type="submit"
          border={!available && "1px solid #aeaeae"}
          disabled={!available}
        >
          {!available ? "Sold Out" : "Add to Cart"}
        </OnButton>
      </form>
      {!available && (
        <OutofStock>
          <Typography variant="h6">Out Of Stock</Typography>
          <Typography mb="20px" variant="body1">
            We will notify you when this product becomes available.
          </Typography>
          <EmailBox>
            <input placeholder="Email Address" type="Email Address" />
            <OnButton padding="4px 20px" type="submit">
              Notify Me
            </OnButton>
          </EmailBox>
        </OutofStock>
      )}
    </Box>
  )
}
