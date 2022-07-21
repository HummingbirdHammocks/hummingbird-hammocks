import React, { useState, useContext } from "react"
import { styled, Box, Typography, Divider } from "@mui/material"
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
    navigate("/account")
  }

  // if (loading) return "Submitting..."
  // if (error) return `Submission error! ${error.message}`

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
                    <SimpleForm onSubmit={handleSubmit(handleLogin)}>
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
                      {loading ? (
                        <MiddleSpinner />
                      ) : (
                        <OnButton type="submit">Sign In</OnButton>
                      )}
                    </SimpleForm>

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
