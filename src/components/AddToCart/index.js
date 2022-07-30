import React, { useContext } from "react"
import { styled, Box } from "@mui/material"
import { CartContext } from "contexts"

import { OnButton } from "components"

const Wrapper = styled(Box)(() => ({
  padding: "10px 0",
}))

export const AddToCart = ({ variantId, available }) => {
  const { updateLineItem } = useContext(CartContext)

  const handleSubmit = async () => {
    await updateLineItem({ variantId, quantity: 1 })
  }

  return (
    <Wrapper justifyContent="center" display="flex">
      <OnButton onClick={handleSubmit}>Add to Cart</OnButton>
    </Wrapper>
  )
}
