import React, { forwardRef } from "react"
import MuiLink from "@mui/material/Link"
import { styled } from "@mui/material"
import { Link as GatsbyLink } from "gatsby"

export const Link = forwardRef(function Link(props, ref) {
  return <MuiLink component={GatsbyLink} ref={ref} {...props} />
})

export const LinkButton = styled(GatsbyLink)(
  ({ theme, background, margin, color }) => ({
    border: "1px solid #000",
    padding: "12px 20px",
    borderRadius: "20px",
    background: background ? background : "black",
    textTransform: "uppercase",
    color: color ? color : "white",
    textDecoration: "none",
    fontFamily: theme.typography.fontFamily,
    letterSpacing: "1px",
    fontSize: "14px",
    margin: margin ? margin : "0",
  })
)

export const AnotherLink = styled(MuiLink)(({ theme }) => ({
  fontFamily: theme.typography.fontFamilySecondary,
}))
