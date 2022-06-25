import React from "react"
import PropTypes from "prop-types"
import { Container } from "@mui/material"

export const MainWrapper = ({ children }) => (
  <Container maxWidth="xl">{children}</Container>
)

MainWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}
