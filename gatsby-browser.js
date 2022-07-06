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
import "swiper/css/pagination"
import "swiper/css/thumbs"
import "swiper/css/free-mode"

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
