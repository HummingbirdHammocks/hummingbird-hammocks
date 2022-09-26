import React, { useState, useContext } from "react"
import { Box, Typography, Button, TextField, Stack } from "@mui/material"
import { Add, Remove } from "@mui/icons-material"

import { OnButton } from "components"
import { CartContext } from "contexts"

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
        <Stack direction={{ xs: 'column', sm: 'row', md: 'column', lg: 'row' }} spacing={2}>
          <Stack direction="row" spacing={2}>
            <Button
              color="primary"
              variant="outlined"
              disabled={!available}
              onClick={() => setQuantity(quantity - 1)}
              sx={{ height: "57px", width: "57px" }}
            >
              <Remove />
            </Button>
            <TextField
              disabled={!available}
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              sx={{ width: "80px" }}
            />
            <Button
              color="primary"
              variant="outlined"
              disabled={!available}
              onClick={() => setQuantity(quantity + 1)}
              sx={{ height: "57px", width: "57px" }}
            >
              <Add />
            </Button>
          </Stack>

          <OnButton
            margin="30px 0 0 0"
            type="submit"
            border={!available ? "1px solid #aeaeae" : ""}
            disabled={!available}
          >
            {!available ? "Sold Out" : "Add to Cart"}
          </OnButton>
        </Stack>
      </form>
      {!available && (
        <Box
          sx={{
            marginTop: "30px",
            maxWidth: "450px",
            borderRadius: "20px",
            border: "1px solid #000",
            padding: "25px 20px",
          }}>
          <Typography variant="h6">Out Of Stock</Typography>
          <Typography mb="20px" variant="body1">
            We will notify you when this product becomes available.
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <TextField label="Email Address" type="email" />
            <OnButton padding="4px 20px" type="submit">
              Notify Me
            </OnButton>
          </Stack>
        </Box>
      )}
    </Box>
  )
}
