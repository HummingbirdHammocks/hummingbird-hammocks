import React from "react"
import {
    Box,
    Grid,
    Stack,
    Typography,
    Paper,
    Button,
    Chip,
    Divider,
} from "@mui/material"

import { fulfillmentStatusChipColor } from "../../utils/shopify";
import { fShopify } from "../../utils/formatTime";



export function ReturnReviewSubmit({
    selectedOrder,
    selectedItems,
    handleOpenTicketDialog
}) {

    return (
        <Box padding="30px" justifyContent="center" display="flex">
            <Grid container spacing={2}>
                <Grid item xs={12} md={4} sx={{ padding: 2, borderRight: { xs: "0", md: "1px solid rgba(0,0,0,0.12)" } }}>
                    <Stack spacing={2}>
                        <Stack direction="row" justifyContent={"space-between"}>
                            <Typography>
                                Order #:
                            </Typography>
                            <Typography >
                                {selectedOrder.name}
                            </Typography>
                        </Stack>
                        <Stack direction="row" justifyContent={"space-between"}>
                            <Typography>
                                Order Date:
                            </Typography>
                            {fShopify(selectedOrder.createdAt)}
                        </Stack>
                        <Stack direction="row" justifyContent={"space-between"}>
                            <Typography>
                                Items:
                            </Typography>
                            <Typography >
                                {selectedOrder.lineItems.edges.length}
                            </Typography>
                        </Stack>
                        <Stack direction="row" justifyContent={"space-between"}>
                            {selectedOrder.displayFulfillmentStatus &&
                                <Chip label={selectedOrder.displayFulfillmentStatus} variant="filled" color={fulfillmentStatusChipColor(selectedOrder.displayFulfillmentStatus)} />
                            }
                            <Button variant="outlined" onClick={() => handleOpenTicketDialog(selectedOrder.name)}>
                                Get Help
                            </Button>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography variant="h6" sx={{ marginBottom: 4 }}>
                        Return Items:
                    </Typography>
                    <Stack>
                        {selectedItems.map((item) => (
                            <Paper
                                key={item.id}
                                sx={{
                                    padding: 2,
                                    marginBottom: 2,
                                }}
                            >
                                <Grid container>
                                    <Grid item xs={3}>
                                        <img
                                            src={item.lineItem.image.url}
                                            alt={item.lineItem.image.altText}
                                            height={"80px"}
                                            width={"80px"}
                                        />
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Stack
                                            direction={"column"}
                                            spacing={2}
                                        >
                                            <Typography>
                                                {item.lineItem.name}
                                            </Typography>
                                            <Stack direction={"row"} justifyContent={"space-between"}>
                                                <Stack>
                                                    <Typography variant="caption">
                                                        Price Paid:
                                                    </Typography>
                                                    {item.discountedTotalSet.presentmentMoney.amount} {item.discountedTotalSet.presentmentMoney.currencyCode}
                                                </Stack>
                                                <Stack align={"center"}>
                                                    <Typography variant="caption">
                                                        Quantity:
                                                    </Typography>
                                                    {item.returnQuantity}
                                                </Stack>
                                            </Stack>

                                            <Divider />
                                            <Stack>
                                                <Typography variant="caption">
                                                    {item.returnReason}:
                                                </Typography>
                                                <Typography>
                                                    {item.customerComments}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Paper>
                        ))}
                    </Stack>
                </Grid>
            </Grid>
        </Box >
    )
}