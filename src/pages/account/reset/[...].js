import React, { useState, useContext } from "react"
import { useTheme } from '@mui/material/styles';
import { Typography, Divider, Box, useMediaQuery } from "@mui/material"
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


const ResetPage = ({ params }) => {
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
    setValue,
    logout,
  } = useContext(UserContext)

  const resetUrl = `https://hummingbirdhammocks.com/account/reset/${params["*"]}`

  const handleCustomerAccessToken = value => {
    setValue(value)
  }

  const [resetPassword, { loading, error }] = useMutation(
    CUSTOMER_PASSWORD_RESET
  )

  const handlePasswordReset = async ({ password }) => {
    const { data } = await resetPassword({
      variables: {
        password,
        resetUrl,
      },
    })

    if (data?.customerResetByUrl) {
      handleCustomerAccessToken(
        data.customerResetByUrl.customerAccessToken.accessToken
      )
      setMessage("Password Reset Done! You'll logged in automatically in 3s...")

      setTimeout(function () {
        navigate("/account/")
      }, 3000)
    } else {
      setMessage("Somthing went wrong!")
    }
  }

  return (
    <Layout>
      <Seo title="Password Reset" />
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
                  You"re already Logged in! Please Logout First:
                </Typography>
                <OnButton onClick={() => logout()}>Logout</OnButton>
              </Box>
            ) : (
              <>
                <Typography paddingBottom="30px" variant="h2">
                  Password Reset
                </Typography>
                <Divider />

                <Box padding="30px" justifyContent="center" display="flex">
                  <Box>
                    <SimpleForm onSubmit={handleSubmit(handlePasswordReset)}>
                      <label htmlFor="password">Enter New Password</label>
                      <input
                        {...register("password", {
                          required: true,
                          maxLength: 30,
                        })}
                      />
                      {message ? <h4>{message}</h4> : ""}
                      <OnButton type="submit">Submit</OnButton>
                    </SimpleForm>

                    <Box mt="20px">
                      <Typography variant="body1">
                        <b>Remembered Your Login?</b>{" "}
                        <Link to="/account/register">Sign In &#8594;</Link>
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
