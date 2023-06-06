import { Box, List, ListItem, ListItemText, Paper, Stack } from '@mui/material';
import { Layout, Link, MainWrapper, Seo } from 'components';
import React from 'react';
import { Info } from 'sections';

const NotFoundPage = () => (
  <Layout>
    <Seo title="Not Found" />
    <MainWrapper>
      <Box
        sx={{
          marginTop: '100px',
          marginRight: `auto`,
          paddingBottom: 12,
          marginLeft: `auto`,
          maxWidth: 1080,
          minHeight: '46vh'
        }}>
        <Stack justifyContent="center" alignItems="center">
          <Info title="404: Off the Trail">
            We can't seem to find the page you're looking for.
            <br /> <br />
            <b>Links to get you moving again:</b>
          </Info>
          <Paper
            sx={{
              marginTop: '1em',
              marginBottom: '1em',
              width: '100%',
              maxWidth: 360
            }}>
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
        </Stack>
      </Box>
    </MainWrapper>
  </Layout>
);

export default NotFoundPage;
