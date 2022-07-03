import React, { useContext } from "react"
import { styled, Box, Button } from "@mui/material"
import { CartContext } from "contexts"

const Wrapper = styled(Box)(() => ({
  padding: "10px",
}))

export const AddToCart = ({ variantId, available }) => {
  const { updateLineItem } = useContext(CartContext)

  const handleSubmit = async () => {
    await updateLineItem({ variantId, quantity: 1 })
  }

  return (
    <Wrapper>
      <Button onClick={handleSubmit}>Add to Cart</Button>
    </Wrapper>
  )
}
