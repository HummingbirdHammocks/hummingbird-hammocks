import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, Stack, TextField } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

// components
import DragAndDrop from './dragAndDrop';

const validationSchema = yup.object({
  firstName: yup.string().trim().required('First Name is required'),
  lastName: yup.string().trim().required('Last Name is required'),
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required'),
  orderNumber: yup.string().trim(),
  subject: yup.string().trim().required('Subject is required'),
  message: yup.string().required('Message is required'),
  attachments: yup.mixed()
});

export function SupportTicketForm({ firstName, lastName, email, orderNumber, subject, message }) {
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      firstName: firstName ? firstName : '',
      lastName: lastName ? lastName : '',
      email: email ? email : '',
      orderNumber: orderNumber ? orderNumber : '',
      subject: subject ? subject : '',
      message: message ? message : '',
      attachments: []
    },
    resolver: yupResolver(validationSchema)
  });

  const handleAddAttachment = (file) => {
    console.log(file);

    if (!file) return null;

    let newAttachments = getValues('attachments');

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
      const fileFormatted = {
        fileName: file.name,
        mimeType: file.type,
        data: String(reader.result).split(',')[1]
      };
      newAttachments = [...newAttachments, fileFormatted];

      setValue('attachments', newAttachments);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
      toast.error('Error converting image for upload, please try again');
    };
  };

  const onSubmit = async ({
    firstName,
    lastName,
    email,
    orderNumber,
    subject,
    message,
    attachments
  }) => {
    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      orderNumber: orderNumber,
      subject: subject,
      message: message,
      attachments: attachments
    };

    const url = process.env.GATSBY_FIREBASE_FUNCTIONS_URL + '/api/v1/freescout/create_ticket';

    await toast
      .promise(axios.post(url, payload), {
        pending: 'Creating ticket...',
        success: 'Ticket created successfully, we will get back to you as soon as possible',
        error: 'Error creating ticket, please try again or email us at help@hummingbirdhammocks.com'
      })
      .then((response) => {
        if (response) {
          queryClient.invalidateQueries({ queryKey: ['tickets'] }), reset({});
        }
      })
      .catch((error) => {
        console.log('supportTicketForm_error', error);
      });
  };

  return (
    <Box
      sx={{ paddingLeft: { xs: 0, sm: 2 }, paddingRight: { xs: 0, sm: 2 } }}
      justifyContent="center"
      display="flex">
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {!firstName && (
              <Grid item xs={12} md={6}>
                <TextField
                  label="First Name *"
                  variant="outlined"
                  {...register('firstName')}
                  fullWidth
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              </Grid>
            )}
            {!lastName && (
              <Grid item xs={12} md={6}>
                <TextField
                  label="Last Name *"
                  variant="outlined"
                  {...register('lastName')}
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              </Grid>
            )}
            {!email && (
              <Grid item xs={12}>
                <TextField
                  label="Email *"
                  variant="outlined"
                  {...register('email')}
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
            )}
            {!orderNumber && (
              <Grid item xs={12}>
                <TextField
                  label="Order Number"
                  variant="outlined"
                  {...register('orderNumber')}
                  fullWidth
                  error={!!errors.orderNumber}
                  helperText={errors.orderNumber?.message}
                />
              </Grid>
            )}
            {!subject && (
              <Grid item xs={12}>
                <TextField
                  label="Subject *"
                  variant="outlined"
                  {...register('subject')}
                  fullWidth
                  error={!!errors.subject}
                  helperText={errors.subject?.message}
                />
              </Grid>
            )}
            {!message && (
              <Grid item xs={12}>
                <TextField
                  label="Message *"
                  variant="outlined"
                  {...register('message')}
                  fullWidth
                  multiline
                  rows={4}
                  error={!!errors.message}
                  helperText={errors.message?.message}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems="center"
                spacing={2}>
                <DragAndDrop handleSave={handleAddAttachment} />
                <LoadingButton
                  size={'large'}
                  variant={'contained'}
                  type={'submit'}
                  loading={isSubmitting}>
                  Create Ticket
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}
