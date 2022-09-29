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
  firstName: yup
    .string()
    .trim()
    .required('First Name is required'),
  lastName: yup
    .string()
    .trim()
    .required('Last Name is required'),
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required'),
  subject: yup
    .string()
    .trim()
    .required('Subject is required'),
  message: yup
    .string()
    .required('Message is required')
});

export function ContactUsForm() {

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  };

  const onSubmit = async ({ firstName, lastName, email, subject, message }) => {
    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      subject: subject,
      message: message,
    }

    const url = process.env.GATSBY_FIREBASE_FUNCTIONS_URL + '/api/v1/freescout/create_ticket';

    await axios.post(url, payload)
      .then((response) =>
        toast.success("Message sent successfully, we will get back to you as soon as possible"),
        formik.resetForm({})
      )
      .catch((error) => {
        console.log("contactForm ", error)
        toast.error("Error sending message, please try again or email us at support@hummingbirdhammocks.com")
      });
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
                label="First Name *"
                variant="outlined"
                name={'firstName'}
                fullWidth
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Last Name *"
                variant="outlined"
                name={'lastName'}
                fullWidth
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Subject *"
                variant="outlined"
                name={'subject'}
                fullWidth
                value={formik.values.subject}
                onChange={formik.handleChange}
                error={formik.touched.subject && Boolean(formik.errors.subject)}
                helperText={formik.touched.subject && formik.errors.subject}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Message *"
                variant="outlined"
                name={'message'}
                fullWidth
                multiline
                rows={6}
                value={formik.values.message}
                onChange={formik.handleChange}
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={formik.touched.message && formik.errors.message}
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton size={'large'} variant={'contained'} type={'submit'} loading={formik.isSubmitting}>
                Send Message
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box >
  )
}