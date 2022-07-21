import React, { useState, useContext } from "react"
import { styled, Typography, Divider, Box } from "@mui/material"
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

const RegisterSection = styled("section")(({ theme }) => ({
  background: theme.palette.white,
  padding: "60px 15px",
}))

const RegisterPage = () => {
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

  const [customerRegister, { loading, error }] = useMutation(CUSTOMER_REGISTER)

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
      <RegisterSection>
        <MainWrapper>
          <Box padding="0 200px">
            {customerAccessToken ? (
              <Box
                minHeight="450px"
                justifyContent="center"
                alignItems="center"
                display="flex"
              >
                <Typography variant="h1">
                  You already Logged in! Please Logout First:
                </Typography>
                <OnButton onClick={() => logout()}>Logout</OnButton>
              </Box>
            ) : (
              <>
                <Typography paddingBottom="30px" variant="h2">
                  Create Account
                </Typography>
                <Divider />

                <Box padding="30px" justifyContent="center" display="flex">
                  <Box>
                    <SimpleForm onSubmit={handleSubmit(handleRegister)}>
                      <label for="firstName">First Name</label>
                      <input
                        {...register("firstName", {
                          required: true,
                        })}
                      />
                      {errors.firstName?.type === "required" &&
                        "First Name is required!"}
                      <label for="lastName">Last Name</label>
                      <input {...register("lastName")} />
                      <label for="email">Email</label>
                      <input
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
                      <label for="password">Password</label>
                      <input
                        {...register("password", {
                          required: true,
                          maxLength: 30,
                        })}
                      />
                      {errors.password?.type === "required" &&
                        "Password is required!"}

                      {message ? <h4>{message}</h4> : ""}
                      <OnButton type="submit">Sign Up</OnButton>
                    </SimpleForm>

                    <Box mt="20px">
                      <Typography variant="body1">
                        <b>Already Member?</b>{" "}
                        <Link to="/account/login">Sign In &#8594;</Link>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </MainWrapper>
      </RegisterSection>
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
