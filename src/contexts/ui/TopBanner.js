import React, { createContext, useContext, useState } from "react"
import PropTypes from "prop-types"

export const TopBannerContext = createContext()
export const useTopBannerContext = () => useContext(TopBannerContext)

export const TopBannerProvider = ({ children }) => {
  const [bannerOpen, setBannerOpen] = useState(true)
  const [banner, setBanner] = useState(null)
  const value = {
    bannerOpen,
    setBannerOpen,
    banner,
    setBanner,
  }

  return (
    <TopBannerContext.Provider value={value}>
      {children}
    </TopBannerContext.Provider>
  )
}

TopBannerProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
