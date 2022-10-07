import React, { useState } from "react"
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  IconButton,
  Box,
  Collapse,
  Typography,
} from "@mui/material"
import { useNavContext } from "contexts"
import { ChevronLeft, ExpandLess, ExpandMore } from "@mui/icons-material"
import { StaticImage } from "gatsby-plugin-image"

import { AnotherLink, Link } from "components"

export const AppDrawer = ({ customerAccessToken, data, userLogout }) => {
  const { drawerOpen, setDrawerOpen } = useNavContext()
  const [nav1, setNav1] = useState(false)
  const [nav2, setNav2] = useState(false)
  const [nav3, setNav3] = useState(false)

  return (
    <Drawer
      PaperProps={{
        sx: { width: { xs: "90%", md: "450px" }, borderRadius: "0 20px 20px 0" },
      }}
      anchor="left"
      open={drawerOpen}
      onClose={() => setDrawerOpen(!drawerOpen)}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid #0c0a0a1f",
          padding: "10px 0",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          ml="20px"
        >
          <StaticImage
            src="../../../assets/images/logo.png"
            alt="Hummingbird Hammocks"
            height={25}
            placeholder="blurred"
          />
        </Box>

        <Box mr="20px">
          <IconButton onClick={() => setDrawerOpen(!drawerOpen)} size="large">
            <ChevronLeft />
          </IconButton>
        </Box>
      </Box>
      <List>
        <ListItem>
          <ListItemButton
            onClick={() => setDrawerOpen(false)}
            component={Link}
            to="/collections/hammocks"
          >
            <ListItemText primary="HAMMOCKS" />
          </ListItemButton>
        </ListItem>
        <ListItem >
          <ListItemButton
            onClick={() => setDrawerOpen(false)}
            component={Link}
            to="/collections/tree-straps"
          >
            <ListItemText primary="TREE STRAPS" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            onClick={() => setDrawerOpen(false)}
            component={Link}
            to="/collections/shelter"
          >
            <ListItemText primary="SHELTER" />
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton onClick={() => setNav1(!nav1)}>
            <ListItemText primary="MORE GEAR" />
            <ListItemIcon>
              {nav1 ? <ExpandLess /> : <ExpandMore />}
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <Collapse in={nav1} timeout="auto" unmountOnExit>
          <List sx={{ pl: 4, pr: 4 }} component="div" disablePadding>
            <ListItem>
              <ListItemButton onClick={() => setNav3(!nav3)}>
                <ListItemIcon>
                  {nav3 ? <ExpandLess /> : <ExpandMore />}
                </ListItemIcon>
                <ListItemText primary="ACCESSORIES" />
              </ListItemButton>
            </ListItem>
            <Collapse in={nav3} timeout="auto" unmountOnExit>
              <List sx={{ pl: 4 }} component="div" disablePadding>
                <ListItem>
                  <ListItemButton
                    onClick={() => setDrawerOpen(false)}
                    component={Link}
                    to="/collections/hammock-accessories"
                  >
                    <ListItemText primary="HAMMOCK ACCESSORIES" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                    onClick={() => setDrawerOpen(false)}
                    component={Link}
                    to="/collections/tree-strap-accessories"
                  >
                    <ListItemText primary="TREE STRAP ACCESSORIES" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                    onClick={() => setDrawerOpen(false)}
                    component={Link}
                    to="/collections/shelter-accessories"
                  >
                    <ListItemText primary="SHELTER ACCESSORIES" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>
            <ListItem>
              <ListItemButton
                onClick={() => setDrawerOpen(false)}
                component={Link}
                to="/collections/care-and-repair"
              >
                <ListItemText primary="CARE & REPAIR" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={() => setDrawerOpen(false)}
                component={Link}
                to="/collections/merchandise"
              >
                <ListItemText primary="APPAREL & MERCH" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={() => setDrawerOpen(false)}
                component={Link}
                to="/collections/bargain-bin"
              >
                <ListItemText primary="BARGAIN BIN" />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>

        <ListItem>
          <ListItemButton onClick={() => setNav2(!nav2)}>
            <ListItemText primary="EXPLORE" />
            <ListItemIcon>
              {nav2 ? <ExpandLess /> : <ExpandMore />}
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <Collapse in={nav2} timeout="auto" unmountOnExit>
          <List sx={{ pl: 4, pr: 4 }} component="div" disablePadding>
            <ListItem>
              <ListItemButton
                onClick={() => setDrawerOpen(false)}
                component={Link}
                to="/explore"
              >
                <ListItemText primary="ABOUT US" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={() => setDrawerOpen(false)}
                component={Link}
                to="/contact-us/"
              >
                <ListItemText primary="CONTACT US" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={() => setDrawerOpen(false)}
                component={AnotherLink}
                href="https://help.hummingbirdhammocks.com/"
              >
                <ListItemText primary="KNOWLEDGEBASE" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={() => setDrawerOpen(false)}
                component={AnotherLink}
                href="https://returns.hummingbirdhammocks.com/"
              >
                <ListItemText primary="RETURNS" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={() => setDrawerOpen(false)}
                component={Link}
                to="/blogs/news"
              >
                <ListItemText primary="OUTDOOR ARTICLES" />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>

        {customerAccessToken ? (
          <Box
            m="10px 15px"
            p="10px 15px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            border="1px solid #34542a"
            borderRadius="10px"
          >
            <Box onClick={() => setDrawerOpen(false)}>
              <Link style={{ display: "inline-block" }} to="/account">
                <Typography variant="navMenu">
                  {data?.customer?.firstName} {data?.customer?.lastName}
                </Typography>
                <br />
                <Typography variant="navUser">Visit Account</Typography>
              </Link>
            </Box>
            <Box
              onClick={() => {
                userLogout()
                setDrawerOpen(false)
              }}
              sx={{ cursor: "pointer" }}
            >
              <Typography variant="navUser">Logout</Typography>
            </Box>
          </Box>
        ) : (
          <Box
            m="10px 15px"
            p="10px 15px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            border="1px solid #34542a"
            borderRadius="10px"
          >
            <Box onClick={() => setDrawerOpen(false)}>
              <Link style={{ display: "inline-block" }} to="/login">
                <Typography variant="navMenu">Login</Typography>
              </Link>
            </Box>
          </Box>
        )}
      </List>
    </Drawer >
  )
}
