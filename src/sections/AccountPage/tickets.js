import React, { useCallback, useContext, useEffect, useState } from "react"
import { toast } from 'react-toastify'
import {
  Typography,
  Button,
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery
} from "@mui/material"
import { useQuery, gql } from "@apollo/client"

import { UserContext } from "contexts"
import {
  AccountLayout,
  Link,
  MiddleSpinner,
} from "components"

import { getUserTickets } from "../../utils/freescout"


const AccountTicketsPage = () => {
  const matches = useMediaQuery("(max-width:900px)")
  const [tickets, setTickets] = useState([])
  const [selectedTicket, setSelectedTicket] = useState(null)

  const {
    store: { customerAccessToken },
  } = useContext(UserContext)

  const { data, loading, error } = useQuery(CUSTOMER_INFO, {
    variables: {
      customerAccessToken,
    },
  })

  const getTickets = useCallback(async (data) => {
    if (data?.customer) {
      const newTickets = await getUserTickets(data.customer.email)
      console.log(newTickets.data)
      if (newTickets.data?._embedded?.conversations) {
        setTickets(newTickets.data._embedded.conversations)
      }
    }
  }, [data])

  useEffect(() => {
    getTickets(data)
  }, [data])

  return (
    <AccountLayout title="Support Tickets" currentPage="tickets">
      {customerAccessToken ? (
        <Box>
          <Typography sx={{ marginBottom: 7 }} variant="h4">
            Support Tickets
          </Typography>
          {error && "Error"}
          {loading && <MiddleSpinner divMinHeight="460px" size={20} />}
          {data && (
            <Grid container spacing={4} sx={{ paddingBottom: 4 }}>
              <Grid item xs={12} md={4} sx={{ borderRight: matches ? "0" : "1px solid rgba(0,0,0,0.12)" }}>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  All Tickets
                </Typography>
                <Box>
                  <List>
                    {tickets.map((ticket) => (
                      <ListItem disablePadding key={ticket.id}>
                        <ListItemButton>
                          <ListItemText primary={`Ticket ${ticket.number}`} secondary={ticket.subject} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  Restock Notifications
                </Typography>
                {/* <RestockNotifications email={data.customer.email} /> */}
                <Typography variant="body1" sx={{ marginTop: 2, marginBottom: 2 }}>
                  * Restock notifications are automatically removed once the notification has been sent. You will need to sign up from the product page again if you would like to receive another notification.
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

export default AccountTicketsPage

const CUSTOMER_INFO = gql`
  query ($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      email
    }
  }
`