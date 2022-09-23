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


const RegisterPage = () => {
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

  const [customerRegister/* , { loading, error } */] = useMutation(CUSTOMER_REGISTER)

  const handleRegister = async ({ firstName, lastName, email, password }) => {
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
      setMessage(data.customerCreate.customerUserErrors[0].message)
    } else {
      setMessage(
        "Account Create Successful. You're redirect to Log in page within 3 seconds"
      )
      setTimeout(function () {
        navigate("/account/login")
      }, 3000)
    }
  }

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
                    Create Account
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
                    <SimpleForm onSubmit={handleSubmit(handleRegister)}>
                      <Stack spacing={2} sx={{ width: "400px" }}>
                        <TextField
                          fullWidth
                          label="First Name"
                          {...register("firstName", {
                            required: true,
                          })}
                        />
                        {errors.firstName?.type === "required" &&
                          "First Name is required!"}
                        <TextField
                          fullWidth
                          label="Last Name"
                          {...register("lastName")}
                        />
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

                        {message ? <h4>{message}</h4> : ""}
                        <OnButton type="submit">Create Account</OnButton>
                      </Stack>
                    </SimpleForm>

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
