import React, { useCallback, useContext, useEffect, useState } from "react"
import {
  Typography,
  Button,
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material"
import { useQuery, gql } from "@apollo/client"

import { UserContext } from "contexts"
import {
  AccountLayout,
  Link,
  MiddleSpinner,
} from "components"
import { SupportTicket } from "./components/SupportTicket"

import { getUserTickets } from "../../utils/freescout"


const AccountTicketsPage = () => {
  const [tickets, setTickets] = useState([])
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [ticketsLoading, setTicketsLoading] = useState(false)

  const {
    store: { customerAccessToken },
  } = useContext(UserContext)

  const { data, loading, error } = useQuery(CUSTOMER_INFO, {
    variables: {
      customerAccessToken,
    },
  })

  const getTickets = useCallback(async (data) => {
    setTicketsLoading(true)

    if (data?.customer) {
      const newTickets = await getUserTickets(data.customer.email)
      console.log(newTickets.data)
      if (newTickets.data?._embedded?.conversations) {
        setTickets(newTickets.data._embedded.conversations)
      }
    }

    setTicketsLoading(false)
  }, [data])

  useEffect(() => {
    getTickets(data)
  }, [data])

  return (
    <AccountLayout title="Support Tickets" currentPage="tickets">
      {customerAccessToken ? (
        <Box>
          <Box
            pb="20px"
            justifyContent="space-between"
            display={{ xs: "inline-block", sm: "flex" }}
          >
            <Box>
              <Typography variant="h4">
                Support Tickets
              </Typography>
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
          {(loading || ticketsLoading) && <MiddleSpinner divMinHeight="460px" size={20} />}
          {(data && tickets !== [] && !ticketsLoading) && (
            <Grid container spacing={4} sx={{ paddingBottom: 4 }}>
              <Grid item xs={12} md={4} sx={{ borderRight: { xs: "0", md: "1px solid rgba(0,0,0,0.12)" } }}>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  All Tickets
                </Typography>
                <Box>
                  <List>
                    {tickets.map((ticket) => (
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
            <Link to="/login">Go to Log In</Link>
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