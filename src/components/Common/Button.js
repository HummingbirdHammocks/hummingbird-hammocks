import { styled, Button } from "@mui/material"

export const OnButton = styled(Button)(
  ({ theme, background, margin, color }) => ({
    border: "1px solid #000",
    padding: "12px 20px",
    borderRadius: "20px",
    background: background ? background : "white",
    textTransform: "uppercase",
    color: color ? color : "black",
    textDecoration: "none",
    fontFamily: theme.typography.fontFamily,
    letterSpacing: "1px",
    fontSize: "14px",
    margin: margin ? margin : "0",

    "&:hover": {
      background: "black",
      color: "white",
    },
  })
)
