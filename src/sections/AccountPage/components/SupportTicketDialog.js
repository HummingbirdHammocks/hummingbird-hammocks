import { Close } from '@mui/icons-material';
import { Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';

import { SupportTicketForm } from './SupportTicketForm';

export function SupportTicketDialog({
  firstName,
  lastName,
  email,
  orderNumber,
  open,
  handleClose
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography variant="h5">Create Ticket</Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <SupportTicketForm
          firstName={firstName}
          lastName={lastName}
          email={email}
          orderNumber={orderNumber}
        />
      </DialogContent>
    </Dialog>
  );
}
