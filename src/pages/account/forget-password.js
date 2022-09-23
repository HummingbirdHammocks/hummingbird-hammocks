import React, { useContext } from "react"
import { toast } from 'react-toastify';
import { useTheme, Typography, Divider, Box, Stack, TextField, useMediaQuery } from "@mui/material"
import { useMutation, gql } from "@apollo/client"
import { navigate } from "gatsby"
import { useForm } from "react-hook-form"

import { UserContext } from "contexts"
import {
  Seo,
  Layout,
  MainWrapper,
  OnButton,
  SimpleForm,
} from "components"


const ForgetPage = () => {
  const theme = useTheme();
  const matches = useMediaQuery("(max-width:900px)")

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const {
    store: { customerAccessToken },
    logout,
  } = useContext(UserContext)

  const [forgetPassword, { /* loading, */ error }] = useMutation(
    CUSTOMER_PASSWORD_FORGET
  )

  const handleForgetPassword = async ({ email }) => {
    /* const { data } = */ await forgetPassword({
    variables: {
      email,
    },
  })

    if (!error) {
      toast.success("Password Reset Email Sent! You'll be redirected to the login page in 3s...", {
        autoClose: 3000,
        hideProgressBar: false,
      })

      setTimeout(function () {
        navigate("/account/login")
      }, 5000)
    } else {
      console.log(error)
      toast.error("Oops! Something went wrong. Please try again.")
    }
  }

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
                <OnButton onClick={() => logout()}>Logout</OnButton>
              </Box>
            ) : (
              <>
                <Stack spacing={2} direction="row" justifyContent="space-between" sx={{ paddingBottom: "30px" }}>
                  <Typography variant="h2">
                    Password Recovery
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
                  <SimpleForm onSubmit={handleSubmit(handleForgetPassword)}>
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
                      <Typography>
                        We will send you an email to reset your password.
                      </Typography>
                      <OnButton type="submit">Submit</OnButton>
                    </Stack>
                  </SimpleForm>

                </Box>
              </>
            )}
          </Box>
        </MainWrapper>
      </Box>
    </Layout>
  )
}

export default ForgetPage

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
