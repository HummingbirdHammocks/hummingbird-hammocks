import { gql, useQuery } from '@apollo/client';
import { Close } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Dialog, IconButton, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
//firebase
import { saveDocument } from 'utils/firebase';
import * as yup from 'yup';

// hooks
import useBargainBinNotifications from '../../hooks/useBargainBinNotifications';
// stores
import { useAuthStore } from '../../stores';

const validationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required.')
});

export function BargainBinNotifications() {
  const [open, setOpen] = useState(false);

  const { customerAccessToken } = useAuthStore();

  const { data } = useQuery(CUSTOMER_INFO, {
    variables: {
      customerAccessToken
    }
  });

  const { data: notificationData } = useBargainBinNotifications(
    data && data.customer && data.customer.email
  );

  const handleAlreadySignedUp = (notifications) => {
    if (notifications && notifications.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const initialValues = {
    email: data && data.customer ? data.customer.email : ''
  };

  const onSubmit = async ({ email }) => {
    console.log(email);
    const payload = {
      email: `${email}`,
      hammocks: true,
      treeStraps: true,
      shelters: true,
      apparelMerch: true,
      accessories: true
    };
    const response = await saveDocument('bargain_bin_notifications', email, payload);
    if (response) {
      toast.success('Thanks! We will keep you posted when new Bargain Bin items are available.');
      formik.resetForm({});
      setOpen(false);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit
  });

  return (
    <Box>
      <Button
        color="primary"
        variant="contained"
        onClick={handleClickOpen}
        sx={{
          backgroundColor: 'primary'
        }}>
        Notify Me
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box
          sx={{
            maxWidth: '450px',
            borderRadius: '20px',
            padding: 3
          }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" gutterBottom>
              Bargain Bin Notifications
            </Typography>
            <IconButton aria-label="close" onClick={handleClose}>
              <Close />
            </IconButton>
          </Stack>
          {handleAlreadySignedUp(notificationData) ? (
            <Typography mb="20px" variant="body1">
              You are already signed up to be notified when new Bargain Bin items are available.
            </Typography>
          ) : (
            <Box>
              <Typography mb="20px" variant="body1">
                Enter your email and we will notify you when new Bargain Bin items are available.
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}>
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
                  <LoadingButton
                    sx={{ minWidth: '160px' }}
                    size={'large'}
                    variant={'contained'}
                    type={'submit'}
                    loading={formik.isSubmitting}>
                    Notify Me
                  </LoadingButton>
                </Stack>
              </form>
            </Box>
          )}
        </Box>
      </Dialog>
    </Box>
  );
}

const CUSTOMER_INFO = gql`
  query ($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      email
    }
  }
`;
