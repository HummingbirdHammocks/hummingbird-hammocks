import React, { useState, useContext } from "react"
import { Box } from "@mui/material"

import { OnButton } from "components"
import { CartContext } from "contexts"

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
      <strong>Quantity</strong>
      <form onSubmit={handleSubmit}>
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

        <OnButton type="submit" disabled={!available}>
          Add to cart
        </OnButton>
      </form>
    </Box>
  )
}
