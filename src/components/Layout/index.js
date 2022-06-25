import React from "react"

import Nav from "./Nav"
import { AppDrawer } from "./Nav/Drawer"

export const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <AppDrawer />
      <div style={{ marginTop: "64px" }}>{children}</div>
    </>
  )
}
