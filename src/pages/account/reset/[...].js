import React, { useContext } from "react"
import { toast } from "react-toastify"
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


const ResetPage = ({ params }) => {
  const theme = useTheme();
  const matches = useMediaQuery("(max-width:900px)")

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
      toast.success("Password Reset Succesfully! You'll logged in automatically in 3s...", {
        autoClose: 3000,
        hideProgressBar: false,
      })

      setTimeout(function () {
        navigate("/account/")
      }, 3000)
    } else {
      toast.error("Oops, something went wrong!")
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
                <Stack spacing={2} direction="row" justifyContent="space-between" sx={{ paddingBottom: "30px" }}>
                  <Typography variant="h2">
                    Password Reset
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
                    <SimpleForm onSubmit={handleSubmit(handlePasswordReset)}>
                      <Stack spacing={2} sx={{ width: "400px" }}>
                        <TextField
                          fullWidth
                          label="New Password"
                          {...register("password", {
                            required: true,
                            maxLength: 30,
                          })}
                        />
                        <OnButton type="submit">Change Password</OnButton>
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
