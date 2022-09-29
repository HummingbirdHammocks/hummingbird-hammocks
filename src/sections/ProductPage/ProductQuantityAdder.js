import React, { useState, useContext } from "react"
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify'
import { Box, Typography, Button, TextField, Stack } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { Add, Remove } from "@mui/icons-material"
//firebase
import { saveDocumentGenerateID } from 'utils/firebase';

import { CartContext } from "contexts"

const validationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required.'),
});

export function ProductQuantityAdder({ variantId, available, productHandle, productTitle, variantTitle, variantSku }) {
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const { updateLineItem } = useContext(CartContext)


  const handleQuantityChange = e => {
    setQuantity(Number(e.currentTarget.value))
  }

  const handleSubmit = async e => {
    setLoading(true)

    e.preventDefault()
    await updateLineItem({ variantId, quantity: parseInt(quantity, 10) })
    toast.success("Item added to cart")

    setLoading(false)
  }

  const initialValues = {
    email: '',
  };

  const onSubmit = async ({ email }) => {
    console.log(email)
    const payload = {
      email: `${email}`,
      variantTitle: `${variantTitle}`,
      variantSku: `${variantSku}`,
      variantId: `${variantId}`,
      productTitle: `${productTitle}`,
      productHandle: `${productHandle}`,
    }
    const response = await saveDocumentGenerateID("restock_notifications", payload)
    if (response) {
      toast.success("Thanks! We will let you know as soon as this item is back in stock")
      formik.resetForm({})
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <Box>
      <Typography variant="navUser">Quantity</Typography>
      <form style={{ marginTop: "10px" }} onSubmit={handleSubmit}>
        <Stack direction={{ xs: 'column', sm: 'row', md: 'row', lg: 'row' }} spacing={2}>
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

          <LoadingButton
            margin="30px 0 0 0"
            type="submit"
            variant="contained"
            border={!available ? "1px solid #aeaeae" : ""}
            disabled={!available}
            loading={loading}
          >
            {!available ? "Sold Out" : "Add to Cart"}
          </LoadingButton>
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
          <form onSubmit={formik.handleSubmit}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <TextField
                label="Email *"
                variant="outlined"
                name={'email'}
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <LoadingButton sx={{ minWidth: "160px" }} size={'large'} variant={'contained'} type={'submit'} loading={formik.isSubmitting}>
                Notify Me
              </LoadingButton>
            </Stack>
          </form>
        </Box>
      )}
    </Box>
  )
}
