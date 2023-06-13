import { Box, Chip, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import { fShopify } from 'utils/formatTime';

import { SupportMessageReplyForm } from './SupportMessageReplyForm';
import { SupportTicketMessage } from './SupportTicketMessage';

/* /products/single-hammock */
export const SupportTicket = ({ ticket }) => {
  /* console.log(ticket) */

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'primary';
      case 'closed':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'primary';
    }
  };

  if (!ticket) return null;

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{
          paddingLeft: 2,
          paddingRight: 2,
          paddingBottom: 2
        }}>
        <Typography variant="h5">{`Ticket ${ticket.number}`}</Typography>
        <Chip color={getStatusColor(ticket.status)} label={ticket.status.toUpperCase()} />
      </Stack>
      <Divider />
      <Box
        sx={{
          paddingTop: 2,
          paddingLeft: 2,
          paddingRight: 2
        }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          {ticket.subject}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ marginBottom: 2 }}>
          <Typography variant="body1">
            <b>Created: </b>
            {fShopify(ticket.createdAt)}
          </Typography>
          <Typography variant="body1">
            <b>Updated: </b>
            {fShopify(ticket.updatedAt)}
          </Typography>
        </Stack>
      </Box>

      <SupportMessageReplyForm
        customerId={ticket.customer.id}
        email={ticket.customer.email}
        conversationId={ticket.id}
      />

      {ticket?._embedded?.threads &&
        ticket._embedded.threads.map(
          (thread) =>
            thread.type !== 'note' && <SupportTicketMessage thread={thread} key={thread.id} />
        )}
    </Box>
  );
};
