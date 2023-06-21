import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, TextField } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const validationSchema = yup.object({
  firstName: yup.string().trim().required('First Name is required'),
  lastName: yup.string().trim().required('Last Name is required'),
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required'),
  subject: yup.string().trim().required('Subject is required'),
  message: yup.string().required('Message is required')
});

export function ContactUsForm() {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async (data) => {
    const payload = { ...data };

    const url = process.env.GATSBY_FIREBASE_FUNCTIONS_URL + '/api/v1/freescout/create_ticket';

    await toast
      .promise(axios.post(url, payload), {
        pending: 'Sending message...',
        success: 'Message sent successfully!',
        error:
          'Error sending message, please try again or contact us at help@hummingbirdhammocks.com'
      })
      .then((response) => {
        if (response.status === 200) {
          reset();
        }
      })
      .catch((error) => {
        console.log('contactForm_error', error);
      });
  };

  return (
    <Box padding="30px" justifyContent="center" display="flex">
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="First Name *"
                    variant="outlined"
                    fullWidth
                    {...field}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Last Name *"
                    variant="outlined"
                    fullWidth
                    {...field}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Email *"
                    variant="outlined"
                    fullWidth
                    {...field}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="subject"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Subject *"
                    variant="outlined"
                    fullWidth
                    {...field}
                    error={!!errors.subject}
                    helperText={errors.subject?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Message *"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={6}
                    {...field}
                    error={!!errors.message}
                    helperText={errors.message?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                size={'large'}
                variant={'contained'}
                type={'submit'}
                loading={isSubmitting}>
                Send Message
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}
