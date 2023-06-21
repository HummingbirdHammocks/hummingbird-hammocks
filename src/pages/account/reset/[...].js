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

import { Layout, MainWrapper, Seo } from '../../../components';
// stores
import { useAuthDispatch, useAuthStore } from '../../../stores';

const validationSchema = yup.object({
  password: yup
    .string()
    .trim()
    .required('Please specify your password')
    .min(8, 'The password should have at minimum length of 8'),
  repeatPassword: yup
    .string()
    .trim()
    .required('Please specify your password')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
});

const ResetPage = ({ params }) => {
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const { customerAccessToken } = useAuthStore();
  const authDispatch = useAuthDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async (values) => {
    const response = await handlePasswordReset(values.password);
    if (response) {
      reset();
    }
  };

  const resetUrl = `https://hummingbirdhammocks.com/account/reset/${params['*']}`;

  const [resetPassword] = useMutation(CUSTOMER_PASSWORD_RESET);

  const handlePasswordReset = async (password) => {
    const { data } = await resetPassword({
      variables: {
        password,
        resetUrl
      }
    });

    if (data?.customerResetByUrl) {
      authDispatch({
        type: 'setCustomerAccessToken',
        customerAccessToken: data.customerResetByUrl.customerAccessToken.accessToken
      });
      toast.success("Password Reset Successfully! You'll be logged in automatically in 3s...", {
        autoClose: 3000,
        hideProgressBar: false
      });
      navigate('/account');
    } else {
      toast.error('Unable to reset password, please try again using the link in your email');
    }
  };

  useEffect(() => {
    if (errors.repeatPassword) {
      toast.error(errors.repeatPassword.message);
    }
  }, [errors.repeatPassword]);

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
            {customerAccessToken ? (
              <Box minHeight="450px" justifyContent="center" alignItems="center" display="flex">
                <Typography variant="h1">You're already Logged in! Please Logout First:</Typography>
                <Button variant="contained" onClick={() => authDispatch({ type: 'setLogout' })}>
                  Logout
                </Button>
              </Box>
            ) : (
              <>
                <Stack
                  spacing={2}
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  sx={{ paddingBottom: '30px' }}>
                  <Typography variant="h2">Password Reset</Typography>
                  <Button variant="outlined" onClick={() => navigate('/account/login')}>
                    Login
                  </Button>
                </Stack>
                <Divider />

                <Box padding="30px" justifyContent="center" display="flex">
                  <Box>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Stack spacing={2} sx={{ width: { xs: '100%', md: '400px' } }}>
                        <TextField
                          label="New Password *"
                          variant="outlined"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          fullWidth
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowPassword((show) => !show)}
                                  edge="end">
                                  {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                          {...register('password')}
                          error={!!errors.password}
                          helperText={errors.password?.message}
                        />
                        <TextField
                          label="Confirm Password *"
                          variant="outlined"
                          name="repeatPassword"
                          type={showPasswordConfirmation ? 'text' : 'password'}
                          fullWidth
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowPasswordConfirmation((show) => !show)}
                                  edge="end">
                                  {showPasswordConfirmation ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                          {...register('repeatPassword')}
                          error={!!errors.repeatPassword}
                          helperText={errors.repeatPassword?.message}
                        />
                        <LoadingButton
                          size="large"
                          variant="contained"
                          type="submit"
                          loading={isSubmitting}>
                          Change Password
                        </LoadingButton>
                      </Stack>
                    </form>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </MainWrapper>
      </Box>
    </Layout>
  );
};

export default ResetPage;

const CUSTOMER_PASSWORD_RESET = gql`
  mutation customerResetByUrl($password: String!, $resetUrl: URL!) {
    customerResetByUrl(password: $password, resetUrl: $resetUrl) {
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

export const Head = () => <Seo title="Password Reset | Hummingbird Hammocks" />;
