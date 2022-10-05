import React, { useContext } from "react"
import {
  Typography,
  Button,
  Box,
  Grid,
  useMediaQuery
} from "@mui/material"
import { useQuery, gql } from "@apollo/client"

import { UserContext } from "contexts"
import {
  AccountLayout,
  Link,
  MiddleSpinner,
} from "components"
import { SupportTicketForm } from "./components/SupportTicketForm"


const AccountCreateTicket = () => {
  const matches = useMediaQuery("(max-width:900px)")

  const {
    store: { customerAccessToken },
  } = useContext(UserContext)

  const { data, loading, error } = useQuery(CUSTOMER_INFO, {
    variables: {
      customerAccessToken,
    },
  })

  console.log(data)

  return (
    <AccountLayout title="Support Tickets" currentPage="tickets">
      {customerAccessToken ? (
        <Box>
          <Box
            pb="20px"
            justifyContent="space-between"
            display={matches ? "inline-block" : "flex"}
          >
            <Box>
              <Typography variant="h4">
                Create New Ticket
              </Typography>
            </Box>
            <Box>
              <Button
                variant="outlined"
                component={Link}
                to="/account/tickets"
              >
                View Tickets
              </Button>
            </Box>
          </Box>
          {error && "Error"}
          {loading && <MiddleSpinner divMinHeight="460px" size={20} />}
          {data && (
            <Grid container spacing={4} sx={{ paddingBottom: 4 }}>
              <Grid item xs={12}>
                <SupportTicketForm firstName={data?.customer?.firstName} lastName={data?.customer?.lastName} email={data?.customer?.email} />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    padding: 2,
                  }}
                  variant="body1"
                >
                  Your name and email will automatically be added to your ticket so we can assist you efficiently.
                </Typography>
              </Grid>
            </Grid>
          )}
        </Box>
      ) : (
        <Box
          minHeight="450px"
          justifyContent="center"
          alignItems="center"
          display="flex"
        >
          <Typography variant="h1">You need to log in first!</Typography>
          <Button>
            <Link to="/login">Go to Log In</Link>
          </Button>
        </Box>
      )}
    </AccountLayout >
  )
}

export default AccountCreateTicket

const CUSTOMER_INFO = gql`
  query ($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      email
      firstName
      lastName
    }
  }
`