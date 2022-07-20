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

const ForgetSection = styled("section")(({ theme }) => ({
  background: theme.palette.white,
  padding: "60px 15px",
}))

const ForgetPage = () => {
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

  return (
    <Layout>
      <Seo title="Forger Password" />
      <ForgetSection>
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
                  You"re already Logged in! Please Logout First:
                </Typography>
                <OnButton onClick={() => logout()}>Logout</OnButton>
              </Box>
            ) : (
              <>
                <Typography paddingBottom="30px" variant="h2">
                  Forget Password
                </Typography>
                <Divider />

                <Box padding="30px" justifyContent="center" display="flex">
                  <Box>
                    <Mutation mutation={CUSTOMER_PASSWORD_FORGET}>
                      {customerRecover => {
                        return (
                          <>
                            <Typography>Reset Password</Typography>
                            <SimpleForm
                              onSubmit={handleSubmit(({ email }) => {
                                customerRecover({
                                  variables: {
                                    email,
                                  },
                                })
                                  .then(result => {
                                    console.log(result)
                                    setMessage(
                                      "We've sent you an email with a link to update your password. You're redirect to Log in page within 5 seconds"
                                    )
                                    setTimeout(function () {
                                      navigate("/account/login")
                                    }, 5000)
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

                              {message ? <h4>{message}</h4> : ""}
                              <Typography>
                                We will send you an email to reset your
                                password.
                              </Typography>
                              <OnButton type="submit">Submit</OnButton>
                            </SimpleForm>
                          </>
                        )
                      }}
                    </Mutation>
                    <Box mt="20px">
                      <Typography variant="body1">
                        <b>Already Customer?</b>{" "}
                        <Link to="/account/register">Sign In &#8594;</Link>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </MainWrapper>
      </ForgetSection>
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
