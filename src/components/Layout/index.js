import React, { useContext, useEffect } from "react"
import { Box } from "@mui/material"
import { useQuery, gql } from "@apollo/client"
import { navigate } from "gatsby"
//firebase
import firebaseApp, { logAnalyticsEvent } from '../../utils/firebase/firebase-config';

import Nav from "./Nav"
import Footer from "./Footer"
import GDPRConsent from "./GDPRBanner";
import { AppDrawer } from "./Nav/AppDrawer"
import { CartDrawer } from "./Nav/CartDrawer"
import { TopBanner } from "./TopBanner"
import { UserContext, useTopBannerContext } from "contexts"

export const Layout = ({ children }) => {
  const { banner, bannerOpen } = useTopBannerContext()

  const {
    store: { customerAccessToken },
    logout,
  } = useContext(UserContext)

  useEffect(() => {
    if (!firebaseApp()) return;
    logAnalyticsEvent('page_view', window.location.pathname);
  }, []);

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
        banner={(bannerOpen && banner)}
      />

      <Box
        style={{
          minHeight: (bannerOpen && banner) ? "calc(100vh - 445px)" : "calc(100vh - 395px)",
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
      <GDPRConsent />
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
