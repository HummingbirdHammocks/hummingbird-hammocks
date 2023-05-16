import React, { useState } from "react"
import { navigate } from "gatsby"
import { useLocation } from "@gatsbyjs/reach-router"
import {
  Typography,
  Box,
  Grid,
  Stack,
  Badge,
  Chip,
  Paper,
  Button,
  Divider,
  Tooltip,
} from "@mui/material"

import { SupportTicketDialog } from "./SupportTicketDialog"
import { ReturnDialog } from "./ReturnDialog"
import { fShopify } from "utils/formatTime";
import { fulfillmentStatusChipColor, financialStatusColor } from "../../../utils/shopify"

export const OrderCard = ({ order, firstName, lastName, email }) => {
  const [ticketDialogOpen, setTicketDialogOpen] = useState(false)
  const [returnDialogOpen, setReturnDialogOpen] = useState(false)

  const {
    name,
    processedAt,
    fulfillmentStatus,
    financialStatus,
    currencyCode,
    totalPrice,
    lineItems,
    shippingAddress,
  } = order.node

  const { pathname } = useLocation()

  const handleOrderDetails = name => {
    navigate(`${pathname}?orders=${encodeURIComponent(name)}`, {
      replace: true,
    })
  }

  const handleSupportDialogClose = () => {
    setTicketDialogOpen(false)
  }

  const handleReturnDialogClose = () => {
    setReturnDialogOpen(false)
  }

  console.log(order);

  return (
    <Paper>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ paddingTop: 1, paddingBottom: 1, paddingLeft: 2, paddingRight: 2 }}
      >
        <Box>
          <Typography variant="caption">
            Order #:
          </Typography>
          <Typography variant="h5">
            {name}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption">
            Date Placed:
          </Typography>
          <Typography>
            {fShopify(processedAt)}
          </Typography>
        </Box>
        <Chip label={fulfillmentStatus} variant="filled" color={fulfillmentStatusChipColor(fulfillmentStatus)} />
      </Stack>

      <Divider />

      <Box sx={{ margin: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} lg={7}>
            {lineItems && lineItems.edges.map((item, index) => {
              const {
                title,
                variant: {
                  title: variantTitle,
                  image: {
                    url,
                    altText,
                  },
                },
                quantity,
              } = item.node;
              return (
                <Box sx={{ margin: 1 }}>
                  <Tooltip title={`${title} ${variantTitle}`} key={index}>
                    <Badge badgeContent={quantity} color="primary">
                      <img
                        src={url}
                        alt={altText}
                        height={"80px"}
                        width={"80px"}
                      />
                    </Badge>
                  </Tooltip>
                </Box>
              )
            })}
          </Grid>
          <Grid item xs={12} sm={4} lg={5}>
            <Stack spacing={1}>
              <Button variant="outlined" onClick={() => handleOrderDetails(name)}>
                View Order
              </Button>
              <Button variant="outlined" onClick={() => handleOrderDetails(name)}>
                Track Package
              </Button>
              <Button variant="outlined" onClick={() => setReturnDialogOpen(true)}>
                Return / Replace
              </Button>
              <Button variant="outlined" onClick={() => setTicketDialogOpen(true)}>
                Get Help
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <Divider />

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ paddingTop: 1, paddingBottom: 1, paddingLeft: 2, paddingRight: 2 }}
      >
        <Box>
          <Typography variant="caption">
            Ship To:
          </Typography>
          <Typography>
            {shippingAddress && `${shippingAddress.firstName} ${shippingAddress.lastName}`}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption">
            {`Total (${currencyCode}):`}
          </Typography>
          <Typography>
            {`$${totalPrice}`}
          </Typography>
        </Box>
        <Chip label={financialStatus} color={financialStatusColor(financialStatus)} />
      </Stack>

      <SupportTicketDialog
        firstName={firstName}
        lastName={lastName}
        email={email}
        orderNumber={name}
        open={ticketDialogOpen}
        handleClose={handleSupportDialogClose}
      />
      <ReturnDialog
        firstName={firstName}
        lastName={lastName}
        email={email}
        orderNumber={name}
        open={returnDialogOpen}
        handleClose={handleReturnDialogClose}
      />
    </Paper>
  )
}