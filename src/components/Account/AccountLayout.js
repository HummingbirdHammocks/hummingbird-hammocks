import React, { useContext } from "react"
import { useTheme, Typography, Divider, Box, Stack, Grid, Button, } from "@mui/material"
import { navigate } from "gatsby"

import {
  Seo,
  Layout,
  MainWrapper,
} from ".."

import AccountNav from "./AccoutNav"

import { UserContext } from "contexts"


export const AccountLayout = ({ title, customerInfo, currentPage, children }) => {
  const theme = useTheme();

  const {
    store: { customerAccessToken },
    logout,
  } = useContext(UserContext)

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
          padding: "60px 15px",

          [theme.breakpoints.down("md")]: {
            padding: "40px 0",
          },
        }}>
        <MainWrapper>
          <Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              {customerInfo ? (
                <Stack>
                  <Typography variant="h2">{`${customerInfo.customer.firstName} ${customerInfo.customer.lastName}`}</Typography>
                  <Typography variant="body1">
                    {customerInfo.customer.email}
                  </Typography>
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
              <Grid item xs={12} md={4} lg={2}>
                <AccountNav />
              </Grid>
              <Grid item xs={12} md={8} lg={10}>
                {children}
              </Grid>
            </Grid>
          </Box>
        </MainWrapper>
      </Box >
    </Layout>
  )
}
