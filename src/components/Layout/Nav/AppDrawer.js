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
import { Link } from "gatsby"

export const AppDrawer = () => {
  const { drawerOpen, setDrawerOpen } = useNavContext()
  const [open, setOpen] = useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

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
          alignItems: "center",
          padding: "0 8px",
          justifyContent: "flex-end",
        }}
      >
        <IconButton onClick={() => setDrawerOpen(!drawerOpen)} size="large">
          <ChevronLeft />
        </IconButton>
      </Box>
      <List>
        <ListItem component={Link} to="/">
          <Typography variant="navMenu">Hammocks</Typography>
        </ListItem>
        <ListItem component={Link} to="/">
          <Typography variant="navMenu">Tree Straps</Typography>
        </ListItem>
        <ListItem component={Link} to="/">
          <Typography variant="navMenu">Shelter</Typography>
        </ListItem>

        <ListItemButton onClick={handleClick}>
          <Link style={{ textDecoration: "none" }} to="/">
            <Typography variant="navMenu">More Gear</Typography>
          </Link>

          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List sx={{ pl: 4 }} component="div" disablePadding>
            <ListItemButton onClick={handleClick}>
              <Link style={{ textDecoration: "none" }} to="/">
                <Typography variant="navMenu">Accessorie</Typography>
              </Link>

              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List sx={{ pl: 4 }} component="div" disablePadding>
                <ListItem component={Link} to="/">
                  <Typography variant="navMenu">Hammock Accessories</Typography>
                </ListItem>
                <ListItem component={Link} to="/">
                  <Typography variant="navMenu">
                    Tree Strap Accessories
                  </Typography>
                </ListItem>
                <ListItem component={Link} to="/">
                  <Typography variant="navMenu">Shelter Accessories</Typography>
                </ListItem>
              </List>
            </Collapse>
            <ListItem component={Link} to="/">
              <Typography variant="navMenu">Care & Repair</Typography>
            </ListItem>
            <ListItem component={Link} to="/">
              <Typography variant="navMenu">Apparel & Merch</Typography>
            </ListItem>
            <ListItem component={Link} to="/">
              <Typography variant="navMenu">Bargain Bin</Typography>
            </ListItem>
          </List>
        </Collapse>

        <ListItemButton onClick={handleClick}>
          <Link style={{ textDecoration: "none" }} to="/">
            <Typography variant="navMenu">Explore</Typography>
          </Link>

          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List sx={{ pl: 4 }} component="div" disablePadding>
            <ListItem component={Link} to="/">
              <Typography variant="navMenu">Bargain Bin</Typography>
            </ListItem>
            <ListItem component={Link} to="/">
              <Typography variant="navMenu">Contact us</Typography>
            </ListItem>
            <ListItem component={Link} to="/">
              <Typography variant="navMenu">Knowledgebase</Typography>
            </ListItem>
            <ListItem component={Link} to="/">
              <Typography variant="navMenu">Returns</Typography>
            </ListItem>
            <ListItem component={Link} to="/">
              <Typography variant="navMenu">Outdoors Articles</Typography>
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Drawer>
  )
}
