import React, { useEffect, useState, useContext, useCallback } from "react"
import { useLocation } from '@reach/router';
import { Box } from "@mui/material"
import { useQuery, gql } from "@apollo/client"
//firebase
import firebaseApp, { logAnalyticsEvent } from '../../utils/firebase/firebase-config';
// stores
import { useAuthStore, useUIStore } from "../../stores";
import { CartContext } from "contexts"
// components
import Nav from "./Nav"
import Footer from "./Footer"
import GDPRConsent from "./GDPRBanner";
import { AppDrawer } from "./Nav/AppDrawer"
import { CartDrawer } from "./Nav/CartDrawer"
import { TopBanner } from "./TopBanner"
// hooks
import { useDiscountCode } from "hooks"

export const Layout = ({ children }) => {
  const [code, setCode] = useState(null);

  const { banner, bannerOpen } = useUIStore();
  const { customerAccessToken } = useAuthStore();

  const { updateAttributes } = useContext(CartContext)
  const registeredCode = useDiscountCode(code);

  const location = useLocation();

  const handleAffiliateIdCookie = useCallback(async () => {
    if (!location || !location.search) return;
    const params = new URLSearchParams(location.search);
    const affiliateId = params.get("p");
    if (affiliateId) {
      var date = new Date()
      date.setTime(date.getTime() + 90 * 24 * 60 * 60 * 1000);

      document.cookie = `p=${affiliateId}; path=/; expires=${date.toGMTString()};`;
      await updateAttributes({ customAttributes: { key: "affID", value: affiliateId } })
    }
  }, [location, updateAttributes])

  const handleDiscountCode = useCallback(async () => {
    let pathCode;
    if (location && location.search) {
      const params = new URLSearchParams(location.search);
      pathCode = params.get("discount_code");
    };

    const localStoredCode = localStorage.getItem('discount_code');

    if (pathCode) {
      localStorage.setItem('discount_code', pathCode);
      setCode(pathCode);
      return;
    } else if (localStoredCode) {
      setCode(localStoredCode);
      return;
    }
  }, [location])

  useEffect(() => {
    if (!firebaseApp()) return;
    logAnalyticsEvent('page_view', location.pathname);

    handleAffiliateIdCookie();
    if (code !== registeredCode) {
      handleDiscountCode();
    }

    if (!window || typeof window == 'undefined' || !window.jdgmCacheServer) return;
    const jdgmCacheServer = window.jdgmCacheServer;
    jdgmCacheServer.reloadAll();

  }, [location, code, registeredCode, handleAffiliateIdCookie, handleDiscountCode]);

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
