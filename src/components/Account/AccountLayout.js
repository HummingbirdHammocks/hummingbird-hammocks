import React, { useContext } from "react"
import { useTheme, Typography, Divider, Box, Stack, Grid, useMediaQuery } from "@mui/material"
import { navigate } from "gatsby"

import {
  Seo,
  Layout,
  MainWrapper,
  OnButton,
} from ".."

import { UserContext } from "contexts"


export const AccountLayout = ({ title, customerInfo, currentPage, children }) => {
  const theme = useTheme();
  const matches = useMediaQuery("(max-width:900px)")

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

              <OnButton
                hovercolor="#d2cbcb"
                background="#34542a"
                color="white"
                border="0"
                borderRadius="10px"
                onClick={userLogout}
              >
                Logout
              </OnButton>
            </Stack>

            <Divider />

            <Grid container spacing={2} sx={{ paddingTop: 4, paddingBottom: 4 }}>
              <Grid item xs={12} lg={2}>
                <Typography variant="h5">Sidebar</Typography>
              </Grid>

              <Grid item xs={12} lg={10}>
                {children}
              </Grid>
            </Grid>
          </Box>
        </MainWrapper>
      </Box >
    </Layout>
  )
}
