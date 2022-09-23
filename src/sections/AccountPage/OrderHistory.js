import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material"
import { Pageview } from "@mui/icons-material"
import { navigate } from "gatsby"
import { useLocation } from "@gatsbyjs/reach-router"

import { fShopify } from "../../utils/formatTime"

export const OrderHistory = ({ rows }) => {
  // Variants & Product Image
  const { pathname } = useLocation()

  const handleOrderDetails = name => {
    navigate(`${pathname}?orders=${encodeURIComponent(name)}`, {
      replace: true,
    })
  }

  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Payment Status</TableCell>
              <TableCell align="center">Fulfillment Status</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="center">View</TableCell>
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
                  <TableCell align="right">{fShopify(processedAt)}</TableCell>
                  <TableCell align="right">{financialStatus}</TableCell>
                  <TableCell align="right">{fulfillmentStatus}</TableCell>
                  <TableCell align="right">
                    {currencyCode} {totalPrice}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => handleOrderDetails(name)}
                    >
                      <Pageview />
                    </IconButton>
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
