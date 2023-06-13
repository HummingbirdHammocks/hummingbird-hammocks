import { gql, useQuery } from '@apollo/client';
import { Close } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Dialog, IconButton, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { navigate } from 'gatsby';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

// stores
import { useAuthStore } from '../../stores';

export function BargainBinNotifications() {
  const [open, setOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const { customerAccessToken } = useAuthStore();

  const { data, refetch } = useQuery(CUSTOMER_INFO, {
    variables: {
      customerAccessToken
    }
  });

  const handleSavePreferences = async (add) => {
    setSubmitLoading(true);

    let promiseChain = Promise.resolve();

    if (add) {
      promiseChain = promiseChain.then(() =>
        axios.post(
          process.env.GATSBY_FIREBASE_FUNCTIONS_URL + '/api/v1/shopifyAdmin/add_customer_tags',
          {
            id: data.customer.id,
            tags: ['bargain-bin-notifications']
          }
        )
      );
    } else {
      promiseChain = promiseChain.then(() =>
        axios.post(
          process.env.GATSBY_FIREBASE_FUNCTIONS_URL + '/api/v1/shopifyAdmin/remove_customer_tags',
          {
            id: data.customer.id,
            tags: ['bargain-bin-notifications']
          }
        )
      );
    }

    toast
      .promise(promiseChain, {
        pending: 'Saving Preferences...',
        success: 'Preferences Updated',
        error: 'Oops! Something went wrong. Please try again.'
      })
      .then(() => {
        refetch();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button
        color="primary"
        variant="contained"
        onClick={handleClickOpen}
        sx={{
          backgroundColor: 'primary'
        }}>
        Notifications
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
          {data?.customer ? (
            <Box>
              {data?.customer?.tags.includes('bargain-bin-notifications') ? (
                <Stack
                  direction={'column'}
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}>
                  <Typography mb="20px" variant="body1">
                    You are already signed up to be notified when new Bargain Bin items are
                    available.
                  </Typography>
                  <LoadingButton
                    sx={{ minWidth: '160px' }}
                    size={'large'}
                    variant={'contained'}
                    onClick={() => handleSavePreferences(false)}
                    loading={submitLoading}>
                    Cancel Notifications
                  </LoadingButton>
                </Stack>
              ) : (
                <Stack
                  direction={'column'}
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}>
                  <Typography mb="20px" variant="body1">
                    Just click the button below and we will notify you when new Bargain Bin items are
                    available.
                  </Typography>
                  <LoadingButton
                    sx={{ minWidth: '160px' }}
                    size={'large'}
                    variant={'contained'}
                    onClick={() => handleSavePreferences(true)}
                    loading={submitLoading}>
                    Notify Me
                  </LoadingButton>
                </Stack>
              )}
            </Box>
          ) : (
            <Stack
              direction={'column'}
              justifyContent="space-between"
              alignItems="center"
              spacing={2}>
              <Typography mb="20px" variant="body1">
                You need to be signed in to request Bargain Bin item notifications. Please sign in
                or create an account.
              </Typography>
              <Button
                sx={{ minWidth: '160px' }}
                size={'large'}
                variant={'contained'}
                onClick={() => navigate('/account/login/')}>
                Login
              </Button>
            </Stack>
          )}
        </Box>
      </Dialog>
    </Box>
  );
}

const CUSTOMER_INFO = gql`
  query ($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      email
      tags
    }
  }
`;
