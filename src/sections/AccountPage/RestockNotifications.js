import React from "react"
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip
} from "@mui/material"
import { Delete } from '@mui/icons-material';

export const RestockNotifications = () => {

  return (
    <List >
      <ListItem
        sx={{ border: "1px solid #e0e0e0", borderRadius: 2, }}
        secondaryAction={
          <Tooltip title="Remove Notification">
            <IconButton edge="end" aria-label="delete">
              <Delete />
            </IconButton>
          </Tooltip>
        }>
        <ListItemText primary="Single Hammock" secondary="Forest Green" />
      </ListItem>
    </List>
  )
}
