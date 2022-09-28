import React, { useContext } from "react"
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation, gql } from "@apollo/client"
import { navigate } from "gatsby"
import { LoadingButton } from '@mui/lab';
import { useTheme, Typography, Divider, Box, Stack, TextField, Button, useMediaQuery } from "@mui/material"

import { UserContext } from "contexts"
import {
  Seo,
  Layout,
  MainWrapper,
} from "components"

const validationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required.'),
});

const PasswordRecovery = () => {
  const theme = useTheme();
  const matches = useMediaQuery("(max-width:900px)")

  const initialValues = {
    email: '',
  };

  const onSubmit = async ({ email }) => {
    console.log(email)
    await forgetPassword({
      variables: {
        email: email,
      },
    })

    if (!error) {
      toast.success("Password Reset Email Sent! You'll be redirected to the login page in 3s...", {
        autoClose: 3000,
        hideProgressBar: false,
      })

      setTimeout(function () {
        navigate("/login")
      }, 5000)
    } else {
      console.log(error)
      toast.error("Oops! Something went wrong. Please try again.")
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

  const [forgetPassword, { /* loading, */ error }] = useMutation(
    CUSTOMER_PASSWORD_FORGET
  )

  return (
    <Layout>
      <Seo title="Password Recovery" />
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
                  You're already Logged in! Please Logout First:
                </Typography>
                <Button variant="contained" onClick={() => logout()}>Logout</Button>
              </Box>
            ) : (
              <>
                <Stack spacing={2} direction="row" justifyContent="space-between" sx={{ paddingBottom: "30px" }}>
                  <Typography variant="h2">
                    Password Recovery
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Button>
                </Stack>
                <Divider />

                <Box padding="30px" justifyContent="center" display="flex">
                  <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={2} sx={{ width: "400px" }}>
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
                      <Typography>
                        We will send you an email to reset your password.
                      </Typography>
                      <LoadingButton size={'large'} variant={'contained'} type={'submit'} loading={formik.isSubmitting}>
                        Submit
                      </LoadingButton>
                    </Stack>
                  </form>

                </Box>
              </>
            )}
          </Box>
        </MainWrapper>
      </Box>
    </Layout>
  )
}

export default PasswordRecovery

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
`
