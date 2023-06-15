import { useLocation } from '@gatsbyjs/reach-router';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import {
  fulfillmentStatusChipColor,
  getNumberOfDays,
  getReturnEligible,
  returnStatusChipColor
} from '../../utils';

const validationSchema = yup.object({
  orderName: yup.string().trim(),
  email: yup.string().trim().email('Please enter a valid email address')
});

export function ReturnsOrderLookup({
  selectedOrder,
  orders,
  handleSelectedOrder,
  handleOrders,
  handleOpenTicketDialog
}) {
  const [returnStatusLoading, setReturnStatusLoading] = useState(false);
  const [localOrders, setLocalOrders] = useState([]);

  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const paramsOrderName = params.get('orderName');

  const timestamp = new Date().getTime();

  const handleOrderAge = (orderDate) => {
    if (!orderDate) return null;

    const days = getNumberOfDays(Date.parse(orderDate), timestamp);

    if (days <= 60) {
      return <Typography color="success">{days} days</Typography>;
    } else if (days > 60 && days <= 180) {
      return <Typography color="warning">{days} days</Typography>;
    } else if (days > 180 && days <= 360) {
      return <Typography color="error">{days} days</Typography>;
    } else if (days > 360) {
      return <Typography color="error">{(days / 360).toFixed(1)} years</Typography>;
    } else {
      return <Typography>{days} days</Typography>;
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async (data) => {
    let newOrders;

    if (data.orderName) {
      const url =
        process.env.GATSBY_FIREBASE_FUNCTIONS_URL + '/api/v1/shopifyAdmin/get_order_by_name';

      newOrders = await axios
        .post(url, { orderName: data.orderName })
        .then((res) => {
          return res.data.data.orders.edges;
        })
        .catch((error) => {
          console.log(error);
          toast.error('Error searching for orders, please try again');
        });
    }

    if (data.email) {
      const url =
        process.env.GATSBY_FIREBASE_FUNCTIONS_URL + '/api/v1/shopifyAdmin/get_orders_by_email';

      newOrders = await axios
        .post(url, { email: data.email })
        .then((res) => {
          return res.data.data.orders.edges;
        })
        .catch((error) => {
          console.log(error);
          toast.error('Error searching for orders, please try again');
        });
    }

    if (newOrders && newOrders.length > 0) {
      setReturnStatusLoading(true);

      Promise.all(
        newOrders.map(async (order, index) => {
          await getReturnEligible({ order: order, overrideDate: false }).then((res) => {
            if (
              res &&
              res.data &&
              res.data.data &&
              res.data.data.returnableFulfillments &&
              res.data.data.returnableFulfillments.edges.length > 0
            ) {
              newOrders[index].node.returnableFulfillment =
                res.data.data.returnableFulfillments.edges[0].node;
            }
          });
        })
      ).then(() => {
        setReturnStatusLoading(false);
        handleOrders(newOrders);
      });
    } else {
      handleOrders(null);
    }
  };

  const hydrateOrderFromParams = async (paramsOrderName) => {
    if (!paramsOrderName) return null;
    setValue('orderName', paramsOrderName);
    handleSubmit(onSubmit)();
  };

  useEffect(() => {
    if (paramsOrderName && !orders && !selectedOrder) {
      hydrateOrderFromParams(paramsOrderName);
    }
    if (orders && orders.length > 0) {
      setLocalOrders([...orders]);
    } else {
      setLocalOrders([]);
    }
  }, [paramsOrderName, orders]);

  return (
    <Box padding="30px" justifyContent="center" display="flex">
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ padding: 2, borderRight: { xs: '0', md: '1px solid rgba(0,0,0,0.12)' } }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextField
                label="Order Number"
                variant="outlined"
                {...register('orderName')}
                fullWidth
                error={!!errors.orderName}
                helperText={errors.orderName?.message}
              />
              <TextField
                label="Email Address"
                variant="outlined"
                {...register('email')}
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <LoadingButton size="large" variant="contained" type="submit" loading={isSubmitting}>
                Search
              </LoadingButton>
            </Stack>
          </form>
        </Grid>
        {localOrders && localOrders.length > 0 ? (
          <Grid item xs={12} md={8}>
            <Stack>
              {localOrders.map((order) => (
                <Paper
                  key={order.node.id}
                  sx={{
                    padding: 2,
                    marginBottom: 2,
                    border:
                      selectedOrder && selectedOrder.id === order.node.id
                        ? '2px solid #000'
                        : 'none'
                  }}>
                  <Stack direction="row" justifyContent="space-between" spacing={2}>
                    <Stack>
                      <Typography variant="caption">Order #:</Typography>
                      <Typography>{order.node.name}</Typography>
                    </Stack>
                    <Stack alignItems="center">
                      <Typography variant="caption">Order Age:</Typography>
                      {handleOrderAge(order.node.createdAt)}
                    </Stack>
                    <Stack alignItems="center">
                      <Typography variant="caption">Order Items:</Typography>
                      <Typography>{order.node.lineItems.edges.length}</Typography>
                    </Stack>
                  </Stack>
                  <Divider />
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    spacing={2}
                    sx={{ marginTop: 2 }}>
                    {order.node.displayFulfillmentStatus && (
                      <Chip
                        label={order.node.displayFulfillmentStatus}
                        variant="filled"
                        color={fulfillmentStatusChipColor(order.node.displayFulfillmentStatus)}
                      />
                    )}
                    {order.node.returnStatus &&
                      order.node.returnStatus !== 'null' &&
                      order.node.returnStatus !== 'NO_RETURN' && (
                        <Chip
                          label={order.node.returnStatus}
                          variant="filled"
                          color={returnStatusChipColor(order.node.returnStatus)}
                        />
                      )}
                    {returnStatusLoading ? (
                      <CircularProgress />
                    ) : (
                      <Box>
                        {order.node.returnableFulfillment ? (
                          <Checkbox
                            checked={selectedOrder && selectedOrder.id === order.node.id}
                            onClick={() => handleSelectedOrder(order.node)}
                          />
                        ) : (
                          <Button
                            variant="outlined"
                            onClick={() => handleOpenTicketDialog(order.node.name)}>
                            Get Help
                          </Button>
                        )}
                      </Box>
                    )}
                  </Stack>
                </Paper>
              ))}
            </Stack>
            <Typography>
              Orders up to <b>90 days</b> old are eligible for a quick return. For older orders,
              please contact support.
            </Typography>
          </Grid>
        ) : (
          <Grid item xs={12} md={8}>
            <Typography>
              Please enter your order number or email address to locate your order and begin your
              return request.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
