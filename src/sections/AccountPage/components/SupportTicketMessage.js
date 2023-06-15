import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import React from 'react';

import { fShopify } from '../../../utils';

export const SupportTicketMessage = ({ thread }) => {
  /* console.log(thread) */

  const handleHeader = (type, createdBy) => {
    switch (type) {
      case 'customer':
        return 'You';
      case 'message':
        if (createdBy) {
          return `Support Agent: ${createdBy.firstName}`;
        }
        return 'Support';
      default:
        return 'Message';
    }
  };

  if (!thread || thread.body === null) return null;

  return (
    <Box
      sx={{
        borderColor: 'divider',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderRadius: '20px',
        marginTop: 4,
        backgroundColor: thread.type === 'customer' ? '#FFFFFF' : '#F0F8EF'
      }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{
          padding: 2
        }}>
        <Typography variant="h6">{handleHeader(thread.type, thread.createdBy)}</Typography>
        <Typography variant="body1">{fShopify(thread.createdAt)}</Typography>
      </Stack>
      <Divider />
      <Box sx={{ paddingTop: 4, paddingBottom: 4, paddingLeft: 2, paddingRight: 2 }}>
        <Typography variant="div">
          <div dangerouslySetInnerHTML={{ __html: thread.body }} />
        </Typography>
      </Box>
      {thread?._embedded?.attachments && (
        <Grid container spacing={2} sx={{ padding: 2 }}>
          {thread._embedded.attachments.map((attachment) => (
            <Grid item xs={6} md={4} lg={3} key={attachment.id}>
              <a
                href={attachment.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={attachment.fileName}>
                <img
                  style={{ width: '100%', borderRadius: '10px' }}
                  alt={attachment.fileName}
                  src={attachment.fileUrl}
                />
              </a>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};
