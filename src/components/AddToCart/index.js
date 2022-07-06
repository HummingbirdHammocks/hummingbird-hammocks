import React, { useContext } from "react"
import { styled, Box } from "@mui/material"
import { CartContext } from "contexts"

import { OnButton } from "components"

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
      <OnButton onClick={handleSubmit}>Add to Cart</OnButton>
    </Wrapper>
  )
}
