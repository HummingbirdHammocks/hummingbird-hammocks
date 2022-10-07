import React, { useState, useEffect, useRef, useContext } from "react"
import {
  AppBar,
  List,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  styled
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { ShoppingCartOutlined, AccountCircle } from "@mui/icons-material"

import HorizontalLogo from "../../../assets/HorizontalLogo"
import MobileLogo from "../../../assets/MobileLogo"

import NavMenuItems from "./MenuItems"
import { MainWrapper, Link, MiddleSpinner, AnotherLink } from "components"
import { useNavContext, useUICartContext, CartContext } from "contexts"
import Search from "../../../utils/algolia/search"

const DropdownWrapper = styled("ul")(() => ({
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
      borderRight: "0.42em solid transparent",
      borderLeft: "0.42em solid transparent",
    },
  },
}))

function Nav({ customerAccessToken, data, loading, banner }) {
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
      <Box sx={{ display: { xs: 'block', lg: 'none' } }} >
        <AppbarMobile
          banner={banner}
          customerAccessToken={customerAccessToken}
          loading={loading}
          data={data}
          cartQuantity={totalQuantity}
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
        />
      </Box>
      <Box sx={{ display: { xs: 'none', lg: 'block' } }} >
        <AppbarDesktop
          banner={banner}
          customerAccessToken={customerAccessToken}
          loading={loading}
          data={data}
          cartQuantity={totalQuantity}
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
        />
      </Box>
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

  return (
    <AppBar
      position="absolute"
      sx={{
        top: banner && "50px",
        backgroundColor: "#fdfdf5",
        backdropFilter: "saturate(180%) blur(20px)",
        borderRadius: 0,
        border: "1px solid rgba(255, 255, 255, 0.3)",
        borderBottom: "2px solid rgb(65, 64, 66)",
        transition: "0.3s",
        zIndex: "1199",
      }}
    >
      <MainWrapper>
        <Toolbar>
          <Link to="/">
            <Box sx={{ height: "36px" }}>
              <HorizontalLogo height="100%" alt="Hummingbird Hammocks Logo" />
            </Box>
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
            <Link to="/login">
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

const AppbarMobile = ({ cartQuantity, cartOpen, setCartOpen }) => {
  const { drawerOpen, setDrawerOpen } = useNavContext()

  return (
    <AppBar
      sx={{
        borderRadius: 0,
      }}
      position="static"
      color="secondary"
    >
      <MainWrapper>
        <Toolbar sx={{ p: "0" }}>
          <Button
            size="large"
            startIcon={<MenuIcon />}
            onClick={() => setDrawerOpen(!drawerOpen)}
            sx={{ color: "#FFFFFF" }}
          >
            Menu
          </Button>
          <Link sx={{ ml: "auto" }} to="/">
            <Box sx={{ height: "46px" }}>
              <MobileLogo height="100%" alt="Hummingbird Hammocks Logo" />
            </Box>
          </Link>

          <IconButton sx={{ ml: "auto" }}>
            <Search />
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
    <ListBox
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
    </ListBox>
  )
}

const Dropdown = ({ submenus, dropdown, depthLevel }) => {
  depthLevel = depthLevel + 1
  const dropdownClass = depthLevel > 1 ? true : false

  return (
    <DropdownWrapper
      sx={{
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
    </DropdownWrapper >
  )
}
