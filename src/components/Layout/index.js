import React, { useEffect } from "react"
import { Box } from "@mui/material"
import { useQuery, gql } from "@apollo/client"
//firebase
import firebaseApp, { logAnalyticsEvent } from '../../utils/firebase/firebase-config';
// stores
import { useAuthStore, useUIStore } from "../../stores";
// components
import Nav from "./Nav"
import Footer from "./Footer"
import GDPRConsent from "./GDPRBanner";
import { AppDrawer } from "./Nav/AppDrawer"
import { CartDrawer } from "./Nav/CartDrawer"
import { TopBanner } from "./TopBanner"

export const Layout = ({ children }) => {
  const { banner, bannerOpen } = useUIStore();
  const { customerAccessToken } = useAuthStore();

  useEffect(() => {
    if (!firebaseApp()) return;
    logAnalyticsEvent('page_view', window.location.pathname);
  }, []);

  const { data, loading/* , error */ } = useQuery(CUSTOMER_NAME, {
    variables: {
      customerAccessToken,
    },
  })

  return (
    <>
      <TopBanner />
      <Nav
        loading={loading}
        data={data}
      />

      <Box
        style={{
          minHeight: (bannerOpen && banner) ? "calc(100vh - 445px)" : "calc(100vh - 395px)",
        }}
      >
        {children}
      </Box>
      <AppDrawer
        data={data}
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
