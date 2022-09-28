import React from "react"
import {
  useTheme,
  Typography,
  Divider,
  Box,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Paper,
  useMediaQuery,
} from "@mui/material"

import { OnButton } from "components"

import { fShopify } from "../../utils/formatTime";

export const OrderDetails = ({ data, userLogout, returnAccount }) => {
  const matches = useMediaQuery("(max-width:900px)")
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
  } = data.node

  const theme = useTheme();

  console.log(data.node)

  return (
    <Box >
      <Box
        pb="20px"
        justifyContent="space-between"
        display={matches ? "inline-block" : "flex"}
      >
        <Box>
          <Typography variant="h4">
            Order {name} Details
          </Typography>
          <Typography variant="subtitle2">
            {fShopify(processedAt)}
          </Typography>
        </Box>
        <Box>
          <OnButton
            hovercolor="black"
            hoverback="white"
            padding="0"
            border="0"
            onClick={() => returnAccount()}
          >
            Return to All Orders
          </OnButton>
        </Box>
      </Box>

      <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
        <Chip label={financialStatus} />
        <Chip label={fulfillmentStatus} variant="outlined" />
      </Stack>

      <Box
        sx={{
          padding: "30px 0",
          mt: matches && "30px",

          [theme.breakpoints.down("md")]: {
            padding: "0",
          },
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
                      ${originalTotalPrice.amount}
                    </TableCell>
                    <TableCell align="right">{quantity}</TableCell>
                    <TableCell align="right">
                      ${discountedTotalPrice.amount}
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
                  Sub Total
                </TableCell>
                <TableCell align="right">${subtotalPrice}</TableCell>
              </TableRow>
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell align="right" colSpan={4}>
                  Shipping
                </TableCell>
                <TableCell align="right">${totalShippingPrice}</TableCell>
              </TableRow>
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell align="right" colSpan={4}>
                  Total Tax
                </TableCell>
                <TableCell align="right">${currentTotalTax.amount}</TableCell>
              </TableRow>
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell align="right" colSpan={4}>
                  Total
                </TableCell>
                <TableCell align="right">${totalPrice}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2} sx={{ marginTop: 4 }}>
          <Grid item xs={12} md={6}>
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
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
