import React from "react"
import { Box, Stack, Typography, TextField } from "@mui/material"
import { Hiking } from "@mui/icons-material"

export function ThruHikerForm() {
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
          Let us know who will be picking up the order and the estimated pickup date so we can be sure your package is routed correctly!
          <br /><br />
          Your order will be labeled with a large sticker indicating the hiker's name and estimated pickup date so it can be easily identified by the postal service and the location holding the package for pickup.
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="Thru-Hiker Full Name"
        />
        <TextField
          required
          id="outlined-required"
          label="Thru-Hiker Estimated Pickup Date"
        />
      </Stack>
    </Box>
  )
}
