import { gql, useMutation, useQuery } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
// components
import { AccountLayout, Link, MiddleSpinner } from 'components';
import { navigate } from 'gatsby';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

// stores
import { useAuthDispatch, useAuthStore } from '../../stores';

const validationSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .min(2, 'Please enter a valid name')
    .max(50, 'Please enter a valid name')
    .required('Please specify your first name'),
  lastName: yup
    .string()
    .trim()
    .min(2, 'Please enter a valid name')
    .max(50, 'Please enter a valid name')
    .required('Please specify your last name'),
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Please specify your email address')
});

const AccountInfoPage = () => {
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { customerAccessToken } = useAuthStore();
  const authDispatch = useAuthDispatch();

  const initialValues = {
    firstName: '',
    lastName: '',
    email: ''
  };

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    setValue
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues
  });

  const onSubmit = async ({ firstName, lastName, email }) => {
    //console.log(firstName, lastName, email);

    toast
      .promise(
        customerUpdate({
          variables: {
            customerAccessToken,
            customer: {
              email,
              firstName,
              lastName
            }
          }
        }),
        {
          pending: 'Saving Account Info...',
          success: 'Account Updated',
          error: 'Oops! Something went wrong. Please try again.'
        }
      )
      .then(() => {
        refetch();
        reset(initialValues);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangePassword = async () => {
    setChangePasswordLoading(true);

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      setChangePasswordLoading(false);
      return;
    }

    toast
      .promise(
        passwordUpdate({
          variables: {
            customerAccessToken,
            customer: {
              password: newPassword
            }
          }
        }),
        {
          pending: 'Updating Password...',
          success: 'Password Updated',
          error: 'Oops! Something went wrong. Please try again.'
        }
      )
      .then(() => {
        authDispatch({ type: 'setLogout' });
        navigate('/account/login');
      })
      .catch((error) => {
        console.log(error);
      });

    setChangePasswordLoading(false);
  };

  //Query & Mutation
  const { data, loading, error, refetch } = useQuery(CUSTOMER_INFO, {
    variables: {
      customerAccessToken
    }
  });
  const [customerUpdate] = useMutation(CUSTOMER_UPDATE);
  const [passwordUpdate] = useMutation(CUSTOMER_CHANGE_PASSWORD);

  const handleDefaultValues = useCallback(
    (data) => {
      if (data?.customer) {
        setValue('firstName', data.customer.firstName);
        setValue('lastName', data.customer.lastName);
        setValue('email', data.customer.email);
        // setValue("phone", data.customer.phone); // Check if phone field is in your form
      }
    },
    [setValue]
  );

  useEffect(() => {
    handleDefaultValues(data);
  }, [data]);

  return (
    <AccountLayout title="Account Info" currentPage="info">
      {customerAccessToken ? (
        <Box>
          <Typography sx={{ marginBottom: 7 }} variant="h4">
            Account Info
          </Typography>
          <Grid container spacing={4} sx={{ paddingBottom: 4 }}>
            {error && 'Error'}
            {loading && <MiddleSpinner divminheight="460px" size={20} />}
            {data && (
              <>
                <Grid
                  item
                  xs={12}
                  md={4}
                  sx={{ padding: 2, borderRight: { xs: '0', md: '1px solid rgba(0,0,0,0.12)' } }}>
                  <Typography variant="h5" sx={{ marginBottom: 2 }}>
                    Change Password
                  </Typography>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <TextField
                        label="New Password"
                        variant="outlined"
                        name={'newPassword'}
                        fullWidth
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Confirm Password"
                        variant="outlined"
                        name={'confirmPassword'}
                        fullWidth
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <LoadingButton
                        size={'large'}
                        variant={'contained'}
                        onClick={() => handleChangePassword()}
                        loading={changePasswordLoading}>
                        Change Password
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography variant="h5" sx={{ marginBottom: 2 }}>
                    General Info
                  </Typography>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={4}>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="firstName"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="First Name"
                              variant="outlined"
                              fullWidth
                              error={Boolean(errors.firstName)}
                              helperText={errors.firstName?.message}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="lastName"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Last Name"
                              variant="outlined"
                              fullWidth
                              error={Boolean(errors.lastName)}
                              helperText={errors.lastName?.message}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="email"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Email"
                              variant="outlined"
                              fullWidth
                              error={Boolean(errors.email)}
                              helperText={errors.email?.message}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item container xs={12}>
                        <LoadingButton
                          size={'large'}
                          variant={'contained'}
                          type={'submit'}
                          loading={isSubmitting}>
                          Update Account Info
                        </LoadingButton>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </>
            )}
          </Grid>
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

export default AccountInfoPage;

const CUSTOMER_INFO = gql`
  query ($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      email
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

const CUSTOMER_CHANGE_PASSWORD = gql`
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
