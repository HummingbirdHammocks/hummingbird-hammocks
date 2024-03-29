import { ChevronLeft, ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Box,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import { navigate } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import React, { useState } from 'react';

// components
import { Link } from '../../../components';
// stores
import { useAuthDispatch, useAuthStore, useUIDispatch, useUIStore } from '../../../stores';

export const AppDrawer = ({ data }) => {
  const [nav1, setNav1] = useState(false);
  const [nav2, setNav2] = useState(false);
  const [nav3, setNav3] = useState(false);

  const { customerAccessToken } = useAuthStore();
  const authDispatch = useAuthDispatch();
  const { navDrawerOpen } = useUIStore();
  const uiDispatch = useUIDispatch();

  const userLogout = () => {
    authDispatch({ type: 'setLogout' });
    uiDispatch({ type: 'toggleNavDrawerOpen' });
    navigate('/');
  };

  return (
    <Drawer
      PaperProps={{
        sx: { width: { xs: '90%', md: '450px' }, borderRadius: '0 20px 20px 0' }
      }}
      anchor="left"
      open={navDrawerOpen}
      onClose={() => uiDispatch({ type: 'toggleNavDrawerOpen' })}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: '1px solid #0c0a0a1f',
          padding: '10px 0'
        }}>
        <Box display="flex" alignItems="center" justifyContent="center" ml="20px">
          <StaticImage
            src="../../../assets/images/logo.png"
            alt="Hummingbird Hammocks"
            height={25}
            placeholder="blurred"
          />
        </Box>

        <Box mr="20px">
          <IconButton onClick={() => uiDispatch({ type: 'toggleNavDrawerOpen' })} size="large">
            <ChevronLeft />
          </IconButton>
        </Box>
      </Box>
      <List>
        <ListItem>
          <ListItemButton
            onClick={() => uiDispatch({ type: 'toggleNavDrawerOpen' })}
            component={Link}
            to="/collections/hammocks">
            <ListItemText primary="HAMMOCKS" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            onClick={() => uiDispatch({ type: 'toggleNavDrawerOpen' })}
            component={Link}
            to="/collections/tree-straps">
            <ListItemText primary="TREE STRAPS" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            onClick={() => uiDispatch({ type: 'toggleNavDrawerOpen' })}
            component={Link}
            to="/collections/shelter">
            <ListItemText primary="SHELTER" />
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton onClick={() => setNav1(!nav1)}>
            <ListItemText primary="MORE GEAR" />
            <ListItemIcon>{nav1 ? <ExpandLess /> : <ExpandMore />}</ListItemIcon>
          </ListItemButton>
        </ListItem>
        <Collapse in={nav1} timeout="auto" unmountOnExit>
          <List sx={{ pl: 4, pr: 4 }} component="div" disablePadding>
            <ListItem>
              <ListItemButton onClick={() => setNav3(!nav3)}>
                <ListItemIcon>{nav3 ? <ExpandLess /> : <ExpandMore />}</ListItemIcon>
                <ListItemText primary="ACCESSORIES" />
              </ListItemButton>
            </ListItem>
            <Collapse in={nav3} timeout="auto" unmountOnExit>
              <List sx={{ pl: 4 }} component="div" disablePadding>
                <ListItem>
                  <ListItemButton
                    onClick={() => uiDispatch({ type: 'toggleNavDrawerOpen' })}
                    component={Link}
                    to="/collections/hammock-accessories">
                    <ListItemText primary="HAMMOCK ACCESSORIES" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                    onClick={() => uiDispatch({ type: 'toggleNavDrawerOpen' })}
                    component={Link}
                    to="/collections/tree-strap-accessories">
                    <ListItemText primary="TREE STRAP ACCESSORIES" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                    onClick={() => uiDispatch({ type: 'toggleNavDrawerOpen' })}
                    component={Link}
                    to="/collections/shelter-accessories">
                    <ListItemText primary="SHELTER ACCESSORIES" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>
            <ListItem>
              <ListItemButton
                onClick={() => uiDispatch({ type: 'toggleNavDrawerOpen' })}
                component={Link}
                to="/collections/care-and-repair">
                <ListItemText primary="CARE & REPAIR" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={() => uiDispatch({ type: 'toggleNavDrawerOpen' })}
                component={Link}
                to="/collections/merchandise">
                <ListItemText primary="APPAREL & MERCH" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={() => uiDispatch({ type: 'toggleNavDrawerOpen' })}
                component={Link}
                to="/collections/bargain-bin">
                <ListItemText primary="BARGAIN BIN" />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>

        <ListItem>
          <ListItemButton onClick={() => setNav2(!nav2)}>
            <ListItemText primary="EXPLORE" />
            <ListItemIcon>{nav2 ? <ExpandLess /> : <ExpandMore />}</ListItemIcon>
          </ListItemButton>
        </ListItem>
        <Collapse in={nav2} timeout="auto" unmountOnExit>
          <List sx={{ pl: 4, pr: 4 }} component="div" disablePadding>
            <ListItem>
              <ListItemButton
                onClick={() => uiDispatch({ type: 'toggleNavDrawerOpen' })}
                component={Link}
                to="/explore">
                <ListItemText primary="ABOUT US" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={() => uiDispatch({ type: 'toggleNavDrawerOpen' })}
                component={Link}
                to="/sustainability">
                <ListItemText primary="SUSTAINABILITY" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={() => uiDispatch({ type: 'toggleNavDrawerOpen' })}
                component={Link}
                to="/contact-us">
                <ListItemText primary="CONTACT US" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={() => uiDispatch({ type: 'toggleNavDrawerOpen' })}
                component={Link}
                to="/knowledgebase">
                <ListItemText primary="KNOWLEDGEBASE" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={() => uiDispatch({ type: 'toggleNavDrawerOpen' })}
                component={Link}
                to="/returns">
                <ListItemText primary="RETURNS" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={() => uiDispatch({ type: 'toggleNavDrawerOpen' })}
                component={Link}
                to="/account/create-ticket">
                <ListItemText primary="SUPPORT TICKET" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={() => uiDispatch({ type: 'toggleNavDrawerOpen' })}
                component={Link}
                to="/blogs/news">
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
            borderRadius="10px">
            <Box onClick={() => uiDispatch({ type: 'toggleNavDrawerOpen' })}>
              <Link style={{ display: 'inline-block' }} to="/account">
                <Typography variant="navMenu">
                  {data?.customer?.firstName} {data?.customer?.lastName}
                </Typography>
                <br />
                <Typography variant="navUser">Visit Account</Typography>
              </Link>
            </Box>
            <Box onClick={() => userLogout()} sx={{ cursor: 'pointer' }}>
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
            borderRadius="10px">
            <Box onClick={() => uiDispatch({ type: 'toggleNavDrawerOpen' })}>
              <Link style={{ display: 'inline-block' }} to="/account/login">
                <Typography variant="navMenu">Login</Typography>
              </Link>
            </Box>
          </Box>
        )}
      </List>
    </Drawer>
  );
};
