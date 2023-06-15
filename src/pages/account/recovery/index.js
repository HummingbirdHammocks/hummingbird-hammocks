import { gql, useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Layout, MainWrapper, Seo } from 'components';
import { navigate } from 'gatsby';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

// stores
import { useAuthDispatch, useAuthStore } from '../../../stores';

const validationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required.')
});

const RecoveryPage = () => {
  const theme = useTheme();

  const { customerAccessToken } = useAuthStore();
  const authDispatch = useAuthDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async ({ email }) => {
    console.log(email);
    await forgetPassword({
      variables: {
        email: email
      }
    });

    if (!error) {
      toast.success("Password Reset Email Sent! You'll be redirected to the login page in 3s...", {
        autoClose: 3000,
        hideProgressBar: false
      });

      setTimeout(function () {
        navigate('/account/login');
      }, 5000);
    } else {
      console.log(error);
      toast.error('Oops! Something went wrong. Please try again.');
    }
  };

  const [forgetPassword, { /* loading, */ error }] = useMutation(CUSTOMER_PASSWORD_FORGET);

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error('Oops! Something went wrong. Please try again.');
    }
  }, [error]);

  return (
    <Layout>
      <Seo title="Password Recovery" />
      <Box
        sx={{
          background: theme.palette.white,
          padding: '60px 15px',

          [theme.breakpoints.down('md')]: {
            padding: '50'
          }
        }}>
        <MainWrapper>
          <Box padding={{ xs: '0', md: '0 200px' }}>
            {customerAccessToken ? (
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{
                  marginTop: 20,
                  marginBottom: 20
                }}>
                <Typography variant="h2">You're already Logged in!</Typography>
                <Typography variant="h5">Please Log Out First</Typography>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => authDispatch({ type: 'setLogout' })}>
                  Logout
                </Button>
              </Stack>
            ) : (
              <>
                <Stack
                  spacing={2}
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  sx={{ paddingBottom: '30px' }}>
                  <Typography variant="h2">Password Recovery</Typography>
                  <Button variant="outlined" onClick={() => navigate('/account/login')}>
                    Login
                  </Button>
                </Stack>
                <Divider />

                <Box padding="30px" justifyContent="center" display="flex">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2} sx={{ width: { xs: '100%', md: '400px' } }}>
                      <TextField
                        label="Email *"
                        variant="outlined"
                        name={'email'}
                        fullWidth
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                      <Typography>We will send you an email to reset your password.</Typography>
                      <Button
                        size={'large'}
                        variant={'contained'}
                        type={'submit'}
                        disabled={isSubmitting}>
                        Submit
                      </Button>
                    </Stack>
                  </form>
                </Box>
              </>
            )}
          </Box>
        </MainWrapper>
      </Box>
    </Layout>
  );
};

export default RecoveryPage;

const CUSTOMER_PASSWORD_FORGET = gql`
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
