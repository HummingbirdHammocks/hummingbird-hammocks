import React, { useState } from "react"
import {
  Typography,
  Button,
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  LinearProgress,
} from "@mui/material"
import { useQuery, gql } from "@apollo/client"
// stores
import { useAuthStore } from "../../stores";
// hooks
import useTickets from "../../hooks/useTickets";
// components
import {
  AccountLayout,
  Link,
  MiddleSpinner,
} from "components"
import { SupportTicket } from "./components/SupportTicket"


const AccountTicketsPage = () => {
  const [selectedTicket, setSelectedTicket] = useState(null)

  const { customerAccessToken } = useAuthStore();

  const { data, loading, error } = useQuery(CUSTOMER_INFO, {
    variables: {
      customerAccessToken,
    },
  })

  const { data: ticketsData, state: ticketsState, error: ticketsError, isFetching: ticketsIsFetching } = useTickets(data?.customer?.email)

  if (ticketsError || ticketsState === "error") { return null }

  return (
    <AccountLayout title="Support Tickets" currentPage="tickets">
      {customerAccessToken ? (
        <Box>
          <Box
            pb={2}
            mb={4}
            justifyContent="space-between"
            display={{ xs: "inline-block", sm: "flex" }}
          >
            <Box>
              <Typography variant="h4">
                Support Tickets
              </Typography>
              {ticketsIsFetching && <LinearProgress />}
            </Box>
            <Box>
              <Button
                variant="outlined"
                component={Link}
                to="/account/create-ticket"
              >
                Create New Ticket
              </Button>
            </Box>
          </Box>
          {error && "Error"}
          {(ticketsState === "loading" || loading) && <MiddleSpinner divminheight="460px" size={20} />}
          {(data && ticketsData) && (
            <Grid container spacing={4} sx={{ paddingBottom: 4 }}>
              <Grid item xs={12} md={4} sx={{ borderRight: { xs: "0", md: "1px solid rgba(0,0,0,0.12)" } }}>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  All Tickets
                </Typography>
                <Box>
                  <List>
                    {ticketsData.map((ticket) => (
                      <ListItem
                        key={ticket.id}
                        disablePadding
                        selected={selectedTicket?.id === ticket.id}
                        sx={{
                          backgroundColor: ticket?.status === "active" ? "#F0F8EF" : ticket?.status === "pending" ? "#ffecb3" : "inherit",
                        }}>
                        <ListItemButton onClick={() => setSelectedTicket(ticket)}>
                          <ListItemText primary={`Ticket ${ticket.number}`} secondary={ticket.subject} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>

                {selectedTicket ? (
                  <SupportTicket ticket={selectedTicket} />
                ) : (
                  <Typography variant="h5" sx={{ marginBottom: 2 }}>
                    Select a Ticket to View
                  </Typography>
                )}
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
            <Link to="/account/login">Go to Log In</Link>
          </Button>
        </Box>
      )}
    </AccountLayout >
  )
}

export default AccountTicketsPage

const CUSTOMER_INFO = gql`
  query ($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      email
    }
  }
`