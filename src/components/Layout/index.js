import React, { useContext } from "react"
import { useMediaQuery } from "@mui/material"
import { useQuery, gql } from "@apollo/client"
import { navigate } from "gatsby"

import Nav from "./Nav"
import Footer from "./Footer"
import { AppDrawer } from "./Nav/AppDrawer"
import { CartDrawer } from "./Nav/CartDrawer"
import { UserContext } from "contexts"

export const Layout = ({ children }) => {
  const matches = useMediaQuery(theme => theme.breakpoints.up("sm"))

  const {
    store: { customerAccessToken },
    logout,
  } = useContext(UserContext)

  const { data, loading, error } = useQuery(CUSTOMER_NAME, {
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
      <Nav
        customerAccessToken={customerAccessToken}
        loading={loading}
        data={data}
      />
      <AppDrawer
        customerAccessToken={customerAccessToken}
        data={data}
        userLogout={userLogout}
      />
      <CartDrawer />
      <div style={{ marginTop: matches ? "64px" : "56px" }}>{children}</div>
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
