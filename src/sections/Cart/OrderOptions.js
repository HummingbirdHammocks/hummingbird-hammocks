import React from "react"
import { Box, FormGroup, FormControlLabel, Stack, Checkbox, Typography } from "@mui/material"
import { CardGiftcard, Receipt, CheckBoxOutlineBlank } from "@mui/icons-material"

export function OrderOptions() {
  return (
    <Box>
      <Typography pb="20px" variant="h6">
        ORDER OPTIONS
      </Typography>
      <Stack spacing={2}>
        <FormGroup>
          <FormControlLabel control={<Checkbox icon={<CheckBoxOutlineBlank />} checkedIcon={<Receipt />} />} label="Include Paper Packing Slip" />
        </FormGroup>
        <Typography variant="body1" sx={{ paddingBottom: 2 }}>
          To reduce waste, we don't print a paper packing slip. If you would like a packing slip please check this box.
        </Typography>
      </Stack>
      <Stack spacing={2}>
        <FormGroup>
          <FormControlLabel control={<Checkbox icon={<CheckBoxOutlineBlank />} checkedIcon={<CardGiftcard />} />} label="Gift Order" />
        </FormGroup>
        <Typography variant="body1" sx={{ paddingBottom: 2 }}>
          Gift orders will include a paper packing slip with no prices.
        </Typography>
      </Stack>
    </Box>
  )
}
