import React from "react"
import { useMediaQuery } from "@mui/material"

import Nav from "./Nav"
import Footer from "./Footer"
import { AppDrawer } from "./Nav/AppDrawer"
import { CartDrawer } from "./Nav/CartDrawer"

export const Layout = ({ children }) => {
  const matches = useMediaQuery(theme => theme.breakpoints.up("sm"))

  return (
    <>
      <Nav />
      <AppDrawer />
      <CartDrawer />
      <div style={{ marginTop: matches ? "64px" : "56px" }}>{children}</div>
      <Footer />
    </>
  )
}
