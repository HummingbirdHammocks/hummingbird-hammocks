import React, { useState } from "react"
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation, gql } from "@apollo/client"
import { navigate } from "gatsby"
import { useTheme, Box, Typography, Divider, TextField, Stack, InputAdornment, IconButton, Button } from "@mui/material"
import { LoadingButton } from '@mui/lab';
import { Visibility, VisibilityOff } from '@mui/icons-material';
// stores
import { useAuthDispatch } from "../stores/useAuthStore";
// components
import {
  Seo,
  Layout,
  MainWrapper,
  Link,
} from "components"

const validationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required.'),
  password: yup
    .string()
    .required('Please specify your password')
    .min(8, 'The password should have at minimum length of 8'),
});

const LoginPage = () => {
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);

  const authDispatch = useAuthDispatch();

  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = async ({ email, password }) => {
    const { data } = await customerLogin({
      variables: {
        input: {
          email,
          password,
        },
      },
    })

    if (data.customerAccessTokenCreate.customerAccessToken) {
      authDispatch({ type: "setCustomerAccessToken", customerAccessToken: data.customerAccessTokenCreate.customerAccessToken.accessToken })
      toast.success("Login Success!")
      navigate("/account/orders")
    } else {
      toast.error("Invalid email or password, please try again")
    }

  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  const [customerLogin, { error }] = useMutation(CUSTOMER_LOGIN)

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  // if (loading) return "Submitting..."
  if (error) {
    console.log(error)
    toast.error("Oops! Something went wrong. Please try again.")
  }

  return (
    <Layout>
      <Seo title="Login" />
      <Box
        sx={{
          background: theme.palette.white,
          padding: "60px 15px",

          [theme.breakpoints.down("md")]: {
            padding: "50",
          },
        }}>
        <MainWrapper>
          <Box padding={{ xs: "0", md: "0 200px" }}>
            <Stack spacing={2} direction={{ xs: "column", sm: "row" }} justifyContent="space-between" sx={{ paddingBottom: "30px" }}>
              <Typography variant="h2">
                Account Login
              </Typography>
              <Button
                variant="outlined"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </Button>
            </Stack>
            <Divider />

            <Box padding="30px" justifyContent="center" display="flex">
              <Box>
                <form onSubmit={formik.handleSubmit}>
                  <Stack spacing={2} sx={{ width: { xs: "100%", md: "400px" } }}>
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
                        ),
                      }}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                    />
                    <LoadingButton size={'large'} variant={'contained'} type={'submit'} loading={formik.isSubmitting}>
                      Login
                    </LoadingButton>
                  </Stack>
                </form>

                <Box mt="20px">
                  <Typography variant="body1" mb="10px">
                    <Link to="/password-recovery">
                      Forgot your password?
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </MainWrapper>
      </Box >
    </Layout >
  )
}

export default LoginPage

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
`
