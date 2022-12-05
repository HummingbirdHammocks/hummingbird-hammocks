import React, { useContext } from "react"
import { toast } from "react-toastify"
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation, gql } from "@apollo/client"
import { navigate } from "gatsby"
import { useTheme, Typography, Divider, Box, Stack, TextField, IconButton, InputAdornment, Button } from "@mui/material"
import { LoadingButton } from '@mui/lab';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { UserContext } from "contexts"
import {
  Seo,
  Layout,
  MainWrapper,
} from "components"

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
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const ResetPage = ({ params }) => {
  const theme = useTheme();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = React.useState(false);

  const {
    store: { customerAccessToken },
    setValue,
    logout,
  } = useContext(UserContext)

  const initialValues = {
    password: '',
    repeatPassword: '',
  };

  const onSubmit = async (values, { resetForm }) => {
    const response = await handlePasswordReset(values.password)
    if (response) {
      resetForm({})
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  const resetUrl = `https://hummingbirdhammocks.com/account/reset/${params["*"]}`

  const handleCustomerAccessToken = value => {
    setValue(value)
  }

  const [resetPassword] = useMutation(
    CUSTOMER_PASSWORD_RESET
  )

  const handlePasswordReset = async (password) => {
    const { data } = await resetPassword({
      variables: {
        password,
        resetUrl,
      },
    })

    if (data?.customerResetByUrl) {
      handleCustomerAccessToken(
        data.customerResetByUrl.customerAccessToken.accessToken
      )
      toast.success("Password Reset Succesfully! You'll logged in automatically in 3s...", {
        autoClose: 3000,
        hideProgressBar: false,
      })
      navigate("/account")
    } else {
      toast.error("Unable to reset password, please try again using the link in your email")
    }
  }

  return (
    <Layout>
      <Seo title="Password Reset" />
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
              <Box
                minHeight="450px"
                justifyContent="center"
                alignItems="center"
                display="flex"
              >
                <Typography variant="h1">
                  You're already Logged in! Please Logout First:
                </Typography>
                <Button variant="contained" onClick={() => logout()}>Logout</Button>
              </Box>
            ) : (
              <>
                <Stack spacing={2} direction={{ xs: "column", sm: "row" }} justifyContent="space-between" sx={{ paddingBottom: "30px" }}>
                  <Typography variant="h2">
                    Password Reset
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
                          label="New Password *"
                          variant="outlined"
                          name={'password'}
                          type={showPassword ? 'text' : 'password'}
                          fullWidth
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword((show) => !show)} edge="end">
                                  {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.password &&
                            Boolean(formik.errors.password)
                          }
                          helperText={
                            formik.touched.password && formik.errors.password
                          }
                        />
                        <TextField
                          label="Confirm Password *"
                          variant="outlined"
                          name={'repeatPassword'}
                          type={showPasswordConfirmation ? 'text' : 'password'}
                          fullWidth
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={() => setShowPasswordConfirmation((show) => !show)} edge="end">
                                  {showPasswordConfirmation ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          value={formik.values.repeatPassword}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.repeatPassword &&
                            Boolean(formik.errors.repeatPassword)
                          }
                          helperText={
                            formik.touched.repeatPassword &&
                            formik.errors.repeatPassword
                          }
                        />
                        <LoadingButton size={'large'} variant={'contained'} type={'submit'} loading={formik.isSubmitting}>
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
  )
}

export default ResetPage

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
`
