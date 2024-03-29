import { AccountCircle, ExpandLess, ExpandMore, ShoppingCartOutlined } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Badge,
  Box,
  Button,
  ClickAwayListener,
  Collapse,
  Grow,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  MenuList,
  Paper,
  Popper,
  Stack,
  Toolbar,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useContext, useEffect, useRef, useState } from 'react';

import HorizontalLogo from '../../../assets/HorizontalLogo';
import MobileLogo from '../../../assets/MobileLogo';
import { Link, MainWrapper, MiddleSpinner } from '../../../components';
import { CartContext } from '../../../contexts';
// stores
import { useAuthStore, useUIDispatch, useUIStore } from '../../../stores';
import { Search } from '../../../utils';
import NavMenuItems from './MenuItems';

const NavButton = styled(Button)(() => ({
  color: '#414042',
  fontWeight: '500',
  textTransform: 'uppercase'
}));

function Nav({ data, loading }) {
  const { checkout } = useContext(CartContext);

  const { customerAccessToken } = useAuthStore();
  const { bannerOpen } = useUIStore();
  const uiDispatch = useUIDispatch();

  let totalQuantity = 0;

  if (checkout) {
    checkout.lineItems.forEach((lineItem) => {
      totalQuantity = totalQuantity + lineItem.quantity;
    });
  }

  return (
    <>
      <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
        <AppbarDesktop
          banner={bannerOpen}
          customerAccessToken={customerAccessToken}
          loading={loading}
          data={data}
          cartQuantity={totalQuantity}
          setCartOpen={() => uiDispatch({ type: 'toggleCartOpen' })}
          setDrawerOpen={() => uiDispatch({ type: 'toggleNavDrawerOpen' })}
        />
      </Box>
      <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
        <AppbarMobile
          banner={bannerOpen}
          customerAccessToken={customerAccessToken}
          loading={loading}
          data={data}
          cartQuantity={totalQuantity}
          setCartOpen={() => uiDispatch({ type: 'toggleCartOpen' })}
          setDrawerOpen={() => uiDispatch({ type: 'toggleNavDrawerOpen' })}
        />
      </Box>
    </>
  );
}

export default Nav;

const AppbarDesktop = ({ cartQuantity, setCartOpen, customerAccessToken, data, loading }) => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#fdfdf5',
        backdropFilter: 'saturate(180%) blur(20px)',
        borderRadius: 0,
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderBottom: '2px solid rgb(65, 64, 66)',
        transition: '0.3s',
        zIndex: '1199'
      }}>
      <MainWrapper>
        <Toolbar>
          <Link to="/">
            <Box sx={{ height: '36px' }}>
              <HorizontalLogo height="100%" alt="Hummingbird Hammocks Logo" />
            </Box>
          </Link>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={4}
            sx={{ marginLeft: 4 }}>
            {NavMenuItems.map((menu, index) => (
              <NavItems items={menu} key={index} />
            ))}
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            sx={{ marginLeft: 'auto' }}>
            <Search />

            {customerAccessToken ? (
              <Button
                sx={{ m: '0 20px' }}
                variant="outlined"
                startIcon={<AccountCircle />}
                component={Link}
                to="/account">
                {loading && <MiddleSpinner size={10} />}
                <Typography variant="navUser">{data?.customer?.firstName}</Typography>
              </Button>
            ) : (
              <IconButton component={Link} to="/account/login">
                <AccountCircle />
              </IconButton>
            )}

            <IconButton onClick={setCartOpen}>
              <Badge badgeContent={cartQuantity} color="error">
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Stack>
        </Toolbar>
      </MainWrapper>
    </AppBar>
  );
};

const AppbarMobile = ({ cartQuantity, setCartOpen, setDrawerOpen }) => {
  return (
    <AppBar
      sx={{
        borderRadius: 0
      }}
      position="static"
      color="secondary">
      <MainWrapper>
        <Toolbar sx={{ p: '0' }}>
          <Button
            size="large"
            startIcon={<MenuIcon />}
            onClick={setDrawerOpen}
            sx={{ color: '#FFFFFF' }}>
            Menu
          </Button>
          <Link sx={{ ml: 'auto' }} to="/">
            <Box sx={{ height: '46px' }}>
              <MobileLogo height="100%" alt="Hummingbird Hammocks Logo" />
            </Box>
          </Link>

          <IconButton sx={{ ml: 'auto' }}>
            <Search />
          </IconButton>
          <IconButton color="white" onClick={setCartOpen}>
            <Badge badgeContent={cartQuantity} color="error">
              <ShoppingCartOutlined />
            </Badge>
          </IconButton>
        </Toolbar>
      </MainWrapper>
    </AppBar>
  );
};

const NavItems = ({ items }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return items.submenu ? (
    <>
      <NavButton
        endIcon={items.submenu ? <ExpandMore /> : null}
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}>
        {items.title}
      </NavButton>
      <Dropdown
        open={open}
        anchorRef={anchorRef}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        handleClose={handleClose}
        handleListKeyDown={handleListKeyDown}
        submenus={items.submenu}
      />
    </>
  ) : items.otherUrl ? (
    <NavButton component={'a'} href={items.otherUrl}>
      {items.title}
    </NavButton>
  ) : (
    <NavButton component={Link} to={items.url}>
      {items.title}
    </NavButton>
  );
};

const MenuItems = ({ items }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return items.submenu ? (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={items.title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items.submenu.map((item, index) =>
            item.otherUrl ? (
              <ListItemButton key={index} component={'a'} href={item.otherUrl} sx={{ pl: 4 }}>
                <ListItemText primary={item.title} />
              </ListItemButton>
            ) : (
              <ListItemButton key={index} component={Link} to={item.url} sx={{ pl: 4 }}>
                <ListItemText primary={item.title} />
              </ListItemButton>
            )
          )}
        </List>
      </Collapse>
    </>
  ) : items.otherUrl ? (
    <ListItemButton component={'a'} href={items.otherUrl}>
      <ListItemText primary={items.title} />
    </ListItemButton>
  ) : (
    <ListItemButton component={Link} to={items.url}>
      <ListItemText primary={items.title} />
    </ListItemButton>
  );
};

const Dropdown = ({ submenus, open, anchorRef, handleListKeyDown, handleClose }) => {
  /* console.log(submenus) */

  return (
    <Popper
      open={open}
      anchorEl={anchorRef.current}
      role={undefined}
      placement="bottom-start"
      transition
      sx={{
        zIndex: 13000
      }}>
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom'
          }}>
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                autoFocusItem={open}
                id="composition-menu"
                aria-labelledby="composition-button"
                onKeyDown={handleListKeyDown}>
                {submenus.map((submenu, index) => (
                  <MenuItems items={submenu} key={index} />
                ))}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};
