import { gql, useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
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
import { Layout, MainWrapper, Seo } from 'components';
import { navigate } from 'gatsby';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

// stores
import { useAuthDispatch, useAuthStore } from '../../../stores';

const validationSchema = yup.object({
  firstName: yup.string().trim().required('First Name is required'),
  lastName: yup.string().trim().required('Last Name is required'),
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'The password should have at least 8 characters')
    .max(30, 'The password should have at most 30 characters')
});

const RegisterPage = () => {
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);

  const { customerAccessToken } = useAuthStore();
  const authDispatch = useAuthDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async ({ firstName, lastName, email, password }) => {
    const { data } = await customerRegister({
      variables: {
        input: {
          firstName,
          lastName,
          email,
          password
        }
      }
    });

    if (data.customerCreate.customer === null) {
      console.log(data.customerCreate.customerUserErrors[0].message);
      toast.error(data.customerCreate.customerUserErrors[0].message);
    } else {
      toast.success("Account Created! You'll be redirected to the login page in 3s...", {
        autoClose: 3000,
        hideProgressBar: false
      });
      navigate('/account/login');
    }
  };

  const [customerRegister /* , { loading, error } */] = useMutation(CUSTOMER_REGISTER);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <Layout>
      <Seo title="Register" />
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
                  <Typography variant="h2">Create Account</Typography>
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
                          label="First Name *"
                          variant="outlined"
                          name={'firstName'}
                          fullWidth
                          {...register('firstName')}
                          error={!!errors.firstName}
                          helperText={errors.firstName?.message}
                        />
                        <TextField
                          label="Last Name *"
                          variant="outlined"
                          name={'lastName'}
                          fullWidth
                          {...register('lastName')}
                          error={!!errors.lastName}
                          helperText={errors.lastName?.message}
                        />
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
                        <Button
                          size={'large'}
                          variant={'contained'}
                          type={'submit'}
                          disabled={isSubmitting}>
                          Create Account
                        </Button>
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

export default RegisterPage;

const CUSTOMER_REGISTER = gql`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
