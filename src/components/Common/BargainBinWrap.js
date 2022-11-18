import { Box, styled } from "@mui/material"

export const BargainBinWrap = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "80px",
  right: "40px",
  background: "#f41901",
  padding: "8px 10px",
  color: theme.palette.white.main,
  fontFamily: theme.typography.fontFamily,
  borderRadius: "10px",
  letterSpacing: "2px",
  zIndex: "999",

  [theme.breakpoints.down("md")]: {
    top: "70px",
    right: "80px",
  },
}))