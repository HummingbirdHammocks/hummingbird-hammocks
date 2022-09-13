import React from "react"
import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material"

import { Seo, Layout, MainWrapper, Link } from "components"

const NotFoundPage = () => (
  <Layout>
    <Seo title="Not Found" />
    <MainWrapper>
      <Box
        sx={{
          marginTop: "100px",
          marginRight: `auto`,
          paddingBottom: 12,
          marginLeft: `auto`,
          maxWidth: 1080,
          minHeight: "46vh",
        }}
      >
        <Typography
          variant="h1"
        >
          Off the Trail
        </Typography>
        <Typography
          variant="h5"
          component="h2"
        >
          We can't seem to find the page you're looking for
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 400,
            color: "#7a7a7a",
            paddingBottom: "1em",
          }}
        >
          Error code: 404
        </Typography>
        <Typography variant="h6">
          Here are some helpful links instead:
        </Typography>
        <Paper
          sx={{
            marginTop: "1em",
            marginBottom: "1em",
            width: "100%",
            maxWidth: 360,
          }}
        >
          <List component="nav">
            <Link to="/">
              <ListItem button>
                <ListItemText primary="Homepage" />
              </ListItem>
            </Link>
            <Link to="/contact-us">
              <ListItem button>
                <ListItemText primary="Contact Us" />
              </ListItem>
            </Link>
            <Link to="/explore">
              <ListItem button>
                <ListItemText primary="About Us" />
              </ListItem>
            </Link>
            <Link to="/collections/hammocks">
              <ListItem button>
                <ListItemText primary="Hammocks" />
              </ListItem>
            </Link>
            <Link to="/collections/tree-straps">
              <ListItem button>
                <ListItemText primary="Tree Straps" />
              </ListItem>
            </Link>
            <Link to="/account">
              <ListItem button>
                <ListItemText primary="Your Account" />
              </ListItem>
            </Link>
          </List>
        </Paper>
      </Box>
    </MainWrapper>
  </Layout>
)

export default NotFoundPage
