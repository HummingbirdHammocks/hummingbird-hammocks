import React from "react"
import {
  AppBar,
  List,
  Toolbar,
  Typography,
  useMediaQuery,
  IconButton,
} from "@mui/material"
import { useTheme } from "@mui/styles"
import { StaticImage } from "gatsby-plugin-image"
import AccountBoxIcon from "@mui/icons-material/AccountBox"
import SearchIcon from "@mui/icons-material/Search"
import LocalMallIcon from "@mui/icons-material/LocalMall"
import MenuIcon from "@mui/icons-material/Menu"

import { MainWrapper, Link } from "components"
import { useUIContext } from "contexts"

function Nav() {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down("md"))

  return <>{matches ? <AppbarMobile /> : <AppbarDesktop />}</>
}

export default Nav

const AppbarDesktop = () => {
  return (
    <AppBar sx={{ zIndex: "1201" }} color="white">
      <MainWrapper>
        <Toolbar>
          <Link to="/">
            <StaticImage
              src="../../../assets/images/logo.png"
              alt="Hummingbird Hammocks"
              height={45}
              placeholder="blurred"
            />
          </Link>
          <List sx={{ ml: "auto" }}>
            <Link
              variant="button"
              underline="hover"
              sx={{ my: 1, mx: 1.5 }}
              to="/"
            >
              Hammocks
            </Link>
            <Link
              underline="hover"
              variant="button"
              sx={{ my: 1, mx: 1.5 }}
              to="/"
            >
              Hammocks
            </Link>
            <Link
              underline="hover"
              variant="button"
              sx={{ my: 1, mx: 1.5 }}
              to="/"
            >
              Hammocks
            </Link>
          </List>
          <IconButton sx={{ ml: "auto" }}>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AccountBoxIcon />
          </IconButton>
          <IconButton>
            <LocalMallIcon />
          </IconButton>
        </Toolbar>
      </MainWrapper>
    </AppBar>
  )
}

const AppbarMobile = () => {
  const { drawerOpen, setDrawerOpen } = useUIContext()

  return (
    <AppBar sx={{ zIndex: "1201" }}>
      <MainWrapper>
        <Toolbar>
          <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
            <MenuIcon color="white" />
          </IconButton>

          <Typography>Menu</Typography>
          <Link sx={{ ml: "auto" }} to="/">
            <StaticImage
              src="../../../assets/images/icon.png"
              alt="Hummingbird Hammocks"
              height={45}
              placeholder="blurred"
            />
          </Link>

          <IconButton sx={{ ml: "auto" }}>
            <SearchIcon color="white" />
          </IconButton>
          <IconButton>
            <LocalMallIcon color="white" />
          </IconButton>
        </Toolbar>
      </MainWrapper>
    </AppBar>
  )
}
