import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Box, Stepper, Step, StepLabel, Button, Typography } from '@mui/material';

import { SupportTicketDialog } from "../AccountPage/components";
import {
    ReturnsOrderLookup,
    ReturnsItemSelector,
    ReturnReviewSubmit
} from 'sections';

const steps = [
    {
        label: 'Order Lookup',
        optional: false,
    },
    {
        label: 'Select Items',
        optional: false,
    },
    {
        label: 'Review & Submit',
        optional: false,
    },
];

export function ReturnsStepper() {
    const [orders, setOrders] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [lineItems, setLineItems] = useState([]);
    const [activeStep, setActiveStep] = useState(0);
    const [ticketDialogOpen, setTicketDialogOpen] = useState(false);
    const [ticketOrderName, setTicketOrderName] = useState("");

    const saveOrders = (newOrders) => {
        setOrders(newOrders);
    };

    const saveSelectedOrder = (selected) => {
        if (selectedOrder && selectedOrder.id === selected.id) {
            setSelectedOrder(null);
        } else {
            setSelectedOrder(selected);
        }
    };

    const saveLineItem = (newItem) => {
        console.log(newItem);
        if (lineItems && lineItems.length !== 0 && lineItems.find(item => item.id === newItem.id)) {
            setLineItems(lineItems.filter(item => item.id !== newItem.id));
        } else {
            newItem.returnReason = '';
            newItem.customerComments = '';
            newItem.returnQuantity = newItem.lineItem.refundableQuantity || 0;

            setLineItems([...lineItems, newItem]);
        }
    };

    const saveReturnReason = (id, value) => {
        if (!id || !value) return null;
        console.log(id, value)

        if (lineItems && lineItems.length !== 0) {
            let newItem = lineItems.find(item => item.id === id);
            console.log(newItem)
            if (newItem) {
                newItem.returnReason = value;
                console.log(newItem)
                setLineItems([...lineItems.filter(item => item.id !== id), newItem]);
            }
        }
    };

    const saveCustomerComments = (id, value) => {
        if (!id || !value) return null;
        console.log(id, value)

        if (lineItems && lineItems.length !== 0) {
            let newItem = lineItems.find(item => item.id === id);
            if (newItem) {
                newItem.customerComments = value;
                console.log(newItem)
                setLineItems([...lineItems.filter(item => item.id !== id), newItem]);
            }
        }
    };

    const saveQuantity = (id, value) => {
        if (!id || !value) return null;
        console.log(id, value)

        if (lineItems && lineItems.length !== 0) {
            let newItem = lineItems.find(item => item.id === id);
            console.log(newItem)
            if (newItem) {
                newItem.returnQuantity = value;
                console.log(newItem)
                setLineItems([...lineItems.filter(item => item.id !== id), newItem]);
            }
        }
    };

    const handleOpenTicketDialog = (orderName) => {
        setTicketOrderName(orderName);
        setTicketDialogOpen(true);
    };

    const handleTicketDialogClose = () => {
        setTicketOrderName("");
        setTicketDialogOpen(false);
    }

    const handleActiveNext = (step) => {
        let disabled = true;
        switch (step) {
            case 0:
                if (selectedOrder) {
                    disabled = false;
                }
                break;
            case 1:
                if (lineItems && lineItems.length !== 0) {
                    lineItems.map((item) => {
                        if (item.returnReason !== '' && item.customerComments !== '' && item.returnQuantity !== 0) {
                            disabled = false;
                        }
                    });
                }
                break;
            case 2:
                if (selectedOrder && selectedOrder.id) {
                    if (lineItems && lineItems.length !== 0) {
                        lineItems.map((item) => {
                            if (item.id && item.returnReason !== '' && item.customerComments !== '' && item.returnQuantity !== 0) {
                                disabled = false;
                            }
                        });
                    }
                }
                break;
            default:
                break;
        }

        return disabled;
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setOrders(null);
        setSelectedOrder(null);
        setLineItems([]);
        setActiveStep(0);
    };

    const handleSubmit = async () => {
        if (!selectedOrder.id || !lineItems || lineItems.length === 0) return null;

        const url = process.env.GATSBY_FIREBASE_FUNCTIONS_URL + '/api/v1/shopifyAdmin/request_return';

        let formattedLineItems = [];
        lineItems.map((item) => {
            formattedLineItems.push({
                fulfillmentLineItemId: `${item.id}`,
                quantity: item.returnQuantity,
                returnReason: item.returnReason,
                customerNote: `${item.customerComments}`
            })
        });

        console.log(formattedLineItems)

        const payload = {
            orderId: selectedOrder.id,
            returnItems: formattedLineItems
        }

        await axios.post(url, payload)
            .then((res) => {
                console.log(res);
                if (res.data && res.data.data.returnRequest && res.data.data.returnRequest.return) {
                    console.log(res);
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                } else if (res.data && res.data.data.returnRequest && res.data.data.returnRequest.userErrors) {
                    console.log(res);
                    if (res.data.data.returnRequest.userErrors.length > 0) {
                        toast.error(res.data.data.returnRequest.userErrors[0].message);
                    }
                } else {
                    console.log(res.data.errors);
                    toast.error("Error submitting return request, please try again");
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error("Error submitting return request, please try again");
            });
    };

    return (
        <Box sx={{ width: '100%', marginBottom: 5 }}>
            <Stepper activeStep={activeStep}>
                {steps.map((step, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={index} {...stepProps}>
                            <StepLabel
                                {...labelProps}
                                onClick={() => {
                                    if (!handleActiveNext(index)) {
                                        setActiveStep(index)
                                    }
                                }}
                                sx={{
                                    cursor: 'pointer'
                                }}
                            >
                                {step.label}
                            </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography variant="h4" sx={{ mt: 3, mb: 3 }}>
                        Return Request Sent
                    </Typography>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        We will review your request and get back to you as soon as possible. Thank you!
                    </Typography>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        If you would like to start a new request, please click the "reset" button below or refresh the page.
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>

                    <Typography variant="h4" sx={{ mt: 3, mb: 3 }}>{steps[activeStep].label}</Typography>

                    {activeStep === 0 &&
                        <ReturnsOrderLookup
                            selectedOrder={selectedOrder}
                            orders={orders}
                            handleSelectedOrder={saveSelectedOrder}
                            handleOrders={saveOrders}
                            handleOpenTicketDialog={handleOpenTicketDialog}
                        />
                    }
                    {activeStep === 1 &&
                        <ReturnsItemSelector
                            selectedOrder={selectedOrder}
                            selectedItems={lineItems}
                            handleReasonChange={saveReturnReason}
                            handleCommentChange={saveCustomerComments}
                            handleQuantityChange={saveQuantity}
                            handleSelectedItem={saveLineItem}
                            handleOpenTicketDialog={handleOpenTicketDialog}
                        />
                    }
                    {activeStep === 2 &&
                        <ReturnReviewSubmit
                            selectedOrder={selectedOrder}
                            selectedItems={lineItems}
                            handleOpenTicketDialog={handleOpenTicketDialog}
                        />}

                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />


                        {activeStep === steps.length - 1 ? (
                            <Button onClick={handleSubmit} disabled={handleActiveNext(activeStep)}>
                                Request Return
                            </Button>
                        ) : (
                            <Button onClick={handleNext} disabled={handleActiveNext(activeStep)}>
                                Next
                            </Button>
                        )}
                    </Box>
                </React.Fragment>
            )}
            <SupportTicketDialog
                orderNumber={ticketOrderName}
                open={ticketDialogOpen}
                handleClose={handleTicketDialogClose}
            />
        </Box>
    );
}