import React from "react"
import { ThemeProvider } from "@mui/material"

import theme from "./src/ui/theme"
import { UIProvider } from "./src/contexts/ui"

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <UIProvider>{element}</UIProvider>
  </ThemeProvider>
)
