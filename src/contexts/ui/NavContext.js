import React, { createContext, useContext, useState } from "react"
import PropTypes from "prop-types"

export const NavContext = createContext()
export const useNavContext = () => useContext(NavContext)

export const NavProvider = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const value = {
    drawerOpen,
    setDrawerOpen,
  }

  return <NavContext.Provider value={value}>{children}</NavContext.Provider>
}

NavProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
