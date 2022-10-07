import React, { useContext } from "react"
import { useTheme, Typography, Divider, Box, Stack, Grid, Button, } from "@mui/material"
import { navigate } from "gatsby"
import { useQuery, gql } from "@apollo/client"

import {
  Seo,
  Layout,
  MainWrapper,
} from ".."

import AccountNav from "./AccoutNav"

import { UserContext } from "contexts"


export const AccountLayout = ({ title, currentPage, children }) => {
  const theme = useTheme();

  const {
    store: { customerAccessToken },
    logout,
  } = useContext(UserContext)

  const { data } = useQuery(CUSTOMER_INFO, {
    variables: {
      customerAccessToken,
    },
  })

  const userLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <Layout>
      <Seo title={title} />
      <Box
        sx={{
          background: theme.palette.white,
          paddingTop: "20px",
        }}>
        <MainWrapper>
          <Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              {data && data.customer ? (
                <Stack>
                  {(data.customer.firstName || data.customer.lastName) && (
                    < Typography variant="h2">{`${data?.customer.firstName} ${data.customer.lastName}`}</Typography>
                  )}
                  {data.customer.email && (
                    <Typography variant="body1">
                      {data.customer.email}
                    </Typography>
                  )}
                </Stack>
              ) : (
                <Typography variant="h2">Account</Typography>
              )}

              <Button
                onClick={userLogout}
              >
                Logout
              </Button>
            </Stack>

            <Divider />

            <Grid container spacing={4} sx={{ paddingTop: 4, paddingBottom: 4 }}>
              <Grid item xs={12} lg={2}>
                <AccountNav currentPage={currentPage} />
              </Grid>
              <Grid item xs={12} lg={10}>
                {children}
              </Grid>
            </Grid>
          </Box>
        </MainWrapper>
      </Box >
    </Layout >
  )
}

const CUSTOMER_INFO = gql`
  query ($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      email
      firstName
      lastName
    }
  }
`
