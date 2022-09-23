import React, { useState, useContext } from "react"
import { useTheme } from '@mui/material/styles';
import { Box, Paper, Typography, Divider, TextField, Stack, useMediaQuery } from "@mui/material"
import { useMutation, gql } from "@apollo/client"
import { useForm } from "react-hook-form"
import { navigate } from "gatsby"

import { UserContext } from "contexts"
import {
  Seo,
  Layout,
  MainWrapper,
  Link,
  OnButton,
  SimpleForm,
  MiddleSpinner,
} from "components"


const LoginPage = () => {
  const theme = useTheme();
  const matches = useMediaQuery("(max-width:900px)")
  // something went wrong
  const [message, setMessage] = useState("")

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const {
    setValue,
    store: { customerAccessToken },
    logout,
  } = useContext(UserContext)

  const [customerLogin, { loading/* , error */ }] = useMutation(CUSTOMER_LOGIN)

  const handleLogin = async ({ email, password }) => {
    const { data } = await customerLogin({
      variables: {
        input: {
          email,
          password,
        },
      },
    })

    setValue(data.customerAccessTokenCreate.customerAccessToken.accessToken)
    navigate("/account")
  }

  // if (loading) return "Submitting..."
  // if (error) return `Submission error! ${error.message}`

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
          <Box padding={!matches ? "0 200px" : "0"}>
            {customerAccessToken ? (
              <Box
                minHeight="450px"
                justifyContent="center"
                alignItems="center"
                display="flex"
              >
                <Typography variant="h1">
                  You're already Logged in! Please log out First:
                </Typography>
                <OnButton onClick={() => logout()}>Logout</OnButton>
              </Box>
            ) : (
              <Paper sx={{ padding: 2 }}>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Typography paddingBottom="30px" variant="h2">
                    Account Login
                  </Typography>
                  <SimpleForm onSubmit={handleSubmit(handleLogin)}>
                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                      sx={{ minWidth: "300px" }}
                    >
                      <TextField
                        fullWidth
                        label="Email"
                        id="email"
                        {...register("email", {
                          required: true,
                          pattern: {
                            value:
                              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Please enter a valid email",
                          },
                        })}
                      />
                      {errors.email?.message && (
                        <div>{errors.email?.message}</div>
                      )}
                      {errors.email?.type === "required" &&
                        "Email is required!"}
                      <TextField
                        fullWidth
                        label="Password"
                        id="Password"
                        {...register("password", {
                          required: true,
                          maxLength: 30,
                        })}
                      />
                      {errors.password?.type === "required" &&
                        "Password is required!"}

                      {message ? <h4>{message}</h4> : ""}
                      {loading ? (
                        <MiddleSpinner />
                      ) : (
                        <OnButton fullWidth type="submit">Sign In</OnButton>
                      )}
                    </Stack>
                  </SimpleForm>

                  <Box mt="20px">
                    <Typography variant="body1" mb="10px">
                      <Link to="/account/forget-password">
                        Forgot your password?
                      </Link>
                    </Typography>
                    <Typography variant="body1">
                      <b>New Customer?</b>{" "}
                      <Link to="/account/register">Sign Up &#8594;</Link>
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            )}
          </Box>
        </MainWrapper>
      </Box>
    </Layout>
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
