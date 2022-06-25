import React from "react"
import { createContext, useContext, useState } from "react"
import PropTypes from "prop-types"

export const UIContext = createContext()
export const useUIContext = () => useContext(UIContext)

export const UIProvider = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const value = {
    drawerOpen,
    setDrawerOpen,
  }

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

UIProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
