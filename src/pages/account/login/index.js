import { gql, useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { navigate } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { Layout, Link, MainWrapper, Seo } from '../../../components';
// stores
import { useAuthDispatch } from '../../../stores';

const validationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required.'),
  password: yup
    .string()
    .required('Please specify your password')
    .min(8, 'The password should have at minimum length of 8')
});

const LoginPage = ({ location }) => {
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);

  const authDispatch = useAuthDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async ({ email, password }) => {
    const { data } = await customerLogin({
      variables: {
        input: {
          email,
          password
        }
      }
    });

    if (data.customerAccessTokenCreate.customerAccessToken) {
      authDispatch({
        type: 'setCustomerAccessToken',
        customerAccessToken: data.customerAccessTokenCreate.customerAccessToken.accessToken
      });
      toast.success('Login Success!');

      const params = new URLSearchParams(location.search);
      const cartUrl = params.get('checkout_url');

      if (cartUrl) {
        navigate('https://hummingbird-hammocks.myshopify.com' + cartUrl);
      } else {
        navigate('/account/orders');
      }
    } else {
      console.log(data.customerAccessTokenCreate.customerUserErrors[0].message);
      toast.error('Invalid email or password, please try again');
    }
  };

  const [customerLogin, { error }] = useMutation(CUSTOMER_LOGIN);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error('Oops! Something went wrong. Please try again.');
    }
  }, [error]);

  return (
    <Layout>
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
            <Stack
              spacing={2}
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              sx={{ paddingBottom: '30px' }}>
              <Typography variant="h2">Account Login</Typography>
              <Button variant="outlined" onClick={() => navigate('/account/register')}>
                Sign Up
              </Button>
            </Stack>
            <Divider />

            <Box padding="30px" justifyContent="center" display="flex">
              <Box>
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
                    <TextField
                      label="Password *"
                      variant="outlined"
                      name={'password'}
                      type={showPassword ? 'text' : 'password'}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword} edge="end">
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      {...register('password')}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
                    <LoadingButton
                      size={'large'}
                      variant={'contained'}
                      type={'submit'}
                      loading={isSubmitting}>
                      Login
                    </LoadingButton>
                  </Stack>
                </form>

                <Box mt="20px">
                  <Typography variant="body1" mb="10px">
                    <Link to="/account/recovery">Forgot your password?</Link>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </MainWrapper>
      </Box>
    </Layout>
  );
};

export default LoginPage;

const CUSTOMER_LOGIN = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const Head = () => <Seo title="Login | Hummingbird Hammocks" />;
