import { gql, useQuery } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Add, Close, Remove } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Dialog, IconButton, Stack, TextField, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { CartContext } from '../../contexts';
import { useRestockNotifications } from '../../hooks';
import { useAuthStore } from '../../stores';
import { saveDocumentGenerateID } from '../../utils';

const validationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required.')
});

export function ProductQuantityAdder({
  variantId,
  available,
  productHandle,
  productTitle,
  variantTitle,
  variantSku,
  accentcolor
}) {
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { updateLineItem } = useContext(CartContext);

  const { customerAccessToken } = useAuthStore();

  const { data } = useQuery(CUSTOMER_INFO, {
    variables: {
      customerAccessToken
    }
  });

  const { data: notificationData } = useRestockNotifications(
    data && data.customer && data.customer.email
  );

  const queryClient = useQueryClient();

  const handleAlreadySignedUp = (notifications) => {
    if (!notifications || notifications.length < 0) return false;

    if (quantity - 1 <= 0) {
      const notification = notifications.filter((item) => item.variantSku === variantSku);
      if (notification.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity - 1 <= 0) {
      setQuantity(0);
    } else {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityChange = (e) => {
    if (e.currentTarget.value <= 0) {
      setQuantity(0);
    } else if (e.currentTarget.value >= 5) {
      setQuantity(5);
    } else {
      setQuantity(Number(e.currentTarget.value));
    }
  };

  const handleIncreaseQuantity = () => {
    if (quantity + 1 >= 5) {
      setQuantity(5);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = async (variantId, quantity) => {
    setLoading(true);

    await updateLineItem({ variantId, quantity: parseInt(quantity, 10) });
    toast.success('Item added to cart');

    setLoading(false);
  };

  const initialValues = {
    email: data && data.customer ? data.customer.email : ''
  };

  const {
    handleSubmit: handleFormSubmit,
    formState,
    reset,
    control
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
    mode: 'onBlur'
  });

  const { errors, isSubmitting } = formState;

  const onSubmit = async (formData) => {
    const payload = {
      email: formData.email,
      variantTitle: variantTitle !== 'Default Title' ? variantTitle : '',
      variantSku: variantSku,
      variantId: variantId,
      productTitle: productTitle,
      productHandle: productHandle
    };
    const response = await saveDocumentGenerateID('restock_notifications', payload);
    if (response) {
      toast.success('Thanks! We will let you know as soon as this item is back in stock');
      queryClient.invalidateQueries(['restock_notifications']);
      reset();
      setOpen(false);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Typography variant="navUser">Quantity</Typography>
      <Stack direction={{ xs: 'column', sm: 'row', md: 'row', lg: 'row' }} spacing={2}>
        <Stack direction="row" spacing={2}>
          <Button
            color="primary"
            variant="outlined"
            disabled={!available}
            onClick={handleDecreaseQuantity}
            sx={{ height: '57px', width: '57px' }}>
            <Remove />
          </Button>
          <TextField
            disabled={!available}
            InputProps={{
              inputProps: {
                style: { textAlign: 'center' }
              }
            }}
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            sx={{ width: '80px' }}
          />
          <Button
            color="primary"
            variant="outlined"
            disabled={!available}
            onClick={handleIncreaseQuantity}
            sx={{ height: '57px', width: '57px' }}>
            <Add />
          </Button>
        </Stack>

        {available ? (
          <LoadingButton
            margin="30px 0 0 0"
            type="submit"
            variant="contained"
            border={!available ? '1px solid #aeaeae' : ''}
            disabled={!available}
            loading={loading}
            onClick={() => handleAddToCart(variantId, quantity)}
            sx={{
              backgroundColor: accentcolor ? accentcolor : 'primary'
            }}>
            {!available ? 'Sold Out' : 'Add to Cart'}
          </LoadingButton>
        ) : (
          <Button
            color="primary"
            variant="contained"
            onClick={handleClickOpen}
            sx={{
              backgroundColor: accentcolor ? accentcolor : 'primary'
            }}>
            Notify Me
          </Button>
        )}
      </Stack>
      {!available && (
        <Dialog open={open} onClose={handleClose}>
          <Box
            sx={{
              maxWidth: '450px',
              borderRadius: '20px',
              padding: 3
            }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" gutterBottom>
                Restock Notification
              </Typography>
              <IconButton aria-label="close" onClick={handleClose}>
                <Close />
              </IconButton>
            </Stack>
            {handleAlreadySignedUp(notificationData) ? (
              <Typography mb="20px" variant="body1">
                You are already signed up to be notified when this product becomes available.
                <br />
                <br />
                We are working hard to get this product back in stock as soon as possible, thank you
                for your patience!
              </Typography>
            ) : (
              <Box>
                <Typography mb="20px" variant="body1">
                  Enter your email and we will notify you when this product becomes available.
                </Typography>
                <form onSubmit={handleFormSubmit(onSubmit)}>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Email *"
                          variant="outlined"
                          fullWidth
                          error={!!errors.email}
                          helperText={errors.email?.message}
                        />
                      )}
                    />
                    <LoadingButton
                      sx={{ minWidth: '160px' }}
                      size={'large'}
                      variant={'contained'}
                      type={'submit'}
                      loading={isSubmitting}>
                      Notify Me
                    </LoadingButton>
                  </Stack>
                </form>
              </Box>
            )}
          </Box>
        </Dialog>
      )}
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
