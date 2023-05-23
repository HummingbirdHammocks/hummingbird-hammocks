import React from "react"
import { ThemeProvider, CssBaseline } from "@mui/material"
import { ToastContainer } from 'react-toastify';
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client"
import fetch from "isomorphic-fetch"
// react query
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
// stores
import { AuthProvider, UIProvider, ProductsProvider, RecentlyViewedProvider } from "stores";
import {
  ProductContextProvider,
  CartContextProvider,
} from "contexts"
// theme
import theme from "./src/ui/theme"
import "./src/ui/style.css";
//fonts
import "@fontsource/poppins/400.css"
import "@fontsource/poppins/600.css"
import "@fontsource/poppins/700.css"
import "@fontsource/montserrat/400.css"
import "@fontsource/montserrat/500.css"
import "@fontsource/montserrat/700.css"
// Judge.me
import { ReviewWidgetScripts } from "utils/judgeMe"
// Help Widget
import { ChatWidget } from "utils/quickchatai"
// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/thumbs"
import "swiper/css/free-mode"

import 'react-toastify/dist/ReactToastify.css';

const rqClient = new QueryClient();

export const client = new ApolloClient({
  ssrMode: true,
  cache: new InMemoryCache(),
  link: new createHttpLink({
    uri: `https://${process.env.GATSBY_SHOPIFY_STORE_URL}/api/${process.env.GATSBY_SHOPIFY_API_VERSION}/graphql.json`,
    headers: {
      "X-Shopify-Storefront-Access-Token":
        process.env.GATSBY_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      Accept: "application/graphql",
    },
    fetch,
  }),
})

export const wrapRootElement = ({ element }) => (
  <QueryClientProvider client={rqClient}>
    <ApolloProvider client={client}>
      <AuthProvider>
        <UIProvider>
          <ProductsProvider>
            <RecentlyViewedProvider>
              <ProductContextProvider>
                <CartContextProvider>
                  <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {element}
                    <ToastContainer
                      pauseOnFocusLoss={false}
                    />
                    <ReactQueryDevtools initialIsOpen={false} />
                    <ReviewWidgetScripts />
                    <ChatWidget />
                  </ThemeProvider>
                </CartContextProvider>
              </ProductContextProvider>
            </RecentlyViewedProvider>
          </ProductsProvider>
        </UIProvider>
      </AuthProvider>
    </ApolloProvider>
  </QueryClientProvider >
)
