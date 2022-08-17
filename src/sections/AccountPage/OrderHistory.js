import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
} from "@mui/material"
import { navigate } from "gatsby"
import { useLocation } from "@gatsbyjs/reach-router"

export const OrderHistory = ({ rows }) => {
  const matches = useMediaQuery("(max-width:900px)")
  // Variants & Product Image
  const { pathname } = useLocation()

  const handleOrderDetails = name => {
    navigate(`${pathname}?orders=${encodeURIComponent(name)}`, {
      replace: true,
    })
  }

  return (
    <Paper sx={{ maxWidth: matches ? 350 : 550 }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
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
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell
                    onClick={() => handleOrderDetails(name)}
                    component="th"
                    scope="row"
                    sx={{ cursor: "pointer" }}
                  >
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
    </Paper>
  )
}
