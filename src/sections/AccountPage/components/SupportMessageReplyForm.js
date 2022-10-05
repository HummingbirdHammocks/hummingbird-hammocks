import React from "react"
import axios from 'axios';
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
  message: yup
    .string()
    .required('Message is required')
});

export function SupportMessageReplyForm({ email, customerId, conversationId }) {
  const [submitting, setSubmitting] = React.useState(false);

  const initialValues = {
    message: '',
  };

  const onSubmit = async ({ message }) => {
    setSubmitting(true);

    let payload = {
      "type": "customer",
      "text": message,
      "customer": {
        "id": customerId,
        "email": email
      },
      "imported": true,
    }

    const url = process.env.GATSBY_FIREBASE_FUNCTIONS_URL + '/api/v1/freescout/create_thread/' + conversationId;

    await axios.post(url, payload)
      .then((response) =>
        toast.success("Message sent successfully"),
        formik.resetForm({})
      )
      .catch((error) => {
        console.log("contactForm ", error)
        toast.error("Error creating message, please try again or email us at support@hummingbirdhammocks.com")
      });

    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <Box sx={{ padding: 2 }}>
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Add Message"
                variant="outlined"
                name={'message'}
                fullWidth
                multiline
                rows={4}
                value={formik.values.message}
                onChange={formik.handleChange}
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={formik.touched.message && formik.errors.message}
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton size={'large'} variant={'outlined'} type={'submit'} loading={submitting}>
                Send Message
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box >
  )
}