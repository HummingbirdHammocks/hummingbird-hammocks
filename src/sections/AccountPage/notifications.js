import { gql, useMutation, useQuery } from '@apollo/client';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography
} from '@mui/material';
import axios from 'axios';
// components
import { AccountLayout, Link, MiddleSpinner } from 'components';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// stores
import { useAuthStore } from '../../stores';
import { RestockNotifications } from './components';

const AccountNotificationsPage = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [acceptsMarketing, setAcceptsMarketing] = useState(false);
  const [bargainRestock, setBargainRestock] = useState(false);

  const { customerAccessToken } = useAuthStore();

  const { data, loading, error, refetch } = useQuery(CUSTOMER_INFO, {
    variables: {
      customerAccessToken
    }
  });
  const [customerUpdate] = useMutation(CUSTOMER_UPDATE);

  const handleSavePreferences = async () => {
    setSubmitLoading(true);

    let promiseChain = Promise.resolve();

    promiseChain = promiseChain.then(() =>
      customerUpdate({
        variables: {
          customerAccessToken,
          customer: {
            acceptsMarketing
          }
        }
      })
    );

    if (bargainRestock) {
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

  useEffect(() => {
    if (data?.customer) {
      if (data?.customer?.acceptsMarketing) {
        setAcceptsMarketing(data?.customer?.acceptsMarketing);
      }
      if (data?.customer?.tags && data?.customer?.tags.includes('bargain-bin-notifications')) {
        setBargainRestock(true);
      }
    }
  }, [data]);

  return (
    <AccountLayout title="Notification Settings" currentPage="notifications">
      {customerAccessToken ? (
        <Box>
          <Typography sx={{ marginBottom: 7 }} variant="h4">
            Notifications
          </Typography>
          {error && 'Error'}
          {loading && <MiddleSpinner divminheight="460px" size={20} />}
          {data && (
            <Grid container spacing={4} sx={{ paddingBottom: 4 }}>
              <Grid
                item
                xs={12}
                md={4}
                sx={{ borderRight: { xs: '0', md: '1px solid rgba(0,0,0,0.12)' } }}>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  Email Preferences
                </Typography>
                <Box>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={acceptsMarketing}
                          onChange={() => setAcceptsMarketing(!acceptsMarketing)}
                        />
                      }
                      label="Promotions"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={bargainRestock}
                          onChange={() => setBargainRestock(!bargainRestock)}
                        />
                      }
                      label="Bargain Bin Restock"
                    />
                  </FormGroup>
                  <Divider variant="middle" sx={{ marginTop: 2, marginBottom: 2 }} />
                  <LoadingButton
                    size={'large'}
                    variant={'contained'}
                    onClick={() => handleSavePreferences()}
                    loading={submitLoading}>
                    Save Preferences
                  </LoadingButton>
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  Restock Notifications
                </Typography>
                <RestockNotifications email={data.customer.email} />
                <Typography variant="body1" sx={{ marginTop: 2, marginBottom: 2 }}>
                  * Restock notifications are automatically removed once the notification has been
                  sent. You will need to sign up from the product page again if you would like to
                  receive another notification.
                </Typography>
              </Grid>
            </Grid>
          )}
        </Box>
      ) : (
        <Box minHeight="450px" justifyContent="center" alignItems="center" display="flex">
          <Typography variant="h1">You need to log in first!</Typography>
          <Button>
            <Link to="/account/login">Go to Log In</Link>
          </Button>
        </Box>
      )}
    </AccountLayout>
  );
};

export default AccountNotificationsPage;

const CUSTOMER_INFO = gql`
  query ($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      email
      tags
      acceptsMarketing
    }
  }
`;

const CUSTOMER_UPDATE = gql`
  mutation customerUpdate($customer: CustomerUpdateInput!, $customerAccessToken: String!) {
    customerUpdate(customer: $customer, customerAccessToken: $customerAccessToken) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
