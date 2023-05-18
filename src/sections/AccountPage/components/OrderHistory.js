import React from "react"
import { Grid } from "@mui/material"
import { OrderCard } from "./OrderCard";

export const OrderHistory = ({ rows, firstName, lastName, email }) => {

  return (
    <Grid container spacing={2}>
      {rows.map((order, index) => (
        <Grid item xs={12} lg={6} key={index}>
          <OrderCard key={index} order={order} firstName={firstName} lastName={lastName} email={email} />
        </Grid>
      ))}
    </Grid>
  )
}
