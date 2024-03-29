import { HelpOutline } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import React, { useState } from 'react';

export function ProductPrice({ price, compareAtPrice, saleReason }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /* console.log(price) */
  /* console.log(compareAtPrice) */
  /* console.log(saleReason) */

  if (!price || !compareAtPrice) {
    return null;
  }

  if (price.ammount !== compareAtPrice.ammount) {
    return (
      <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
        <Box
          sx={{
            textDecoration: 'none',
            position: 'relative',

            ':before': {
              top: '50%' /*tweak this to adjust the vertical position if it's off a bit due to your font family */,
              background: 'red' /*this is the color of the line*/,
              opacity: '.7',
              content: "''",
              width: '110%',
              position: 'absolute',
              height: '.1em',
              borderRadius: '.1em',
              left: '-5%',
              whiteSpace: 'nowrap',
              display: 'block',
              transform: 'rotate(-15deg)'
            }
          }}>
          <Typography
            variant="h5"
            color="#414042"
            sx={{
              paddingTop: 1,
              paddingBottom: 1
            }}>
            ${compareAtPrice.ammount}
          </Typography>
        </Box>
        <Typography
          variant="h5"
          color="red"
          sx={{
            paddingTop: 1,
            paddingBottom: 1
          }}>
          {`$${price.amount} ${price.currencyCode}`}
        </Typography>
        {saleReason && (
          <>
            <Tooltip title={'Why Is This Item On Sale?'}>
              <IconButton edge="start" size="small" onClick={handleClickOpen}>
                <HelpOutline />
              </IconButton>
            </Tooltip>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="sale-reason-dialog-title"
              aria-describedby="sale-reason-dialog-description">
              <DialogTitle id="sale-reason-dialog-title" sx={{ marginBottom: 2 }}>
                {'Why Is This Item On Sale?'}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="sale-reason-dialog-description">
                  {saleReason.value}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Close</Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </Stack>
    );
  }

  return (
    <Typography
      variant="h5"
      color="#414042"
      sx={{
        paddingTop: 1,
        paddingBottom: 1
      }}>
      {`$${price.amount} ${price.currencyCode}`}
    </Typography>
  );
}
