import React, { useState, useContext } from "react"
import { useTheme, Typography, Divider, Box, Stack, TextField, useMediaQuery } from "@mui/material"
import { useMutation, gql } from "@apollo/client"
import { navigate } from "gatsby"
import { useForm } from "react-hook-form"

import { UserContext } from "contexts"
import {
  Seo,
  Layout,
  MainWrapper,
  Link,
  OnButton,
  SimpleForm,
} from "components"


const ForgetPage = () => {
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
      setMessage(
        "We've sent you an email with a link to update your password. You're redirect to Log in page within 3 seconds"
      )

      setTimeout(function () {
        navigate("/account/login")
      }, 5000)
    } else {
      setMessage("Something went wrong!")
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
                  <Typography variant="body1">
                    <b>Remembered Your Password?</b>{" "}
                    <Link to="/account/login">Login &#8594;</Link>
                  </Typography>
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

                      {message ? <h4>{message}</h4> : ""}
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
