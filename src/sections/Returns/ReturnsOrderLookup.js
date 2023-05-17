import React, { useCallback, useState } from "react"
import axios from "axios"
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
    Box,
    Grid,
    Stack,
    TextField,
    Typography,
    Paper,
    Button,
    Checkbox,
    Chip,
} from "@mui/material"
import { LoadingButton } from '@mui/lab';

import { getNumberOfDays } from "utils/formatTime";
import { SupportTicketDialog } from "../AccountPage/components/SupportTicketDialog";
import { fulfillmentStatusChipColor } from "../../utils/shopify";

const validationSchema = yup.object({
    orderName: yup
        .string()
        .trim(),
    email: yup
        .string()
        .trim()
        .email('Please enter a valid email address'),
});

export function ReturnsOrderLookup({ selectedOrder, orders, handleSelectedOrder, handleOrders }) {
    const [submitting, setSubmitting] = useState(false);
    const [ticketDialogOpen, setTicketDialogOpen] = useState(false);
    const [ticketOrderName, setTicketOrderName] = useState("");

    const timestamp = new Date().getTime() + (180 * 24 * 60 * 60 * 1000)

    const handleOpenTicketDialog = (name) => {
        setTicketOrderName(name);
        setTicketDialogOpen(true);
    }

    const handleSupportDialogClose = () => {
        setTicketOrderName("");
        setTicketDialogOpen(false);
    }

    const handleOrderAge = (orderDate) => {
        if (!orderDate) return null;

        const days = getNumberOfDays(Date.parse(orderDate), timestamp);

        if (days <= 60) {
            return (
                <Typography color="success">
                    {days} days
                </Typography >
            )
        } else if (days > 60 && days <= 180) {
            return (
                <Typography color="warning">
                    {days} days
                </Typography >
            )
        } else if (days > 180 && days <= 360) {
            return (
                <Typography color="error">
                    {days} days
                </Typography >
            )
        } else if (days > 360) {
            return (
                <Typography color="error">
                    {(days / 360).toFixed(1)} years
                </Typography >
            )
        } else {
            return (
                <Typography>
                    {days} days
                </Typography >
            )
        }
    }

    const initialValues = {
        orderName: '',
        email: '',
    };

    const onSubmit = async ({ orderName, email }) => {
        setSubmitting(true);

        console.log(orderName, email);

        let newOrders;

        if (orderName) {
            const url = process.env.GATSBY_FIREBASE_FUNCTIONS_URL + '/api/v1/shopifyAdmin/get_order_by_name';

            newOrders = await axios.post(url, { orderName: orderName })
                .then((res) => {
                    console.log(res);
                    return res.data.data.orders.edges;
                })
                .catch((error) => {
                    console.log(error);
                    toast.error("Error searching for orders, please try again")
                });
        }

        if (email) {
            const url = process.env.GATSBY_FIREBASE_FUNCTIONS_URL + '/api/v1/shopifyAdmin/get_orders_by_email';

            newOrders = await axios.post(url, { email: email })
                .then((res) => {
                    console.log(res);
                    return res.data.data.orders.edges;
                })
                .catch((error) => {
                    console.log(error);
                    toast.error("Error searching for orders, please try again")
                });
        }

        if (newOrders) {
            console.log(newOrders);

            const url = process.env.GATSBY_FIREBASE_FUNCTIONS_URL + '/api/v1/shopifyAdmin/check_return_eligible';

            Promise.all(
                newOrders.map(async (order, index) => {
                    if (Date.parse(order.node.createdAt) > timestamp || true) {
                        axios.post(url, { orderId: order.node.id })
                            .then((res) => {
                                console.log(res);
                                if (res.data.data.returnableFulfillments.edges.length > 0) {
                                    newOrders[index].node.returnableFulfillment = res.data.data.returnableFulfillments.edges[0].node;
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                                toast.error("Error getting order return elgibility, please try again")
                            });
                    } else {
                        return false;
                    }
                })
            ).then(() => {
                console.log("checkReturnElgibility: ", newOrders);
                handleOrders(newOrders);
            });
        }

        setSubmitting(false);
    };

    console.log(orders)

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        onSubmit,
    });

    return (
        <Box padding="30px" justifyContent="center" display="flex">
            <Grid container spacing={2}>
                <Grid item xs={12} md={4} sx={{ padding: 2, borderRight: { xs: "0", md: "1px solid rgba(0,0,0,0.12)" } }}>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                label="Order Number"
                                variant="outlined"
                                name={'orderName'}
                                fullWidth
                                value={formik.values.orderName}
                                onChange={formik.handleChange}
                                error={formik.touched.orderName && Boolean(formik.errors.orderName)}
                                helperText={formik.touched.orderName && formik.errors.orderName}
                            />
                            <TextField
                                label="Email Address"
                                variant="outlined"
                                name={'email'}
                                fullWidth
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <LoadingButton
                                size={'large'}
                                variant={'contained'}
                                type={'submit'}
                                loading={formik.isSubmitting || submitting}
                            >
                                Search
                            </LoadingButton>
                        </Stack>
                    </form>
                </Grid>
                {orders && orders.length > 0 ? (
                    <Grid item xs={12} md={8}>
                        <Stack>
                            {orders.map((order) => (
                                <Paper sx={{ padding: 2, marginBottom: 2 }} key={order.node.id}>
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        spacing={2}
                                    >
                                        <Stack>
                                            <Typography variant="caption">
                                                Order #:
                                            </Typography>
                                            <Typography >
                                                {order.node.name}
                                            </Typography>
                                        </Stack>
                                        <Stack alignItems="center">
                                            <Typography variant="caption">
                                                Order Age:
                                            </Typography>
                                            {handleOrderAge(order.node.createdAt)}
                                        </Stack>
                                        <Stack alignItems="center">
                                            <Typography variant="caption">
                                                Items:
                                            </Typography>
                                            <Typography >
                                                {order.node.lineItems.edges.length}
                                            </Typography>
                                        </Stack>
                                        {order.node.displayFulfillmentStatus &&
                                            <Chip label={order.node.displayFulfillmentStatus} variant="filled" color={fulfillmentStatusChipColor(order.node.displayFulfillmentStatus)} />
                                        }
                                        <Box>
                                            {order.node.returnableFulfillment && order.node.returnableFulfillment.length !== 0 ? (
                                                <Checkbox checked={selectedOrder && selectedOrder.id === order.node.id ? true : false} onClick={() => handleSelectedOrder(order.node)} />
                                            ) : (
                                                <Button variant="outlined" onClick={() => handleOpenTicketDialog(order.node.name)}>
                                                    Get Help
                                                </Button>
                                            )}
                                        </Box>
                                    </Stack>
                                </Paper>
                            ))}
                        </Stack>
                        <Typography>
                            Orders up to <b>180 days</b> old are eligible for a quick return. For older orders, please contact support.
                        </Typography>
                    </Grid>
                ) : (
                    <Grid item xs={12} md={8}>
                        <Typography>
                            Please enter your order number or email address to locate your order and begin your return request.
                        </Typography>
                    </Grid>
                )}
            </Grid>
            <SupportTicketDialog
                orderNumber={ticketOrderName}
                open={ticketDialogOpen}
                handleClose={handleSupportDialogClose}
            />
        </Box >
    )
}