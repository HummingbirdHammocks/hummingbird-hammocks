import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { navigate } from 'gatsby';
import React, { useEffect, useState } from 'react';

import { fShopify, getReturnEligible } from '../../../utils';
import { SupportTicketForm } from './SupportTicketForm';

export const OrderDetails = ({ firstName, lastName, email, data, returnAccount }) => {
  const [returnEligible, setReturnEligible] = useState(false);

  const {
    name,
    processedAt,
    totalPrice,
    subtotalPrice,
    totalShippingPrice,
    currentTotalTax,
    financialStatus,
    fulfillmentStatus,
    lineItems,
    shippingAddress,
    successfulFulfillments
  } = data.node;

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
    if (data) {
      handleReturnEligibility(data).then((res) => {
        setReturnEligible(res);
      });
    }
  }, [data]);

  return (
    <Box>
      <Box pb="20px" justifyContent="space-between" display={{ xs: 'inline-block', sm: 'flex' }}>
        <Box>
          <Typography variant="h4">Order {name}</Typography>
          <Typography variant="subtitle2">{fShopify(processedAt)}</Typography>
        </Box>
        <Stack spacing={1}>
          <Button variant="outlined" onClick={() => returnAccount()}>
            Return to All Orders
          </Button>
          {successfulFulfillments &&
            successfulFulfillments.length > 0 &&
            successfulFulfillments[0].trackingInfo &&
            successfulFulfillments[0].trackingInfo.url && (
              <Button
                variant="outlined"
                onClick={() => window.open(successfulFulfillments[0].trackingInfo.url, '_blank')}>
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
        </Stack>
      </Box>

      <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
        <Chip label={financialStatus} />
        <Chip label={fulfillmentStatus} variant="outlined" />
      </Stack>

      <Box
        sx={{
          padding: '30px 0'
        }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell align="right">SKU</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lineItems.edges.map((row, index) => {
                const { title, discountedTotalPrice, originalTotalPrice, variant, quantity } =
                  row.node;

                return (
                  <TableRow
                    key={index}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 }
                    }}>
                    <TableCell scope="row">{title}</TableCell>
                    <TableCell align="right">{variant && variant.sku && variant.sku}</TableCell>
                    <TableCell align="right">${originalTotalPrice.amount}</TableCell>
                    <TableCell align="right">{quantity}</TableCell>
                    <TableCell align="right">${discountedTotalPrice.amount}</TableCell>
                  </TableRow>
                );
              })}
              <TableRow
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 }
                }}>
                <TableCell align="right" colSpan={4}>
                  Sub Total
                </TableCell>
                <TableCell align="right">${subtotalPrice?.amount}</TableCell>
              </TableRow>
              <TableRow
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 }
                }}>
                <TableCell align="right" colSpan={4}>
                  Shipping
                </TableCell>
                <TableCell align="right">${totalShippingPrice?.amount}</TableCell>
              </TableRow>
              <TableRow
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 }
                }}>
                <TableCell align="right" colSpan={4}>
                  Total Tax
                </TableCell>
                <TableCell align="right">${currentTotalTax.amount}</TableCell>
              </TableRow>
              <TableRow
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 }
                }}>
                <TableCell align="right" colSpan={4}>
                  Total
                </TableCell>
                <TableCell align="right">${totalPrice?.amount}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2} sx={{ marginTop: 4 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5">SHIPPING ADDRESS</Typography>
            <Typography mt={{ xs: '10px', md: '20px' }} variant="body1">
              <b>
                {shippingAddress?.firstName.toLocaleUpperCase()}{' '}
                {shippingAddress?.lastName.toLocaleUpperCase()}{' '}
              </b>
              <br />
              {shippingAddress.address1}
              <br />
              {shippingAddress.address2 && (
                <>
                  {shippingAddress.address2} <br />
                </>
              )}
              {shippingAddress.city}, {shippingAddress.zip}
              <br />
              {shippingAddress.country}
              <br />
              {shippingAddress?.phone}
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                borderColor: 'divider',
                borderStyle: 'solid',
                borderWidth: '1px',
                borderRadius: '30px',
                marginTop: { xs: 4, md: 0 }
              }}>
              <Typography sx={{ padding: 3 }} variant="h5">
                NEED HELP WITH THIS ORDER?
              </Typography>
              <Divider />
              <Typography
                sx={{
                  paddingTop: 2,
                  paddingLeft: 2,
                  paddingRight: 2
                }}
                variant="body1">
                Your name, email, and order number will automatically be added to your ticket so we
                can assist you efficiently.
              </Typography>
              <SupportTicketForm
                firstName={firstName}
                lastName={lastName}
                email={email}
                orderNumber={name}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
