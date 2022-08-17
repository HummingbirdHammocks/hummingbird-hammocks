import React, { useContext } from "react"
import { styled, Box } from "@mui/material"
import { CartContext } from "contexts"

import { OnButton } from "components"

const Wrapper = styled(Box)(() => ({
  padding: "10px 0",
}))

const AddtoCartButton = styled(OnButton)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    padding: "5px 10px",
    fontSize: "13px",
  },
}))

export const AddToCart = ({ variantId, available }) => {
  const { updateLineItem } = useContext(CartContext)

  const handleSubmit = async () => {
    await updateLineItem({ variantId, quantity: 1 })
  }

  return (
    <Wrapper justifyContent="center" display="flex">
      <AddtoCartButton onClick={handleSubmit}>Add to Cart</AddtoCartButton>
    </Wrapper>
  )
}
