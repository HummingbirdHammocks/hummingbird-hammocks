import { styled, Button } from "@mui/material"

export const OnButton = styled(Button)(
  ({
    theme,
    background,
    margin,
    color,
    border,
    padding,
    hoverback,
    hovercolor,
  }) => ({
    border: border ? border : "1px solid #000",
    padding: padding ? padding : "8px 30px",
    borderRadius: "40px",
    background: background ? background : "white",
    textTransform: "uppercase",
    color: color ? color : "black",
    textDecoration: "none",
    fontFamily: theme.typography.fontFamily,
    letterSpacing: "1px",
    fontSize: "14px",
    margin: margin ? margin : "0",

    "&:hover": {
      background: hoverback ? hoverback : "black",
      color: hovercolor ? hovercolor : "white",
    },
  })
)
