import React from "react"
import { ThemeProvider } from "@mui/material"
import { ToastContainer } from 'react-toastify';
import fetch from "isomorphic-fetch"
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client"

import theme from "./src/ui/theme"
import "./src/ui/style.css";

import {
  ProductContextProvider,
  NavProvider,
  UICartProvider,
  CartContextProvider,
  RecentViewedContextProvider,
  TopBannerProvider,
} from "contexts"

// context stores
import { AuthProvider } from "stores/useAuthStore";

import { ReviewWidgetScripts } from "utils/judgeMe"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/thumbs"
import "swiper/css/free-mode"

import 'react-toastify/dist/ReactToastify.css';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new createHttpLink({
    uri: `https://hummingbird-hammocks.myshopify.com/api/2022-04/graphql.json`,
    headers: {
      "X-Shopify-Storefront-Access-Token":
        process.env.GATSBY_STOREFRONT_ACCESS_TOKEN,
      Accept: "application/graphql",
    },
    fetch,
  }),
})

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <AuthProvider>
      <ProductContextProvider>
        <RecentViewedContextProvider>
          <CartContextProvider>
            <ThemeProvider theme={theme}>
              <TopBannerProvider>
                <NavProvider>
                  <UICartProvider>{element}</UICartProvider>
                  <ToastContainer
                    pauseOnFocusLoss={false}
                  />
                  <ReviewWidgetScripts />
                </NavProvider>
              </TopBannerProvider>
            </ThemeProvider>
          </CartContextProvider>
        </RecentViewedContextProvider>
      </ProductContextProvider>
    </AuthProvider>
  </ApolloProvider>
)
