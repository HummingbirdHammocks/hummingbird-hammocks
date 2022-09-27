import { styled, Button } from "@mui/material"

export const OnButton = styled(Button)(
  ({
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
    color: color ? color : "black",
    margin: margin ? margin : "0",

    "&:hover": {
      background: hoverback ? hoverback : "#34542a",
      color: hovercolor ? hovercolor : "white",
      border: hoverborder ? hoverborder : "",
    },
  })
)
