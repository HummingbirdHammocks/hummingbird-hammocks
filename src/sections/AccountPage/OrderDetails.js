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
  useMediaQuery,
} from "@mui/material"

import { OnButton } from "components"

const DetailsSection = styled(Box)(({ theme }) => ({
  padding: "30px 0",

  [theme.breakpoints.down("md")]: {
    padding: "0",
  },
}))

const DetailsGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    padding: "0",
  },
}))

export const OrderDetails = ({ data, userLogout, returnAccount }) => {
  const matches = useMediaQuery("(max-width:900px)")
  const {
    name,
    processedAt,
    totalPrice,
    // subTotalPrice,
    financialStatus,
    fulfillmentStatus,
    lineItems,
    shippingAddress,
  } = data.node

  return (
    <Box padding={!matches ? "0 200px" : "0"}>
      <Box
        pb="20px"
        justifyContent="space-between"
        display={matches ? "inline-block" : "flex"}
      >
        <Typography m={matches && "10px 0"} variant="h2">
          Account Details
        </Typography>
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
            hovercolor="#d2cbcb"
            background="#34542a"
            padding="0 10px"
            color="white"
            border="0"
            borderRadius="10px"
            onClick={() => userLogout()}
          >
            Logout
          </OnButton>
        </Box>
      </Box>

      <Divider />

      <DetailsSection mt={matches && "30px"}>
        <Box mb={matches && "30px"}>
          <Typography variant="h5">Order {name}</Typography>
          <Typography m="15px 0 20px 0" variant="subtitle2">
            {processedAt}
          </Typography>
        </Box>
        <TableContainer component={Paper}>
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
        <DetailsGrid m={matches ? "40px 0" : "60px 40px"}>
          <Box>
            <Typography variant="h5">Order Status</Typography>
            <Typography mt="20px" variant="subtitle2">
              <b>Payment Status</b>: {financialStatus}
            </Typography>
            <Typography variant="subtitle2">
              <b>Fulfillment Status</b>: {fulfillmentStatus}
            </Typography>
          </Box>
          <Box mt={matches && "30px"}>
            <Typography variant="h5">SHIPPING ADDRESS</Typography>
            <Typography mt={matches ? "10px" : "20px"} variant="body1">
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
