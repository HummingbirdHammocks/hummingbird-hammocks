import React, { useContext, useState } from "react"
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  useTheme,
  Typography,
  Divider,
  Box,
  Stack,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material"
import { LoadingButton } from '@mui/lab';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useMutation, gql } from "@apollo/client"
import { navigate } from "gatsby"

import { UserContext } from "contexts"
import {
  Seo,
  Layout,
  MainWrapper,
} from "components"

const validationSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .required('First Name is required'),
  lastName: yup
    .string()
    .trim()
    .required('Last Name is required'),
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'The password should have at least 8 characters')
    .max(30, 'The password should have at most 30 characters'),
});

const RegisterPage = () => {
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const onSubmit = async ({ firstName, lastName, email, password }) => {
    const { data } = await customerRegister({
      variables: {
        input: {
          firstName,
          lastName,
          email,
          password,
        },
      },
    })

    if (data.customerCreate.customer === null) {
      console.log(data.customerCreate.customerUserErrors[0].message)
      toast.error(data.customerCreate.customerUserErrors[0].message)
    } else {
      toast.success("Account Created! You'll be redirected to the login page in 3s...", {
        autoClose: 3000,
        hideProgressBar: false,
      })
      navigate("/account/login")
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  const {
    store: { customerAccessToken },
    logout,
  } = useContext(UserContext)

  const [customerRegister/* , { loading, error } */] = useMutation(CUSTOMER_REGISTER)

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <Layout>
      <Seo title="Register" />
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
            {customerAccessToken ? (
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{
                  marginTop: 20,
                  marginBottom: 20,
                }}>
                <Typography variant="h2">
                  You're already Logged in!
                </Typography>
                <Typography variant="h5">
                  Please Log Out First
                </Typography>
                <Button variant="contained" size="large" onClick={() => logout()}>Logout</Button>
              </Stack>
            ) : (
              <>
                <Stack spacing={2} direction={{ xs: "column", sm: "row" }} justifyContent="space-between" sx={{ paddingBottom: "30px" }}>
                  <Typography variant="h2">
                    Create Account
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/account/login")}
                  >
                    Login
                  </Button>
                </Stack>
                <Divider />

                <Box padding="30px" justifyContent="center" display="flex">
                  <Box>
                    <form onSubmit={formik.handleSubmit}>
                      <Stack spacing={2} sx={{ width: { xs: "100%", md: "400px" } }}>
                        <TextField
                          label="First Name *"
                          variant="outlined"
                          name={'firstName'}
                          fullWidth
                          value={formik.values.firstName}
                          onChange={formik.handleChange}
                          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                          helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                        <TextField
                          label="Last Name *"
                          variant="outlined"
                          name={'lastName'}
                          fullWidth
                          value={formik.values.lastName}
                          onChange={formik.handleChange}
                          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                          helperText={formik.touched.lastName && formik.errors.lastName}
                        />
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
                          Create Account
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
  )
}

export default RegisterPage

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
`
