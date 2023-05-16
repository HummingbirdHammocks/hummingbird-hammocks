import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import {
    ReturnsOrderLookup,
} from 'sections';

const steps = [
    {
        label: 'Order Lookup',
        optional: false,
    },
    {
        label: 'Items',
        optional: false,
    },
    {
        label: 'Reason',
        optional: false,
    },
    {
        label: 'Review',
        optional: false,
    }
];

export function ReturnsStepper({ id }) {
    const [orders, setOrders] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [lineItems, setLineItems] = useState(null);
    const [returnReason, setReturnReason] = useState(null);
    const [customerComments, setCustomerComments] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());

    const saveOrders = (newOrders) => {
        setOrders(newOrders);
    };

    const saveSelectedOrder = (selected) => {
        setSelectedOrder(selected);
    };

    const saveLineItems = (lineItems) => {
        setLineItems(lineItems);
    };

    const saveReturnReason = (returnReason) => {
        setReturnReason(returnReason);
    };

    const saveCustomerComments = (customerComments) => {
        setCustomerComments(customerComments);
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleActiveNext = (step) => {
        let active = true;
        switch (step) {
            case 0:
                if (selectedOrder) {
                    active = false;
                }
                break;
            case 1:
                if (lineItems) {
                    active = false;
                }
                break;
            case 2:
                if (returnReason && customerComments) {
                    active = false;
                }
                break;
            default:
                break;
        }

        return active;
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setOrders(null);
        setSelectedOrder(null);
        setLineItems(null);
        setReturnReason(null);
        setCustomerComments(null);
        setActiveStep(0);
    };

    const hydrateOrderFromId = useCallback(async (id) => {
        const url = process.env.GATSBY_FIREBASE_FUNCTIONS_URL + '/api/v1/shopifyAdmin/get_order_by_id';

        await axios.post(url, { id: id })
            .then((res) => {
                console.log(res);
                setSelectedOrder(res.data.data.orders.edges[0]);
            })
            .catch((error) => {
                console.log(error);
                toast.error("Error retreiving order by id, please try again")
            });
    }, [id]);


    useEffect(() => {
        if (id && !selectedOrder) {
            hydrateOrderFromId(id);
            setActiveStep(1);
        }
    }, [id]);

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
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
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
                        />
                    }
                    {activeStep === 1 && "test"}
                    {activeStep === 2 && "test"}
                    {activeStep === 3 && "test"}

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

                        <Button onClick={handleNext} disabled={handleActiveNext(activeStep)}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}