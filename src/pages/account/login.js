import React, { useContext } from "react"
import { toast } from 'react-toastify';
import { useTheme, Box, Typography, Divider, TextField, Stack, useMediaQuery } from "@mui/material"
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

  const [customerLogin, { loading, error }] = useMutation(CUSTOMER_LOGIN)

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
    toast.success("Login Success!")
    navigate("/account")
  }

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
              <>
                <Stack spacing={2} direction="row" justifyContent="space-between" sx={{ paddingBottom: "30px" }}>
                  <Typography variant="h2">
                    Account Login
                  </Typography>
                  <OnButton
                    hovercolor="#d2cbcb"
                    background="#34542a"
                    padding="0 10px"
                    color="white"
                    border="0"
                    borderRadius="10px"
                    onClick={() => navigate("/account/register")}
                  >
                    Sign Up
                  </OnButton>
                </Stack>
                <Divider />

                <Box padding="30px" justifyContent="center" display="flex">
                  <Box>
                    <SimpleForm onSubmit={handleSubmit(handleLogin)}>
                      <Stack spacing={2} sx={{ width: "400px" }}>
                        <TextField
                          fullWidth
                          label="Email"
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
                          {...register("password", {
                            required: true,
                            maxLength: 30,
                          })}
                        />
                        {errors.password?.type === "required" &&
                          "Password is required!"}

                        {loading ? (
                          <MiddleSpinner />
                        ) : (
                          <OnButton type="submit">Sign In</OnButton>
                        )}
                      </Stack>
                    </SimpleForm>

                    <Box mt="20px">
                      <Typography variant="body1" mb="10px">
                        <Link to="/account/forget-password">
                          Forgot your password?
                        </Link>
                      </Typography>
                    </Box>
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
