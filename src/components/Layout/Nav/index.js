import React, { useState, useEffect, useRef, useContext } from "react"
import {
  AppBar,
  List,
  Toolbar,
  Typography,
  useMediaQuery,
  IconButton,
  styled,
  Button,
  CircularProgress,
} from "@mui/material"
import { StaticImage } from "gatsby-plugin-image"
import MenuIcon from "@mui/icons-material/Menu"
import { ShoppingBasket, AccountCircle } from "@mui/icons-material"
import { Query } from "react-apollo"
import gql from "graphql-tag"

import NavMenuItems from "./MenuItems"
import { MainWrapper, Link } from "components"
import { useNavContext, useUICartContext, UserContext } from "contexts"

const Wrapper = styled("ul")(() => ({
  position: "absolute",
  minWidth: "260px",
  zIndex: 1201,
  background: "#fff",
  listStyle: "none",
  padding: "7px 0",
  borderRadius: "15px",
  border: "1px solid #d3cece",
  boxShadow:
    "0 10px 15px -3px rgba(46, 41, 51, 0.08), 0 4px 6px -2px rgba(71, 63, 79, 0.16)",
}))

const ListBox = styled("li")(() => ({
  padding: "15px 10px",

  "& .arrow": {
    "&:after": {
      content: `""`,
      display: "inline-block",
      marginLeft: "0.28em",
      verticalAlign: "0.09em",
      borderTop: "0.42em solid",
      borderRight: "0.32em solid transparent",
      borderLeft: "0.32em solid transparent",
    },
  },
}))

function Nav() {
  const matches = useMediaQuery("(max-width:1100px)")

  return <>{matches ? <AppbarMobile /> : <AppbarDesktop />}</>
}

export default Nav

const AppbarDesktop = () => {
  const { cartOpen, setCartOpen } = useUICartContext()
  const {
    store: { customerAccessToken },
  } = useContext(UserContext)

  return (
    <AppBar sx={{ borderBottom: "2px solid #414042" }} color="white">
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
          <List className="menus" sx={{ display: "flex" }}>
            {NavMenuItems.map((menu, index) => {
              const depthLevel = 0
              return (
                <MenuItems items={menu} key={index} depthLevel={depthLevel} />
              )
            })}
          </List>
          <IconButton sx={{ ml: "auto" }}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M16.041 15.856c-0.034 0.026-0.067 0.055-0.099 0.087s-0.060 0.064-0.087 0.099c-1.258 1.213-2.969 1.958-4.855 1.958-1.933 0-3.682-0.782-4.95-2.050s-2.050-3.017-2.050-4.95 0.782-3.682 2.050-4.95 3.017-2.050 4.95-2.050 3.682 0.782 4.95 2.050 2.050 3.017 2.050 4.95c0 1.886-0.745 3.597-1.959 4.856zM21.707 20.293l-3.675-3.675c1.231-1.54 1.968-3.493 1.968-5.618 0-2.485-1.008-4.736-2.636-6.364s-3.879-2.636-6.364-2.636-4.736 1.008-6.364 2.636-2.636 3.879-2.636 6.364 1.008 4.736 2.636 6.364 3.879 2.636 6.364 2.636c2.125 0 4.078-0.737 5.618-1.968l3.675 3.675c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414z"></path>
            </svg>
          </IconButton>

          {customerAccessToken ? (
            <Button
              sx={{ m: "0 20px" }}
              variant="outlined"
              startIcon={<AccountCircle />}
            >
              <Link to="/account">
                <Query
                  query={CUSTOMER_NAME}
                  variables={{
                    customerAccessToken,
                  }}
                >
                  {({ loading, error, data }) => {
                    if (loading) return <CircularProgress size={10} />
                    return (
                      <Typography variant="subtitle3">
                        {data?.customer?.firstName}
                      </Typography>
                    )
                  }}
                </Query>
              </Link>
            </Button>
          ) : (
            <Link to="/account/login">
              <AccountCircle sx={{ m: "4px 20px 0 20px" }} />
            </Link>
          )}

          <IconButton onClick={() => setCartOpen(!cartOpen)}>
            <ShoppingBasket />
          </IconButton>
        </Toolbar>
      </MainWrapper>
    </AppBar>
  )
}

const AppbarMobile = () => {
  const { drawerOpen, setDrawerOpen } = useNavContext()

  return (
    <AppBar>
      <MainWrapper>
        <Toolbar sx={{ p: "0" }}>
          <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
            <MenuIcon color="white" />
          </IconButton>

          <Typography color="white">Menu</Typography>
          <Link sx={{ ml: "auto" }} to="/">
            <StaticImage
              src="../../../assets/images/logo-mobile.png"
              alt="Hummingbird Hammocks"
              height={45}
              placeholder="blurred"
            />
          </Link>

          <IconButton sx={{ ml: "auto" }}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M16.041 15.856c-0.034 0.026-0.067 0.055-0.099 0.087s-0.060 0.064-0.087 0.099c-1.258 1.213-2.969 1.958-4.855 1.958-1.933 0-3.682-0.782-4.95-2.050s-2.050-3.017-2.050-4.95 0.782-3.682 2.050-4.95 3.017-2.050 4.95-2.050 3.682 0.782 4.95 2.050 2.050 3.017 2.050 4.95c0 1.886-0.745 3.597-1.959 4.856zM21.707 20.293l-3.675-3.675c1.231-1.54 1.968-3.493 1.968-5.618 0-2.485-1.008-4.736-2.636-6.364s-3.879-2.636-6.364-2.636-4.736 1.008-6.364 2.636-2.636 3.879-2.636 6.364 1.008 4.736 2.636 6.364 3.879 2.636 6.364 2.636c2.125 0 4.078-0.737 5.618-1.968l3.675 3.675c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414z"></path>
            </svg>
          </IconButton>
          <IconButton>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
              <path d="M500 10a207 207 0 01188 125c11 25 16 51 16 79v41h163v613c1 33-11 62-35 86s-53 36-87 36H255c-34 0-63-12-87-36-23-24-35-53-35-86V255h163v-41A207 207 0 01421 26c25-11 51-16 79-16zm286 858V337H214v531c0 11 4 20 12 28s18 12 29 12h490c11 0 21-4 29-12s12-17 12-28zM500 92c-34 0-63 12-87 36s-36 52-36 86v41h246v-41c0-34-12-63-36-86-24-24-53-36-87-36z"></path>
            </svg>
          </IconButton>
        </Toolbar>
      </MainWrapper>
    </AppBar>
  )
}

const MenuItems = ({ items, depthLevel }) => {
  const [dropdown, setDropdown] = useState(false)

  let ref = useRef()

  useEffect(() => {
    const handler = event => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false)
      }
    }
    document.addEventListener("mousedown", handler)
    document.addEventListener("touchstart", handler)
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler)
      document.removeEventListener("touchstart", handler)
    }
  }, [dropdown])

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true)
  }

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false)
  }

  return (
    <ListBox ref={ref} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {items.submenu ? (
        <>
          <Link
            variant="button"
            underline="none"
            sx={{ my: 1, mx: 1.5 }}
            to={items.url}
            aria-haspopup="menu"
            aria-expanded={dropdown ? true : false}
            onClick={() => setDropdown(prev => !prev)}
          >
            <Typography variant="navMenu">
              {items.title}{" "}
              {depthLevel > 0 ? (
                <span style={{ float: "right" }}>&raquo;</span>
              ) : (
                <span className="arrow"></span>
              )}
            </Typography>
          </Link>

          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : (
        <Link
          variant="button"
          underline="none"
          sx={{ my: 1, mx: 1.5 }}
          to={items.url}
        >
          <Typography variant="navMenu">{items.title}</Typography>
        </Link>
      )}
    </ListBox>
  )
}

const Dropdown = ({ submenus, dropdown, depthLevel }) => {
  depthLevel = depthLevel + 1
  const dropdownClass = depthLevel > 1 ? true : false

  return (
    <Wrapper
      sx={{
        display: !dropdown ? "none" : "block",
        position: !dropdownClass ? "" : "absolute",
        left: !dropdownClass ? "" : "100%",
        top: !dropdownClass ? "" : "10px",
      }}
    >
      {submenus.map((submenu, index) => (
        <MenuItems items={submenu} key={index} depthLevel={depthLevel} />
      ))}
    </Wrapper>
  )
}

const CUSTOMER_NAME = gql`
  query ($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      firstName
      lastName
    }
  }
`
