import React, { forwardRef } from "react"
import MuiLink from "@mui/material/Link"
import { Link as GatsbyLink } from "gatsby"

export const Link = forwardRef(function Link(props, ref) {
  return <MuiLink component={GatsbyLink} ref={ref} {...props} />
})
