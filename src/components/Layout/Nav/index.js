import React, { useState, useEffect, useRef, useContext } from "react"
import {
  AppBar,
  List,
  Toolbar,
  Typography,
  useMediaQuery,
  Button,
  IconButton,
  Badge,
  Box,
} from "@mui/material"
import { StaticImage } from "gatsby-plugin-image"
import MenuIcon from "@mui/icons-material/Menu"
import { ShoppingCartOutlined, AccountCircle } from "@mui/icons-material"

import NavMenuItems from "./MenuItems"
import { MainWrapper, Link, MiddleSpinner, AnotherLink } from "components"
import { useNavContext, useUICartContext, CartContext } from "contexts"
import Search from "../../../utils/algolia/search"


function Nav({ customerAccessToken, data, loading, banner }) {
  const matches = useMediaQuery("(max-width:900px)")
  const { checkout } = useContext(CartContext)

  const { cartOpen, setCartOpen } = useUICartContext()

  let totalQuantity = 0

  if (checkout) {
    checkout.lineItems.forEach(lineItem => {
      totalQuantity = totalQuantity + lineItem.quantity
    })
  }

  return (
    <>
      {matches ? (
        <AppbarMobile
          banner={banner}
          customerAccessToken={customerAccessToken}
          loading={loading}
          data={data}
          cartQuantity={totalQuantity}
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
        />
      ) : (
        <AppbarDesktop
          banner={banner}
          customerAccessToken={customerAccessToken}
          loading={loading}
          data={data}
          cartQuantity={totalQuantity}
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
        />
      )}
    </>
  )
}

export default Nav

const AppbarDesktop = ({
  cartQuantity,
  setCartOpen,
  cartOpen,
  customerAccessToken,
  data,
  loading,
  banner,
}) => {
  // const [scroll, setScroll] = useState(false)

  // if (typeof window !== "undefined") {
  //   //Nacbar Color on Scroll
  //   window.onscroll = () => {
  //     const scrollMe = window.scrollY
  //     if (scrollMe >= 130) {
  //       setScroll(true)
  //     } else {
  //       setScroll(false)
  //     }
  //   }
  // }

  return (
    <AppBar
      position="absolute"
      sx={{
        top: banner && "50px",
        backgroundColor: "#fdfdf5",
        backdropFilter: "saturate(180%) blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        borderBottom: "2px solid rgb(65, 64, 66)",
        transition: "0.3s",
        zIndex: "1199",
      }}
    >
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
          <Box sx={{ ml: "auto" }}>
            <Search />
          </Box>
          {/* <IconButton sx={{ ml: "auto" }}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M16.041 15.856c-0.034 0.026-0.067 0.055-0.099 0.087s-0.060 0.064-0.087 0.099c-1.258 1.213-2.969 1.958-4.855 1.958-1.933 0-3.682-0.782-4.95-2.050s-2.050-3.017-2.050-4.95 0.782-3.682 2.050-4.95 3.017-2.050 4.95-2.050 3.682 0.782 4.95 2.050 2.050 3.017 2.050 4.95c0 1.886-0.745 3.597-1.959 4.856zM21.707 20.293l-3.675-3.675c1.231-1.54 1.968-3.493 1.968-5.618 0-2.485-1.008-4.736-2.636-6.364s-3.879-2.636-6.364-2.636-4.736 1.008-6.364 2.636-2.636 3.879-2.636 6.364 1.008 4.736 2.636 6.364 3.879 2.636 6.364 2.636c2.125 0 4.078-0.737 5.618-1.968l3.675 3.675c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414z"></path>
            </svg>
          </IconButton> */}

          {customerAccessToken ? (
            <Link style={{ display: "inline-block" }} to="/account">
              <Button
                sx={{ m: "0 20px" }}
                variant="outlined"
                startIcon={<AccountCircle />}
              >
                {loading && <MiddleSpinner size={10} />}
                <Typography variant="navUser">
                  {data?.customer?.firstName}
                </Typography>
              </Button>
            </Link>
          ) : (
            <Link to="/account/login">
              <AccountCircle sx={{ m: "4px 20px 0 20px" }} />
            </Link>
          )}

          <IconButton onClick={() => setCartOpen(!cartOpen)}>
            <Badge badgeContent={cartQuantity} color="error">
              <ShoppingCartOutlined />
            </Badge>
          </IconButton>
        </Toolbar>
      </MainWrapper>
    </AppBar>
  )
}

const AppbarMobile = ({ cartQuantity, cartOpen, setCartOpen, banner }) => {
  const { drawerOpen, setDrawerOpen } = useNavContext()

  return (
    <AppBar
      sx={{
        marginTop: banner && "90px",
      }}
      position="static"
      color="secondary"
    >
      <MainWrapper>
        <Toolbar sx={{ p: "0" }}>
          <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
            <MenuIcon color="white" />
          </IconButton>

          <Typography variant="subtitle2" color="white">
            Menu
          </Typography>
          <Link sx={{ ml: "auto" }} to="/">
            <StaticImage
              src="../../../assets/images/logo-mobile.png"
              alt="Hummingbird Hammocks"
              height={45}
              placeholder="blurred"
            />
          </Link>

          {/* <IconButton sx={{ ml: "auto" }}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
              <path d="M16.041 15.856c-0.034 0.026-0.067 0.055-0.099 0.087s-0.060 0.064-0.087 0.099c-1.258 1.213-2.969 1.958-4.855 1.958-1.933 0-3.682-0.782-4.95-2.050s-2.050-3.017-2.050-4.95 0.782-3.682 2.050-4.95 3.017-2.050 4.95-2.050 3.682 0.782 4.95 2.050 2.050 3.017 2.050 4.95c0 1.886-0.745 3.597-1.959 4.856zM21.707 20.293l-3.675-3.675c1.231-1.54 1.968-3.493 1.968-5.618 0-2.485-1.008-4.736-2.636-6.364s-3.879-2.636-6.364-2.636-4.736 1.008-6.364 2.636-2.636 3.879-2.636 6.364 1.008 4.736 2.636 6.364 3.879 2.636 6.364 2.636c2.125 0 4.078-0.737 5.618-1.968l3.675 3.675c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414z"></path>
            </svg>
          </IconButton> */}
          <IconButton sx={{ ml: "auto" }}>
            <Search />
          </IconButton>
          <IconButton>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
              <path d="M500 10a207 207 0 01188 125c11 25 16 51 16 79v41h163v613c1 33-11 62-35 86s-53 36-87 36H255c-34 0-63-12-87-36-23-24-35-53-35-86V255h163v-41A207 207 0 01421 26c25-11 51-16 79-16zm286 858V337H214v531c0 11 4 20 12 28s18 12 29 12h490c11 0 21-4 29-12s12-17 12-28zM500 92c-34 0-63 12-87 36s-36 52-36 86v41h246v-41c0-34-12-63-36-86-24-24-53-36-87-36z"></path>
            </svg>
          </IconButton>
          <IconButton color="white" onClick={() => setCartOpen(!cartOpen)}>
            <Badge badgeContent={cartQuantity} color="error">
              <ShoppingCartOutlined />
            </Badge>
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
    <Box
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={{
        padding: "15px 10px",

        "& .arrow": {
          "&:after": {
            content: `""`,
            display: "inline-block",
            marginLeft: "0.28em",
            verticalAlign: "0.09em",
            borderTop: "0.42em solid",
            borderRight: "0.42em solid transparent",
            borderLeft: "0.42em solid transparent",
          },
        },
      }}>
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
            <Typography
              sx={{
                transition: "0.3s",
                "&:hover": {
                  color: "primary.main",
                },
              }}
              variant="navMenu"
            >
              {items.title}{" "}
              {depthLevel > 0 ? (
                <span
                  style={{
                    float: "right",
                    fontSize: "18px",
                    marginTop: "-5px",
                  }}
                >
                  &#9656;
                </span>
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
        <>
          {items.otherUrl ? (
            <AnotherLink m="15px 13px" href={items.otherUrl}>
              {" "}
              {items.title}
            </AnotherLink>
          ) : (
            <Link
              variant="button"
              underline="none"
              sx={{ my: 1, mx: 1.5 }}
              to={items.url}
            >
              <Typography
                sx={{
                  transition: "0.3s",
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
                variant="navMenu"
              >
                {items.title}
              </Typography>
            </Link>
          )}
        </>
      )}
    </Box>
  )
}

const Dropdown = ({ submenus, dropdown, depthLevel }) => {
  depthLevel = depthLevel + 1
  const dropdownClass = depthLevel > 1 ? true : false

  return (
    <Box
      sx={{
        position: "absolute",
        minWidth: "260px",
        zIndex: 1200,
        listStyle: "none",
        padding: "7px 0",
        borderRadius: "15px",
        backgroundColor: "white",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow:
          "0 10px 15px -3px rgba(46, 41, 51, 0.08), 0 4px 6px -2px rgba(71, 63, 79, 0.16)",
        display: !dropdown ? "none" : "block",
        position: !dropdownClass ? "" : "absolute",
        left: !dropdownClass ? "" : "100%",
        top: !dropdownClass ? "" : "10px",
      }}
    >
      {
        submenus.map((submenu, index) => (
          <MenuItems items={submenu} key={index} depthLevel={depthLevel} />
        ))
      }
    </Box >
  )
}
