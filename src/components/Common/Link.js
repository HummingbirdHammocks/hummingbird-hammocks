import React, { forwardRef } from "react"
import MuiLink from "@mui/material/Link"
import { styled } from "@mui/material"
import { Link as GatsbyLink } from "gatsby"

export const Link = forwardRef(function Link(props, ref) {
  return (
    <MuiLink
      sx={{ textDecoration: "none" }}
      component={GatsbyLink}
      ref={ref}
      {...props}
    />
  )
})

export const LinkButton = styled(GatsbyLink)(
  ({ theme, background, margin, borderColor, color }) => ({
    border: borderColor ? `1px solid ${borderColor}` : "1px solid #fff",
    padding: "12px 40px",
    borderRadius: "20px",
    background: background ? background : "black",
    textTransform: "uppercase",
    color: color ? color : "white",
    textDecoration: "none",
    fontFamily: theme.typography.fontFamily,
    letterSpacing: "1px",
    fontSize: "14px",
    margin: margin ? margin : "0",
    transition: "0.3s",

    "&:hover": {
      background: "#34542a",
      color: "#fff",
      border: "1px solid #34542a",
    },
  })
)

export const AnotherLink = styled(MuiLink)(({ theme }) => ({
  fontFamily: theme.typography.fontFamilySecondary,
}))
