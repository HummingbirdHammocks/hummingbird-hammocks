import { LoadingButton } from '@mui/lab';
import { Box, Grid, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
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
  const [submitting, setSubmitting] = useState(false);

  const queryClient = useQueryClient();

  const handleAddAttachment = (file) => {
    console.log(file);

    if (!file) return null;

    let newAttachments = formik.values.attachments;

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

      formik.setFieldValue('attachments', newAttachments);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
      toast.error('Error converting image for upload, please try again');
    };
  };

  const initialValues = {
    firstName: firstName ? firstName : '',
    lastName: lastName ? lastName : '',
    email: email ? email : '',
    orderNumber: orderNumber ? orderNumber : '',
    subject: subject ? subject : '',
    message: message ? message : '',
    attachments: []
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
    setSubmitting(true);

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

    await axios
      .post(url, payload)
      .then(
        () =>
          toast.success('Ticket created successfully, we will get back to you as soon as possible'),
        queryClient.invalidateQueries(['tickets']),
        formik.resetForm({})
      )
      .catch((error) => {
        console.log('contactForm ', error);
        toast.error(
          'Error creating ticket, please try again or email us at support@hummingbirdhammocks.com'
        );
      });

    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit
  });

  return (
    <Box
      sx={{ paddingLeft: { xs: 0, sm: 2 }, paddingRight: { xs: 0, sm: 2 } }}
      justifyContent="center"
      display="flex">
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            {!firstName && (
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
            )}
            {!lastName && (
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
            )}
            {!email && (
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
            )}
            {!orderNumber && (
              <Grid item xs={12}>
                <TextField
                  label="Order Number"
                  variant="outlined"
                  name={'orderNumber'}
                  fullWidth
                  value={formik.values.orderNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.orderNumber && Boolean(formik.errors.orderNumber)}
                  helperText={formik.touched.orderNumber && formik.errors.orderNumber}
                />
              </Grid>
            )}
            {!subject && (
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
            )}
            {!message && (
              <Grid item xs={12}>
                <TextField
                  label="Message *"
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
                  loading={submitting}>
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
