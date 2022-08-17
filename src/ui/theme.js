import { createTheme } from "@mui/material/styles"
import { grey } from "@mui/material/colors"

const rawTheme = createTheme({
  palette: {
    primary: {
      main: "#34542a",
    },
    secondary: {
      main: "#132210",
    },
    white: {
      main: "#fff",
    },
    dark: {
      main: "#414042",
    },
    darkGreen: {
      main: "#10220e",
    },
    titleBackground: "#1e1e1e99",
    blackTruffle: "#414042",
    blackBackground: "#393939",
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
  color: rawTheme.palette.text.primary.main,
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
      fontSize: 40,
      letterSpacing: 2,
      fontWeight: 500,
      fontFamily: rawTheme.typography.fontFamily,

      [rawTheme.breakpoints.down("md")]: {
        fontSize: 22,
        letterSpacing: 1,
      },
    },
    h2: {
      ...rawTheme.typography.h2,
      ...fontHeader,
      fontSize: 24,
      fontWeight: 400,
      letterSpacing: 2,
      lineHeight: 1.5,
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
      letterSpacing: 1.5,
      fontWeight: 400,
      textTransform: "uppercase",
    },
    h6: {
      ...rawTheme.typography.h6,
      ...fontHeader,
      fontSize: 18,
      letterSpacing: 1.5,
      fontWeight: 400,
      textTransform: "uppercase",
    },
    navMenu: {
      ...rawTheme.typography.navMenu,
      fontSize: 14,
      letterSpacing: 1,
      fontWeight: 500,
      fontFamily: rawTheme.typography.fontFamily,
      color: rawTheme.palette.blackTruffle,
      textTransform: "uppercase",
    },
    subtitle1: {
      ...rawTheme.typography.subtitle1,
      fontFamily: rawTheme.typography.fontFamilySecondary,
      fontSize: 20,
      letterSpacing: 2,
      lineHeight: 1.6,
      color: rawTheme.palette.white.main,
      fontWeight: 400,
      [rawTheme.breakpoints.down("md")]: {
        fontSize: 14,
        letterSpacing: 1,
      },
    },
    subtitle2: {
      ...rawTheme.typography.body1,
      fontSize: 15,
      textTransform: "uppercase",
      letterSpacing: 2,
    },
    subtitle3: {
      ...rawTheme.typography.body1,
      fontFamily: rawTheme.typography.fontFamilySecondary,
      fontSize: 15,
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    body1: {
      ...rawTheme.typography.body2,
      fontSize: 17,
      fontWeight: 300,
      letterSpacing: 1,
      color: rawTheme.palette.dark,
      fontFamily: rawTheme.typography.fontFamilySecondary,
    },
    navUser: {
      ...rawTheme.typography.navMenu,
      fontSize: 13,
      letterSpacing: 1,
      fontWeight: 500,
      fontFamily: rawTheme.typography.fontFamily,
      color: rawTheme.palette.dark,
      textTransform: "uppercase",
    },

    collectionName: {
      ...rawTheme.typography.navMenu,
      fontSize: 12,
      letterSpacing: 1,
      fontWeight: 400,
      fontFamily: rawTheme.typography.fontFamily,
      color: rawTheme.palette.dark,
      textTransform: "capitalize",
    },

    productDetails: {
      color: rawTheme.palette.primary,
      textTransform: "capitalize!important",
      fontSize: 17,
      fontFamily: rawTheme.typography.fontFamilySecondary,
    },

    footerMenu: {
      ...rawTheme.typography.navMenu,
      fontSize: 14,
      letterSpacing: 1,
      fontWeight: 500,
      textTransform: "capitalize",
      fontFamily: rawTheme.typography.fontFamilySecondary,
      color: rawTheme.palette.white,
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  },
}

export default theme
