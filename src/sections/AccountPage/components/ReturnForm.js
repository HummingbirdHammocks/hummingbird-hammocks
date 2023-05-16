import React, { useState } from "react"
import { useMutation, gql } from "@apollo/client"
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Box,
  Grid,
  TextField,
} from "@mui/material"
import { LoadingButton } from '@mui/lab';

const validationSchema = yup.object({
  returnReason: yup
    .string()
    .trim()
    .required('Reason is required'),
  customerNote: yup
    .string()
    .trim()
    .required('Note is required'),
});

export function ReturnForm({ id }) {

  const [requestReturn, { error }] = useMutation(REQUEST_RETURN)

  const initialValues = {
    id: id,
    returnReason: '',
    customerNote: '',
  };

  const onSubmit = async ({ id, returnReason, customerNote }) => {
    const { data } = await requestReturn({
      variables: {
        input: {
          orderId: id,
          returnReason: returnReason,
          customerNote: customerNote,
        },
      },
    })

    if (data) {
      if (data.returnRequest.return) {
        toast.success("Request Submitted Successfully")
      }
      if (data.returnRequest.userErrors) {
        toast.error(data.returnRequest.userErrors.message)
      }
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <Box padding="30px" justifyContent="center" display="flex">
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Return Reason *"
                variant="outlined"
                name={'returnReason'}
                fullWidth
                value={formik.values.returnReason}
                onChange={formik.handleChange}
                error={formik.touched.returnReason && Boolean(formik.errors.returnReason)}
                helperText={formik.touched.returnReason && formik.errors.returnReason}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Comments *"
                variant="outlined"
                name={'customerNote'}
                fullWidth
                multiline
                rows={4}
                value={formik.values.customerNote}
                onChange={formik.handleChange}
                error={formik.touched.customerNote && Boolean(formik.errors.customerNote)}
                helperText={formik.touched.customerNote && formik.errors.customerNote}
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton size={'large'} variant={'contained'} type={'submit'} loading={formik.isSubmitting}>
                Submit Request
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box >
  )
}

const REQUEST_RETURN = gql`
mutation RequestReturnMutation($orderId: ID!, $returnReason: String!, $customerNote: String!) {
  returnRequest(
    input: {
      # The ID of the order to return.
      orderId: $orderId
      # The return line items list to be handled.
      returnLineItems: [
        {
          # The ID of the related fulfillment line item to return.
          fulfillmentLineItemId: "gid://shopify/FulfillmentLineItem/2038817194093"
          # The quantity of the item to return.
          quantity: 1
          # The reason to return the item.
          returnReason: $returnReason
          # A message from the customer about the item to return.
          customerNote: $customerNote
        }
      ]
    }
  ) {
    return {
      id
      status
    }
    userErrors {
      field
      message
    }
   }
 }
`