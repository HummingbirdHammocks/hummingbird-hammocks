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

const ResetSection = styled("section")(({ theme }) => ({
  background: theme.palette.white,
  padding: "60px 15px",
}))

const ResetPage = ({ params }) => {
  // something went wrong
  const [message, setMessage] = useState("")

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const {
    store: { customerAccessToken },
    setValue,
    logout,
  } = useContext(UserContext)

  const resetUrl = `https://hummingbirdhammocks.com/account/reset/${params["*"]}`

  const handleCustomerAccessToken = value => {
    setValue(value)
  }

  return (
    <Layout>
      <Seo title="Forger Password" />
      <ResetSection>
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
                  Reset Account Password
                </Typography>
                <Divider />

                <Box padding="30px" justifyContent="center" display="flex">
                  <Box>
                    <Mutation mutation={CUSTOMER_PASSWORD_RESET}>
                      {customerRecover => {
                        return (
                          <>
                            <SimpleForm
                              onSubmit={handleSubmit(({ password }) => {
                                customerRecover({
                                  variables: {
                                    password,
                                    resetUrl,
                                  },
                                })
                                  .then(result => {
                                    console.log(result)
                                    setMessage(
                                      "Password Reset Done! You'll logged in automatically in 3s..."
                                    )
                                    setTimeout(function () {
                                      handleCustomerAccessToken(
                                        result.data.customerResetByUrl
                                          .customerAccessToken.accessToken
                                      )
                                      navigate("/account/")
                                    }, 3000)
                                  })
                                  .catch(err => {
                                    setMessage("Something went wrong!")
                                  })
                              })}
                            >
                              <label htmlFor="password">
                                Enter New Password
                              </label>
                              <input
                                {...register("password", {
                                  required: true,
                                  maxLength: 30,
                                })}
                              />
                              {message ? <h4>{message}</h4> : ""}
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
      </ResetSection>
    </Layout>
  )
}

export default ResetPage

const CUSTOMER_PASSWORD_RESET = gql`
  mutation customerResetByUrl($password: String!, $resetUrl: URL!) {
    customerResetByUrl(password: $password, resetUrl: $resetUrl) {
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
