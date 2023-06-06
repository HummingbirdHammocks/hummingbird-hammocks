import { Menu } from '@mui/icons-material';
import {
  Box,
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper
} from '@mui/material';
import { Link } from 'components';
import React, { useEffect, useRef, useState } from 'react';

const navItems = [
  {
    id: 'orders',
    name: 'Orders',
    type: 'internal',
    link: '/account/orders'
  },
  {
    id: 'addresses',
    name: 'Addresses',
    type: 'internal',
    link: '/account/addresses'
  },
  {
    id: 'info',
    name: 'Information',
    type: 'internal',
    link: '/account/info'
  },
  {
    id: 'notifications',
    name: 'Notifications',
    type: 'internal',
    link: '/account/notifications'
  },
  {
    id: 'tickets',
    name: 'Tickets',
    type: 'internal',
    link: '/account/tickets'
  }
];

export default function AccountNav({ currentPage }) {
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

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
        <Paper sx={{ borderRadius: 2 }}>
          <Box sx={{ width: '100%', maxWidth: 360 }}>
            <MenuList>
              {navItems.map((item) =>
                item.type === 'internal' ? (
                  <MenuItem
                    key={item.id}
                    selected={currentPage === item.id}
                    component={Link}
                    to={item.link}>
                    {item.name}
                  </MenuItem>
                ) : (
                  <MenuItem
                    key={item.id}
                    selected={currentPage === item.id}
                    component={'a'}
                    href={item.link}
                    target="_blank">
                    {item.name}
                  </MenuItem>
                )
              )}
            </MenuList>
          </Box>
        </Paper>
      </Box>
      <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
        <Button
          ref={anchorRef}
          startIcon={<Menu />}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}>
          Account Menu
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
          sx={{ zIndex: 10 }}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom'
              }}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList>
                    {navItems.map((item) => (
                      <>
                        {item.type === 'internal' ? (
                          <MenuItem
                            key={item.id}
                            selected={currentPage === item.id}
                            component={Link}
                            to={item.link}>
                            {item.name}
                          </MenuItem>
                        ) : (
                          <MenuItem
                            key={item.id}
                            selected={currentPage === item.id}
                            component={'a'}
                            href={item.link}
                            target="_blank">
                            {item.name}
                          </MenuItem>
                        )}
                      </>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
    </>
  );
}
