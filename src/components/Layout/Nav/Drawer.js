import React from "react"
import { Drawer, List, ListItemButton, ListItemText } from "@mui/material"
import { useUIContext } from "contexts"

export const AppDrawer = () => {
  const { drawerOpen } = useUIContext()

  return (
    <Drawer
      PaperProps={{
        sx: { width: "100%", pt: "44px" },
      }}
      anchor="top"
      open={drawerOpen}
    >
      <List>
        <ListItemButton>
          <ListItemText>Hammocks</ListItemText>
        </ListItemButton>
        <ListItemButton>
          <ListItemText>Hammocks</ListItemText>
        </ListItemButton>
        <ListItemButton>
          <ListItemText>Hammocks</ListItemText>
        </ListItemButton>
        <ListItemButton>
          <ListItemText>Hammocks</ListItemText>
        </ListItemButton>
        <ListItemButton>
          <ListItemText>Hammocks</ListItemText>
        </ListItemButton>
      </List>
    </Drawer>
  )
}
