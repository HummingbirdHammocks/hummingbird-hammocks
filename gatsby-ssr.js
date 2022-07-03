import React from "react"
import { ThemeProvider } from "@mui/material"

import theme from "./src/ui/theme"
import {
  ProductContextProvider,
  NavProvider,
  UICartProvider,
  CartContextProvider,
} from "contexts"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"

export const wrapRootElement = ({ element }) => (
  <ProductContextProvider>
    <CartContextProvider>
      <ThemeProvider theme={theme}>
        <NavProvider>
          <UICartProvider>{element}</UICartProvider>{" "}
        </NavProvider>
      </ThemeProvider>
    </CartContextProvider>
  </ProductContextProvider>
)
