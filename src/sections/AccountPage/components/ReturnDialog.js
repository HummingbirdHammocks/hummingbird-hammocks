import React from "react"
import {
  Typography,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent
} from "@mui/material"
import { Close } from "@mui/icons-material"

import { ReturnForm } from "./ReturnForm"

export function ReturnDialog({ id, open, handleClose }) {

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="h5">
            Return Request
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <ReturnForm orderId={id} />
      </DialogContent>
    </Dialog>
  )
}