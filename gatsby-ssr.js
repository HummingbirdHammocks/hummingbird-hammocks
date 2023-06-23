import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';
//fonts
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
// react query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import fetch from 'isomorphic-fetch';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

import { CartContextProvider, ProductContextProvider } from './src/contexts';
// stores
import { AuthProvider, ProductsProvider, RecentlyViewedProvider, UIProvider } from './src/stores';
import './src/ui/style.css';
import theme from './src/ui/theme';

const rqClient = new QueryClient();

export const client = new ApolloClient({
  ssrMode: true,
  cache: new InMemoryCache(),
  link: new createHttpLink({
    uri: `https://${process.env.GATSBY_SHOPIFY_STORE_URL}/api/${process.env.GATSBY_SHOPIFY_API_VERSION}/graphql.json`,
    headers: {
      'X-Shopify-Storefront-Access-Token': process.env.GATSBY_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      Accept: 'application/graphql'
    },
    fetch
  })
});

export const wrapPageElement = ({ element }) => (
  <>
    <CssBaseline />
    {element}
    <ToastContainer pauseOnFocusLoss={false} />
    <ReactQueryDevtools initialIsOpen={false} />
  </>
);

export const wrapRootElement = ({ element }) => (
  <QueryClientProvider client={rqClient}>
    <ApolloProvider client={client}>
      <AuthProvider>
        <UIProvider>
          <ProductsProvider>
            <RecentlyViewedProvider>
              <ProductContextProvider>
                <CartContextProvider>
                  <ThemeProvider theme={theme}>{element}</ThemeProvider>
                </CartContextProvider>
              </ProductContextProvider>
            </RecentlyViewedProvider>
          </ProductsProvider>
        </UIProvider>
      </AuthProvider>
    </ApolloProvider>
  </QueryClientProvider>
);
