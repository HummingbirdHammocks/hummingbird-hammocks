import { styled } from "@mui/material"

export const SimpleForm = styled("form")(({ theme }) => ({
  "& label": {
    letterSpacing: "1px",
    fontSize: "14px",
    fontFamily: theme.typography.fontFamily,
  },

  "& input": {
    width: "100%",
    padding: "10px 0",
    marginBottom: "20px",
  },

  "& select": {
    width: "100%",
    padding: "10px 0",
    marginBottom: "20px",
  },
}))
