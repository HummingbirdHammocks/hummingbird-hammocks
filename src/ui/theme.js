import { createTheme } from "@mui/material/styles"
import { grey } from "@mui/material/colors"

const rawTheme = createTheme({
  palette: {
    primary: "#34542a",
    secondary: "#132210",
    white: "#fff",
    dark: "#414042",
    titleBackground: "#1e1e1e99",
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 700,
    fontFamilySecondary: "'Montserrat', sans-serif",
  },
})

const fontHeader = {
  color: rawTheme.palette.text.primary,
  fontWeight: rawTheme.typography.fontWeightMedium,
  fontFamily: rawTheme.typography.fontFamilySecondary,
  textTransform: "uppercase",
}

const theme = {
  ...rawTheme,
  palette: {
    ...rawTheme.palette,
    background: {
      ...rawTheme.palette.background,
      default: rawTheme.palette.common.white,
      placeholder: grey[200],
    },
  },
  typography: {
    ...rawTheme.typography,
    fontHeader,
    h1: {
      ...rawTheme.typography.h1,
      ...fontHeader,
      letterSpacing: 0,
      fontSize: 40,
      fontFamily: rawTheme.typography.fontFamily,
    },
    h2: {
      ...rawTheme.typography.h2,
      ...fontHeader,
      fontSize: 48,
    },
    h3: {
      ...rawTheme.typography.h3,
      ...fontHeader,
      fontSize: 42,
    },
    h4: {
      ...rawTheme.typography.h4,
      ...fontHeader,
      fontSize: 36,
    },
    h5: {
      ...rawTheme.typography.h5,
      fontSize: 20,
      fontWeight: rawTheme.typography.fontWeightLight,
    },
    h6: {
      ...rawTheme.typography.h6,
      ...fontHeader,
      fontSize: 18,
    },
    subtitle1: {
      ...rawTheme.typography.subtitle1,
      fontFamily: rawTheme.typography.fontFamilySecondary,
      fontSize: 18,
      color: rawTheme.palette.white,
    },
    body1: {
      ...rawTheme.typography.body2,
      fontWeight: rawTheme.typography.fontWeightRegular,
      fontSize: 16,
    },
    body2: {
      ...rawTheme.typography.body1,
      fontSize: 14,
    },
  },
}

export default theme
