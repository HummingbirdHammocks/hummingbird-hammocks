import React from "react"
import { Grid } from "@mui/material"
import { OrderCard } from "./OrderCard";

export const OrderHistory = ({ rows }) => {

  return (
    <Grid container spacing={2}>
      {rows.map((order, index) => (
        <Grid item xs={12} lg={6}>
          <OrderCard key={index} order={order} />
        </Grid>
      ))}
    </Grid>
  )
}
