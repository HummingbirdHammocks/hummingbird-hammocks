import React, { useState, useContext } from "react"
import { styled, Typography, Divider, Box } from "@mui/material"
import gql from "graphql-tag"
import { Mutation } from "react-apollo"
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

const LoginSection = styled("section")(({ theme }) => ({
  background: theme.palette.white,
  padding: "60px 15px",
}))

const LoginPage = () => {
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

  const handleCustomerAccessToken = value => {
    setValue(value)
  }

  return (
    <Layout>
      <Seo title="Login" />
      <LoginSection>
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
                  Customer Login
                </Typography>
                <Divider />

                <Box padding="30px" justifyContent="center" display="flex">
                  <Box>
                    <Mutation mutation={CUSTOMER_LOGIN}>
                      {customerLogin => {
                        return (
                          <>
                            <SimpleForm
                              onSubmit={handleSubmit(({ email, password }) => {
                                customerLogin({
                                  variables: {
                                    input: {
                                      email,
                                      password,
                                    },
                                  },
                                })
                                  .then(result => {
                                    if (
                                      result.data.customerAccessTokenCreate
                                        .customerAccessToken === null
                                    ) {
                                      setMessage(
                                        result.data.customerAccessTokenCreate
                                          .customerUserErrors[0].message
                                      )
                                    } else {
                                      handleCustomerAccessToken(
                                        result.data.customerAccessTokenCreate
                                          .customerAccessToken.accessToken
                                      )
                                      navigate("/account")
                                    }
                                  })
                                  .catch(err => {
                                    setMessage("Something went wrong!")
                                  })
                              })}
                            >
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
                              <OnButton type="submit">Sign In</OnButton>
                            </SimpleForm>
                          </>
                        )
                      }}
                    </Mutation>
                    <Box mt="20px">
                      <Typography variant="body1" mb="10px">
                        <Link to="/account/forget-password">
                          Forget Password?
                        </Link>
                      </Typography>
                      <Typography variant="body1">
                        <b>New Customer?</b>{" "}
                        <Link to="/account/register">Sign Up &#8594;</Link>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </MainWrapper>
      </LoginSection>
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
