import React, { useEffect, useState } from "react"
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip,
  Stack,
  Typography
} from "@mui/material"
import { Launch/* , Delete */ } from '@mui/icons-material';
//firebase
import { findInCollection, deleteDocument } from 'utils/firebase';

import { Link } from "components"

const dummyData = [{
  email: `loidolt@gmail.com`,
  variantTitle: `Forest Green`,
  variantSku: `SHFG`,
  variantId: `blah`,
  productTitle: `Single Hammock`,
  productHandle: `single-hammock`,
}]

/* /products/single-hammock */
export const RestockNotifications = ({ email }) => {
  const [notifications, setNotifications] = useState(dummyData)

  console.log(notifications)

  useEffect(() => {
    getNotifications()
  }, [email, getNotifications])

  const getNotifications = async () => {
    const result = await findInCollection("restock_notifications", "email", email)
    setNotifications(result)
  }

  /* const handleDelete = async (id) => {
    await deleteDocument("restock_notifications", id)
  } */


  return (
    <List >
      {notifications ? (
        notifications.map((item, index) => (
          <ListItem
            key={index}
            sx={{ marginTop: 1, marginBottom: 1, border: "1px solid #e0e0e0", borderRadius: 2, }}
            secondaryAction={
              <Stack direction="row" spacing={2}>
                <Tooltip title="View Product">
                  <IconButton aria-label="view product" component={Link} to={"/products/" + item.productHandle}>
                    <Launch />
                  </IconButton>
                </Tooltip>
                {/* <Tooltip title="Remove Notification">
                  <IconButton edge="end" aria-label="delete" onClick={(item) => handleDelete(item.id)}>
                    <Delete />
                  </IconButton>
                </Tooltip> */}
              </Stack>
            }>
            <ListItemText primary={item.productTitle} secondary={item.variantTitle} />
          </ListItem >
        ))
      ) : (
        <Typography >No notifications, you can add one from an out of stock product page.</Typography>
      )}
    </List >
  )
}
