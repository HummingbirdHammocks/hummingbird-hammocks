import React, { useState, useContext } from "react"
import { Box, Typography, styled } from "@mui/material"

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
    width: "50%",
    marginRight: "20px",
  },
}))

export function ProductQuantityAdder({ variantId, available }) {
  const [quantity, setQuantity] = useState(1)
  const { updateLineItem } = useContext(CartContext)

  const handleQuantityChange = e => {
    setQuantity(e.currentTarget.value)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    await updateLineItem({ variantId, quantity: parseInt(quantity, 10) })
  }

  return (
    <Box>
      <Typography variant="navUser">Quantity</Typography>
      <form style={{ marginTop: "10px" }} onSubmit={handleSubmit}>
        <Box>
          <input
            disabled={!available}
            type="number"
            min="1"
            step="1"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </Box>

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
