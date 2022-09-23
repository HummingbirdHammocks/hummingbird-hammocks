import React from "react"
import { useTheme, Paper, Box, Grid, Stack, Divider, Typography } from "@mui/material"

import { ThruHikerForm } from "./ThruHikerForm";
import { OrderOptions } from "./OrderOptions";

export function CartExtras() {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        margin: 4,
        padding: 4,

        [theme.breakpoints.down("sm")]: {
          margin: 0,
        },
      }}>
      <Typography pb="20px" variant="h5">
        EXTRA CHECKOUT OPTIONS
      </Typography>
      <Divider />
      <Grid container spacing={4} sx={{ marginTop: 1 }}>
        <Grid item xs={12} lg={6}>
          <ThruHikerForm />
        </Grid>
        <Grid item xs={12} lg={6}>
          <OrderOptions />
        </Grid>
      </Grid>
    </Paper>
  )
}
