import React, { useContext } from "react"
import { useMediaQuery, Box } from "@mui/material"
import { useQuery, gql } from "@apollo/client"
import { navigate } from "gatsby"

import Nav from "./Nav"
import Footer from "./Footer"
import { AppDrawer } from "./Nav/AppDrawer"
import { CartDrawer } from "./Nav/CartDrawer"
import { TopBanner } from "./TopBanner"
import { UserContext, useTopBannerContext } from "contexts"

export const Layout = ({ children }) => {
  const matches = useMediaQuery("(max-width:1280px)")

  const { banner } = useTopBannerContext()

  const {
    store: { customerAccessToken },
    logout,
  } = useContext(UserContext)

  const { data, loading/* , error */ } = useQuery(CUSTOMER_NAME, {
    variables: {
      customerAccessToken,
    },
  })

  const userLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <>
      <TopBanner />
      <Nav
        customerAccessToken={customerAccessToken}
        loading={loading}
        data={data}
        banner={banner}
      />

      <Box
        style={{
          marginTop: matches ? "0" : "70px",
          minHeight: banner ? "calc(100vh - 500px)" : "calc(100vh - 450px)",
        }}
      >
        {children}
      </Box>
      <AppDrawer
        customerAccessToken={customerAccessToken}
        data={data}
        userLogout={userLogout}
      />
      <CartDrawer />
      <Footer />
    </>
  )
}

const CUSTOMER_NAME = gql`
  query ($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      firstName
      lastName
    }
  }
`
