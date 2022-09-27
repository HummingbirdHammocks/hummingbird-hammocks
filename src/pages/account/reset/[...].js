import React, { useContext } from "react"
import { toast } from "react-toastify"
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation, gql } from "@apollo/client"
import { navigate } from "gatsby"
import { useTheme, Typography, Divider, Box, Stack, TextField, IconButton, InputAdornment, useMediaQuery } from "@mui/material"
import { LoadingButton } from '@mui/lab';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { UserContext } from "contexts"
import {
  Seo,
  Layout,
  MainWrapper,
  OnButton,
} from "components"

const validationSchema = yup.object({
  newPassword: yup
    .string()
    .trim()
    .required('Please specify your password')
    .min(8, 'The password should have at minimum length of 8'),
  repeatPassword: yup
    .string()
    .trim()
    .required('Please specify your password')
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});

const ResetPage = ({ params }) => {
  const theme = useTheme();
  const matches = useMediaQuery("(max-width:900px)")

  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = React.useState(false);

  const {
    store: { customerAccessToken },
    setValue,
    logout,
  } = useContext(UserContext)

  const initialValues = {
    newPassword: '',
    repeatPassword: '',
  };

  const onSubmit = async (values, { resetForm }) => {
    const response = await handlePasswordReset(values.newPassword)
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

  const [resetPassword, { loading, error }] = useMutation(
    CUSTOMER_PASSWORD_RESET
  )

  const handlePasswordReset = async ({ password }) => {
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

      setTimeout(function () {
        navigate("/account/")
      }, 3000)
    } else {
      toast.error("Oops, something went wrong!")
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
          <Box padding={!matches ? "0 200px" : "0"}>
            {customerAccessToken ? (
              <Box
                minHeight="450px"
                justifyContent="center"
                alignItems="center"
                display="flex"
              >
                <Typography variant="h1">
                  You"re already Logged in! Please Logout First:
                </Typography>
                <OnButton onClick={() => logout()}>Logout</OnButton>
              </Box>
            ) : (
              <>
                <Stack spacing={2} direction="row" justifyContent="space-between" sx={{ paddingBottom: "30px" }}>
                  <Typography variant="h2">
                    Password Reset
                  </Typography>
                  <OnButton
                    hovercolor="#d2cbcb"
                    background="#34542a"
                    padding="0 10px"
                    color="white"
                    border="0"
                    borderRadius="10px"
                    onClick={() => navigate("/account/login")}
                  >
                    Login
                  </OnButton>
                </Stack>
                <Divider />

                <Box padding="30px" justifyContent="center" display="flex">
                  <Box>
                    <form onSubmit={formik.handleSubmit}>
                      <Stack spacing={2} sx={{ width: "400px" }}>
                        <TextField
                          label="New Password *"
                          variant="outlined"
                          name={'newPassword'}
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
                          value={formik.values.newPassword}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.newPassword &&
                            Boolean(formik.errors.newPassword)
                          }
                          helperText={
                            formik.touched.newPassword && formik.errors.newPassword
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
