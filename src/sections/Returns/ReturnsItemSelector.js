import {
  Box,
  Button,
  Checkbox,
  Chip,
  Collapse,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React from 'react';

import { fShopify, fulfillmentStatusChipColor } from '../../utils';

const reasons = [
  {
    value: 'COLOR',
    label: 'Color Exchange'
  },
  {
    value: 'DEFECTIVE',
    label: 'Defective'
  },
  {
    value: 'NOT_AS_DESCRIBED',
    label: 'Not As Described'
  },
  {
    value: 'OTHER',
    label: 'Other'
  },
  {
    value: 'SIZE_TOO_LARGE',
    label: 'Too Large'
  },
  {
    value: 'SIZE_TOO_SMALL',
    label: 'Too Small'
  },
  {
    value: 'STYLE',
    label: 'Wrong Style'
  },
  {
    value: 'UNWANTED',
    label: 'Bought By Mistake'
  },
  {
    value: 'WRONG_ITEM',
    label: 'Wrong Item'
  }
];

export function ReturnsItemSelector({
  selectedOrder,
  selectedItems,
  handleSelectedItem,
  handleReasonChange,
  handleCommentChange,
  handleQuantityChange,
  handleOpenTicketDialog
}) {
  /* console.log(selectedOrder) */

  const handleIsSelectedItem = (id) => {
    if (!selectedItems || selectedItems.length === 0) return false;

    const index = selectedItems.map((item) => item.id).indexOf(`${id}`);

    if (index !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const handleQuantityLimits = (id, value, returnableQuantity) => {
    if (value <= 1) {
      handleQuantityChange(id, 1);
    } else if (value <= returnableQuantity) {
      handleQuantityChange(id, value);
    } else {
      handleQuantityChange(id, returnableQuantity);
    }
  };

  if (
    !selectedOrder ||
    !selectedOrder.returnableFulfillment ||
    selectedOrder.returnableFulfillment.length === 0
  ) {
    return (
      <Box padding="30px" justifyContent="center" display="flex">
        <Typography>
          This order has no items eligible for return. Please try again or contact support.
        </Typography>
      </Box>
    );
  }

  return (
    <Box paddingTop="30px" paddingBottom="30px" justifyContent="center" display="flex">
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ padding: 2, borderRight: { xs: '0', md: '1px solid rgba(0,0,0,0.12)' } }}>
          <Stack spacing={2}>
            <Stack direction="row" justifyContent={'space-between'}>
              <Typography>Order #:</Typography>
              <Typography>{selectedOrder.name}</Typography>
            </Stack>
            <Stack direction="row" justifyContent={'space-between'}>
              <Typography>Order Date:</Typography>
              {fShopify(selectedOrder.createdAt)}
            </Stack>
            <Stack direction="row" justifyContent={'space-between'}>
              <Typography>Order Items:</Typography>
              <Typography>{selectedOrder.lineItems.edges.length}</Typography>
            </Stack>
            <Stack direction="row" justifyContent={'space-between'}>
              {selectedOrder.displayFulfillmentStatus && (
                <Chip
                  label={selectedOrder.displayFulfillmentStatus}
                  variant="filled"
                  color={fulfillmentStatusChipColor(selectedOrder.displayFulfillmentStatus)}
                />
              )}
              <Button variant="outlined" onClick={() => handleOpenTicketDialog(selectedOrder.name)}>
                Get Help
              </Button>
            </Stack>
          </Stack>
        </Grid>
        {selectedOrder &&
        selectedOrder.returnableFulfillment &&
        selectedOrder.returnableFulfillment.returnableFulfillmentLineItems &&
        selectedOrder.returnableFulfillment.returnableFulfillmentLineItems.edges.length > 0 ? (
          <Grid item xs={12} md={8}>
            <Stack>
              {selectedOrder.returnableFulfillment.returnableFulfillmentLineItems.edges.map(
                (item) => (
                  <Paper
                    key={item.node.fulfillmentLineItem.id}
                    sx={{
                      padding: 2,
                      marginBottom: 2,
                      border: handleIsSelectedItem(item.node.fulfillmentLineItem.id)
                        ? '2px solid #000'
                        : 'none'
                    }}>
                    <Grid container>
                      <Grid item xs={12} sm={4}>
                        <img
                          src={item.node.fulfillmentLineItem.lineItem.image.url}
                          alt={item.node.fulfillmentLineItem.lineItem.image.altText}
                          height={'80px'}
                          width={'80px'}
                        />
                      </Grid>
                      <Grid item xs={12} sm={8}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          spacing={2}>
                          <Stack>
                            <Typography variant="caption">Name:</Typography>
                            <Typography>{item.node.fulfillmentLineItem.lineItem.name}</Typography>
                          </Stack>
                          <Checkbox
                            checked={handleIsSelectedItem(item.node.fulfillmentLineItem.id)}
                            onClick={() => handleSelectedItem(item.node.fulfillmentLineItem)}
                          />
                        </Stack>
                        <Divider />
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          spacing={2}
                          sx={{ marginTop: 1 }}>
                          <Stack>
                            <Typography variant="caption">SKU:</Typography>
                            {item.node.fulfillmentLineItem.lineItem.sku}
                          </Stack>
                          <Stack>
                            <Typography variant="caption">Paid:</Typography>
                            {
                              item.node.fulfillmentLineItem.discountedTotalSet.presentmentMoney
                                .amount
                            }{' '}
                            {
                              item.node.fulfillmentLineItem.discountedTotalSet.presentmentMoney
                                .currencyCode
                            }
                          </Stack>
                          <Stack alignItems="center">
                            <Typography variant="caption">Returnable:</Typography>
                            <Typography>
                              {item.node.fulfillmentLineItem.lineItem.refundableQuantity}
                            </Typography>
                          </Stack>
                        </Stack>
                        <Collapse
                          in={handleIsSelectedItem(item.node.fulfillmentLineItem.id)}
                          timeout="auto"
                          unmountOnExit>
                          <Stack spacing={2} sx={{ marginTop: 2 }}>
                            <Stack direction="row" spacing={2}>
                              <FormControl fullWidth>
                                <InputLabel id="reason-select-label">Reason *</InputLabel>
                                <Select
                                  labelId="reason-select-label"
                                  id="reason-select"
                                  value={item.node.fulfillmentLineItem.returnReason || ''}
                                  label="Reason *"
                                  onChange={(event) =>
                                    handleReasonChange(
                                      item.node.fulfillmentLineItem.id,
                                      event.target.value
                                    )
                                  }>
                                  {reasons.map((reason) => (
                                    <MenuItem key={reason.value} value={reason.value}>
                                      {reason.label}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              <Stack direction="row" spacing={2}>
                                <TextField
                                  id="quantity"
                                  label="Qty *"
                                  InputProps={{
                                    inputProps: {
                                      style: { textAlign: 'center' }
                                    }
                                  }}
                                  type="number"
                                  value={
                                    item.node.fulfillmentLineItem.returnQuantity ||
                                    item.node.fulfillmentLineItem.lineItem.refundableQuantity
                                  }
                                  onChange={(event) =>
                                    handleQuantityLimits(
                                      item.node.fulfillmentLineItem.id,
                                      event.target.value,
                                      item.node.fulfillmentLineItem.lineItem.refundableQuantity
                                    )
                                  }
                                  sx={{ width: '80px' }}
                                />
                              </Stack>
                            </Stack>
                            <TextField
                              id="comments"
                              label="Comments *"
                              multiline
                              rows={4}
                              onChange={(event) =>
                                handleCommentChange(
                                  item.node.fulfillmentLineItem.id,
                                  event.target.value
                                )
                              }
                              defaultValue={item.node.fulfillmentLineItem.customerComments || ''}
                            />
                          </Stack>
                        </Collapse>
                      </Grid>
                    </Grid>
                  </Paper>
                )
              )}
            </Stack>
          </Grid>
        ) : (
          <Grid item xs={12} md={8}>
            <Typography>Error getting returnable line items, please try again.</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
