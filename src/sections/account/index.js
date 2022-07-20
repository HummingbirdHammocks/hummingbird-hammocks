import React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

export const OrderHistory = ({ rows }) => {
  console.log(rows)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Payment Status</TableCell>
            <TableCell align="right">Fulfillment Status</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            const {
              name,
              currencyCode,
              totalPrice,
              fulfillmentStatus,
              processedAt,
              financialStatus,
            } = row.node

            return (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {name}
                </TableCell>
                <TableCell align="right">{processedAt}</TableCell>
                <TableCell align="right">{financialStatus}</TableCell>
                <TableCell align="right">{fulfillmentStatus}</TableCell>
                <TableCell align="right">
                  {currencyCode} {totalPrice}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
