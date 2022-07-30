import React from "react"
import {
  styled,
  Typography,
  Divider,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material"

import { OnButton } from "components"

const DetailsSection = styled(Box)(() => ({
  padding: "30px 0",
}))

const DetailsGrid = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
}))

export const OrderDetails = ({ data, userLogout, returnAccount }) => {
  const {
    name,
    processedAt,
    totalPrice,
    subTotalPrice,
    financialStatus,
    fulfillmentStatus,
    lineItems,
    shippingAddress,
  } = data.node

  console.log(lineItems)
  return (
    <Box padding="0 200px">
      <Box pb="20px" justifyContent="space-between" display="flex">
        <Typography variant="h2">Account Details</Typography>
        <Box>
          <OnButton
            hovercolor="black"
            hoverback="white"
            padding="0"
            border="0"
            onClick={() => returnAccount()}
          >
            Return to Account
          </OnButton>{" "}
          /{" "}
          <OnButton
            hovercolor="black"
            hoverback="white"
            padding="0"
            border="0"
            onClick={() => userLogout()}
          >
            Logout
          </OnButton>
        </Box>
      </Box>

      <Divider />

      <DetailsSection>
        <Box>
          <Typography variant="h5">Order {name}</Typography>
          <Typography mt="20px" variant="subtitle2">
            {processedAt}
          </Typography>
        </Box>
        <TableContainer mt="15px" component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">SKU</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lineItems.edges.map((row, index) => {
                const {
                  title,
                  discountedTotalPrice,
                  originalTotalPrice,
                  variant,
                  quantity,
                } = row.node

                return (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell scope="row">{title}</TableCell>
                    <TableCell align="right">{variant.sku}</TableCell>
                    <TableCell align="right">
                      {originalTotalPrice.amount}
                    </TableCell>
                    <TableCell align="right">{quantity}</TableCell>
                    <TableCell align="right">
                      {discountedTotalPrice.amount}
                    </TableCell>
                  </TableRow>
                )
              })}
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell align="right" colSpan={4}>
                  Subtotal
                </TableCell>
                <TableCell align="right">{totalPrice}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <DetailsGrid m="60px 40px">
          <Box>
            <Typography variant="h5">Order Status</Typography>
            <Typography mt="20px" variant="subtitle2">
              <b>Payment Status</b>: {financialStatus}
            </Typography>
            <Typography variant="subtitle2">
              <b>Fulfillment Status</b>: {fulfillmentStatus}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5">SHIPPING ADDRESS</Typography>
            <Typography mt="20px" variant="body1">
              <b>
                {shippingAddress?.firstName.toLocaleUpperCase()}{" "}
                {shippingAddress?.lastName.toLocaleUpperCase()}{" "}
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
          </Box>
        </DetailsGrid>
      </DetailsSection>
    </Box>
  )
}
