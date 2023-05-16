import React from "react"
import { navigate } from "gatsby"
import { useLocation } from "@gatsbyjs/reach-router"
import {
  Typography,
  Box,
  Stack,
  Badge,
  Chip,
  Paper,
  Button,
  Divider,
  Tooltip
} from "@mui/material"
import { Pageview } from "@mui/icons-material"

import { fShopify } from "utils/formatTime";

export const OrderCard = ({ order }) => {
  const {
    name,
    processedAt,
    fulfillmentStatus,
    financialStatus,
    currencyCode,
    subtotalPrice,
    totalShippingPrice,
    totalPrice,
    lineItems
  } = order.node

  const { pathname } = useLocation()

  const handleOrderDetails = name => {
    navigate(`${pathname}?orders=${encodeURIComponent(name)}`, {
      replace: true,
    })
  }

  const handleFulfillmentStatusColor = status => {
    switch (status) {
      case "FULFILLED":
        return "success"
      case "IN_PROGRESS":
        return "warning"
      case "ON_HOLD":
        return "warning"
      case "OPEN":
        return "default"
      case "PARTIALLY_FULFILLED":
        return "info"
      case "PENDING_FULFILLMENT":
        return "info"
      case "RESTOCKED":
        return "default"
      case "SCHEDULED":
        return "warning"
      case "UNFULFILLED":
        return "info"
      default:
        return "default"
    }
  }

  const handleFinancialStatusColor = status => {
    switch (status) {
      case "AUTHORIZED":
        return "success"
      case "EXPIRED":
        return "error"
      case "PAID":
        return "success"
      case "PARTIALLY_PAID":
        return "warning"
      case "PARTIALLY_REFUNDED":
        return "warning"
      case "PENDING":
        return "warning"
      case "REFUNDED":
        return "error"
      case "VOIDED":
        return "error"
      default:
        return "default"
    }
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
          <Typography variant="h5">
            {name}
          </Typography>
        </Box>
        <Box>
          <Typography>
            {fShopify(processedAt)}
          </Typography>
        </Box>
        <Chip label={fulfillmentStatus} variant="filled" color={handleFulfillmentStatusColor(fulfillmentStatus)} />
        <Button startIcon={<Pageview />} onClick={() => handleOrderDetails(name)}>
          View
        </Button>
      </Stack>

      <Divider />

      <Box sx={{ marginTop: 2, marginBottom: 2 }}>
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
              <Tooltip title={title} key={index}>
                <Badge badgeContent={quantity} color="primary">
                  <img
                    src={url}
                    alt={altText}
                    height={"80px"}
                    width={"80px"}
                    onClick={() => navigate(`/products/${variantTitle}`)}
                  />
                </Badge>
              </Tooltip>
            </Box>
          )
        })}
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
          <Typography>
            {currencyCode} {totalPrice}
          </Typography>
        </Box>
        <Box>
          <Typography>
            {fShopify(processedAt)}
          </Typography>
        </Box>
        <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
          <Chip label={financialStatus} color={handleFinancialStatusColor(financialStatus)} />
        </Stack>
      </Stack>
    </Paper>
  )
}