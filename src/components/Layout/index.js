import React, { useEffect } from "react"
import { useLocation } from '@reach/router';
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

  const location = useLocation();

  useEffect(() => {
    if (!firebaseApp()) return;
    logAnalyticsEvent('page_view', location.pathname);
    handleAffiliateIdCookie(location);
  }, [location]);

  const { data, loading/* , error */ } = useQuery(CUSTOMER_NAME, {
    variables: {
      customerAccessToken,
    },
  })

  const handleAffiliateIdCookie = (loc) => {
    if (!loc || !loc.search) return;
    const params = new URLSearchParams(loc.search);
    const affiliateId = params.get("p");
    if (affiliateId) {
      var date = new Date()
      date.setTime(date.getTime() + 90 * 24 * 60 * 60 * 1000);

      document.cookie = `p=${affiliateId}; path=/; expires=${date.toGMTString()};`;
    }
  }


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
