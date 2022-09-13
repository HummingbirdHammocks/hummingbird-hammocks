import React, { useState } from "react"
import {
  Drawer,
  List,
  ListItem,
  IconButton,
  Box,
  Collapse,
  ListItemButton,
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
        sx: { width: "90%", borderRadius: "0 20px 20px 0" },
      }}
      anchor="left"
      open={drawerOpen}
      variant="persistent"
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
            src="../../../assets/images/icon.png"
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
        <ListItem
          onClick={() => setDrawerOpen(false)}
          component={Link}
          to="/collections/hammocks"
        >
          <Typography variant="navMenu">Hammocks</Typography>
        </ListItem>
        <ListItem
          onClick={() => setDrawerOpen(false)}
          component={Link}
          to="/collections/tree-straps"
        >
          <Typography variant="navMenu">Tree Straps</Typography>
        </ListItem>
        <ListItem
          onClick={() => setDrawerOpen(false)}
          component={Link}
          to="/collections/shelter"
        >
          <Typography variant="navMenu">Shelter</Typography>
        </ListItem>

        <ListItemButton onClick={() => setNav1(!nav1)}>
          <Typography variant="navMenu">More Gear</Typography>

          {nav1 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={nav1} timeout="auto" unmountOnExit>
          <List sx={{ pl: 4 }} component="div" disablePadding>
            <ListItemButton onClick={() => setNav3(!nav3)}>
              <Typography variant="navMenu">Accessories</Typography>

              {nav3 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={nav3} timeout="auto" unmountOnExit>
              <List sx={{ pl: 4 }} component="div" disablePadding>
                <ListItem
                  onClick={() => setDrawerOpen(false)}
                  component={Link}
                  to="/collections/hammock-accessories"
                >
                  <Typography variant="navMenu">Hammock Accessories</Typography>
                </ListItem>
                <ListItem
                  onClick={() => setDrawerOpen(false)}
                  component={Link}
                  to="/collections/tree-strap-accessories"
                >
                  <Typography variant="navMenu">
                    Tree Strap Accessories
                  </Typography>
                </ListItem>
                <ListItem
                  onClick={() => setDrawerOpen(false)}
                  component={Link}
                  to="/collections/shelter-accessories"
                >
                  <Typography variant="navMenu">Shelter Accessories</Typography>
                </ListItem>
              </List>
            </Collapse>
            <ListItem
              onClick={() => setDrawerOpen(false)}
              component={Link}
              to="/collections/care-and-repair"
            >
              <Typography variant="navMenu">Care & Repair</Typography>
            </ListItem>
            <ListItem
              onClick={() => setDrawerOpen(false)}
              component={Link}
              to="/collections/merchandise"
            >
              <Typography variant="navMenu">Apparel & Merch</Typography>
            </ListItem>
            <ListItem
              onClick={() => setDrawerOpen(false)}
              component={Link}
              to="/collections/bargain-bin"
            >
              <Typography variant="navMenu">Bargain Bin</Typography>
            </ListItem>
          </List>
        </Collapse>

        <ListItemButton onClick={() => setNav2(!nav2)}>
          <Typography variant="navMenu">Explore</Typography>

          {nav2 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={nav2} timeout="auto" unmountOnExit>
          <List sx={{ pl: 4 }} component="div" disablePadding>
            <ListItem
              onClick={() => setDrawerOpen(false)}
              component={Link}
              to="/explore"
            >
              <Typography variant="navMenu">About us</Typography>
            </ListItem>
            <ListItem
              onClick={() => setDrawerOpen(false)}
              component={Link}
              to="/contact-us/"
            >
              <Typography variant="navMenu">Contact us</Typography>
            </ListItem>
            <ListItem
              onClick={() => setDrawerOpen(false)}
              component={AnotherLink}
              href="https://help.hummingbirdhammocks.com/"
            >
              <Typography variant="navMenu">Knowledgebase</Typography>
            </ListItem>
            <ListItem
              onClick={() => setDrawerOpen(false)}
              component={AnotherLink}
              href="https://returns.hummingbirdhammocks.com/"
            >
              <Typography variant="navMenu">Returns</Typography>
            </ListItem>
            <ListItem
              onClick={() => setDrawerOpen(false)}
              component={Link}
              to="/blogs/news"
            >
              <Typography variant="navMenu">Outdoor Articles</Typography>
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
                <Typography variant="navUser">View Profile</Typography>
              </Link>
            </Box>
            <Box
              onClick={() => {
                userLogout()
                setDrawerOpen(false)
              }}
            >
              Logout
            </Box>
          </Box>
        ) : (
          <ListItem
            onClick={() => setDrawerOpen(false)}
            component={Link}
            to="/account/login"
          >
            <Typography variant="navMenu">Login</Typography>
          </ListItem>
        )}
      </List>
    </Drawer>
  )
}
