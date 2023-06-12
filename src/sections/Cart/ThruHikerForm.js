import { Hiking } from '@mui/icons-material';
import { Box, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

export function ThruHikerForm({ handleAttributes }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  const handleName = async () => {
    console.log('Name', name);
    handleAttributes({ key: 'Thru-Hiker Full Name', value: name });
  };

  const handleDate = async () => {
    console.log('Date', date);
    handleAttributes({ key: 'Thru-Hiker Estimated Pickup Date', value: date });
  };

  return (
    <Box>
      <Stack spacing={2} direction="row" justifyContent="flex-start">
        <Hiking />
        <Typography pb="20px" variant="h6">
          ORDERING FOR A THRU-HIKER?
        </Typography>
      </Stack>
      <Stack spacing={2}>
        <Typography variant="body1" sx={{ paddingBottom: 2 }}>
          Let us know who will be picking up the order and the estimated pickup date so we can be
          sure your package is routed correctly!
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="Thru-Hiker Full Name"
          onChange={(event) => setName(event.target.value)}
          onBlur={() => handleName()}
        />
        <TextField
          required
          id="outlined-required"
          label="Thru-Hiker Estimated Pickup Date"
          onChange={(event) => setDate(event.target.value)}
          onBlur={() => handleDate()}
        />
        <Typography variant="body1" sx={{ paddingTop: 2, paddingBottom: 2 }}>
          Your order will be labeled with a large sticker indicating the hiker's name and estimated
          pickup date so it can be easily identified by the postal service and the location holding
          the package for pickup.
        </Typography>
      </Stack>
    </Box>
  );
}
