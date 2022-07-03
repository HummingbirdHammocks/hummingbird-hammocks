import React, { createContext, useContext, useState } from "react"
import PropTypes from "prop-types"

export const UICartContext = createContext()
export const useUICartContext = () => useContext(UICartContext)

export const UICartProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false)
  const value = {
    cartOpen,
    setCartOpen,
  }

  return (
    <UICartContext.Provider value={value}>{children}</UICartContext.Provider>
  )
}

UICartProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
