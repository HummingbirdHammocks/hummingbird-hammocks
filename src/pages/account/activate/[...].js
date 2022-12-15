import React from "react"
import { toast } from "react-toastify"
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation, gql } from "@apollo/client"
import { navigate } from "gatsby"
import { useTheme, Typography, Divider, Box, Stack, TextField, IconButton, InputAdornment, Button } from "@mui/material"
import { LoadingButton } from '@mui/lab';
import { Visibility, VisibilityOff } from '@mui/icons-material';
// stores
import { useAuthStore, useAuthDispatch } from "../../../stores";
// components
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

const ActivatePage = ({ params }) => {
  const theme = useTheme();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = React.useState(false);

  const { customerAccessToken } = useAuthStore();
  const authDispatch = useAuthDispatch();

  const initialValues = {
    password: '',
    repeatPassword: '',
  };

  const onSubmit = async (values, { resetForm }) => {
    const response = await handleAccountActivation(values.password)
    if (response) {
      resetForm({})
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  const activationUrl = `https://hummingbirdhammocks.com/account/activate/${params["*"]}`

  const handleCustomerAccessToken = value => {
    authDispatch({ type: "setCustomerAccessToken", customerAccessToken: value })
  }

  const [activateAccount] = useMutation(
    CUSTOMER_ACTIVATE
  )

  const handleAccountActivation = async (password) => {
    const { data } = await activateAccount({
      variables: {
        password,
        activationUrl,
      },
    })

    if (data?.customerActivateByUrl) {
      console.log(data.customerActivateByUrl)
      handleCustomerAccessToken(
        data.customerActivateByUrl.customerAccessToken.accessToken
      )
      toast.success("Account Activated!", {
        autoClose: 3000,
        hideProgressBar: false,
      })
      navigate("/account")
    } else {
      console.log(data.customerActivateByUrl.customerUserErrors[0].message)
      toast.error("Unable to activate account, please try again using the link in your email")
    }
  }

  return (
    <Layout>
      <Seo title="Account Activation" />
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
                <Button variant="contained" size="large" onClick={() => authDispatch({ type: "setLogout" })}>Logout</Button>
              </Stack>
            ) : (
              <>
                <Stack spacing={2} direction={{ xs: "column", sm: "row" }} justifyContent="space-between" sx={{ paddingBottom: "30px" }}>
                  <Typography variant="h2">
                    Activate Account
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
                          Activate Account
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

export default ActivatePage

const CUSTOMER_ACTIVATE = gql`
  mutation customerActivate($activationUrl: URL!, $password: String!) {
    customerActivateByUrl(
      activationUrl: $activationUrl,
      password: $password
    ) {
      customer { 
        id 
      }
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
