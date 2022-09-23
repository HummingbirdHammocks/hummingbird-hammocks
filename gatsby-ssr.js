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
import {
  ProductContextProvider,
  NavProvider,
  UICartProvider,
  CartContextProvider,
  UserContextProvider,
  RecentViewedContextProvider,
  TopBannerProvider,
} from "contexts"

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
    <UserContextProvider>
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
                </NavProvider>
              </TopBannerProvider>
            </ThemeProvider>
          </CartContextProvider>
        </RecentViewedContextProvider>
      </ProductContextProvider>
    </UserContextProvider>
  </ApolloProvider>
)
