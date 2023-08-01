import { useLocation } from '@gatsbyjs/reach-router';
import {
  Badge,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import { navigate } from 'gatsby';
import React, { useEffect, useState } from 'react';

import {
  fShopify,
  financialStatusColor,
  fulfillmentStatusChipColor,
  getReturnEligible
} from '../../../utils';
import { SupportTicketDialog } from './SupportTicketDialog';

export const OrderCard = ({ order, firstName, lastName, email }) => {
  const [ticketDialogOpen, setTicketDialogOpen] = useState(false);
  const [returnEligible, setReturnEligible] = useState(false);

  const {
    name,
    processedAt,
    fulfillmentStatus,
    financialStatus,
    currencyCode,
    totalPrice,
    lineItems,
    shippingAddress,
    successfulFulfillments
  } = order.node;

  console.log(lineItems.edges[0].node.title);

  const { pathname } = useLocation();

  const handleOrderDetails = (name) => {
    navigate(`${pathname}?orders=${encodeURIComponent(name)}`, {
      replace: true
    });
  };

  const handleSupportDialogClose = () => {
    setTicketDialogOpen(false);
  };

  const handleReturnEligibility = async (ord) => {
    if (!ord) return false;

    const res = await getReturnEligible({ order: ord, overrideDate: false });

    if (res && res.data && res.data.data && res.data.data.returnableFulfillments) {
      if (
        res.data.data.returnableFulfillments.edges &&
        res.data.data.returnableFulfillments.edges.length > 0
      ) {
        /* console.log(res) */
        return true;
      }
    }

    return false;
  };

  useEffect(() => {
    if (order) {
      handleReturnEligibility(order).then((res) => {
        setReturnEligible(res);
      });
    }
  }, [order]);

  /* console.log(order); */

  return (
    <Paper>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ paddingTop: 1, paddingBottom: 1, paddingLeft: 2, paddingRight: 2 }}>
        <Box>
          <Typography variant="caption">Order #:</Typography>
          <Typography variant="h5">{name}</Typography>
        </Box>
        <Box>
          <Typography variant="caption">Date Placed:</Typography>
          <Typography>{fShopify(processedAt)}</Typography>
        </Box>
        <Chip
          label={fulfillmentStatus}
          variant="filled"
          color={fulfillmentStatusChipColor(fulfillmentStatus)}
        />
      </Stack>

      <Divider />

      <Box sx={{ margin: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} lg={7}>
            {lineItems &&
              lineItems.edges.map((item, index) => {
                if (!item.node) {
                  console.warn('item.node is null or undefined', item);
                  return <Box key={index}>Item is no longer available or was discontinued.</Box>;
                }
                const { title, variant } = item.node;
                if (!variant) {
                  console.warn('item.node.variant is null or undefined', item);
                  return <Box key={index}>Item is no longer available or was discontinued.</Box>;
                }
                const { title: variantTitle, image } = variant;
                if (!image) {
                  console.warn('item.node.variant.image is null or undefined', item);
                  return <Box key={index}>Item is no longer available or was discontinued.</Box>;
                }
                const { url, altText } = image;
                const { quantity } = item.node;
                return (
                  <Box sx={{ margin: 1 }} key={title}>
                    <Tooltip title={`${title && title} ${variantTitle && variantTitle}`}>
                      <Badge badgeContent={quantity} color="primary">
                        <img src={url} alt={altText} height={'80px'} width={'80px'} />
                      </Badge>
                    </Tooltip>
                  </Box>
                );
              })}
          </Grid>
          <Grid item xs={12} sm={4} lg={5}>
            <Stack spacing={1}>
              <Button variant="outlined" onClick={() => handleOrderDetails(name)}>
                View Order
              </Button>
              {successfulFulfillments &&
                successfulFulfillments.length > 0 &&
                successfulFulfillments[0].trackingInfo &&
                successfulFulfillments[0].trackingInfo.url && (
                  <Button
                    variant="outlined"
                    onClick={() =>
                      window.open(successfulFulfillments[0].trackingInfo.url, '_blank')
                    }>
                    Track Package
                  </Button>
                )}
              {returnEligible && (
                <Button
                  variant="outlined"
                  onClick={() =>
                    navigate(`/returns?orderName=${encodeURIComponent(name)}`, {
                      replace: true
                    })
                  }>
                  Return / Replace
                </Button>
              )}
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
        sx={{ paddingTop: 1, paddingBottom: 1, paddingLeft: 2, paddingRight: 2 }}>
        <Box>
          <Typography variant="caption">Ship To:</Typography>
          <Typography>
            {shippingAddress && `${shippingAddress.firstName} ${shippingAddress.lastName}`}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption">{`Total (${currencyCode}):`}</Typography>
          <Typography>{`$${totalPrice}`}</Typography>
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
    </Paper>
  );
};
