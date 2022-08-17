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
    hoverborder,
    borderRadius,
  }) => ({
    border: border ? border : "1px solid #000",
    padding: padding ? padding : "8px 30px",
    borderRadius: borderRadius ? borderRadius : "40px",
    background: background ? background : "white",
    textTransform: "uppercase",
    color: color ? color : "black",
    textDecoration: "none",
    fontFamily: theme.typography.fontFamily,
    letterSpacing: "1px",
    fontSize: "14px",
    margin: margin ? margin : "0",
    transition: "0.3s",

    "&:hover": {
      background: hoverback ? hoverback : "#34542a",
      color: hovercolor ? hovercolor : "white",
      border: hoverborder ? hoverborder : "",
    },
  })
)
