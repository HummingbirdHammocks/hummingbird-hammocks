import React, { useContext, useEffect, useState } from "react"
import { toast } from 'react-toastify'
import {
  Typography,
  Button,
  Box,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
  useMediaQuery
} from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { useMutation, useQuery, gql } from "@apollo/client"

import { UserContext } from "contexts"
import {
  AccountLayout,
  Link,
  MiddleSpinner,
} from "components"
import { RestockNotifications } from "sections"


const AccountNotificationsPage = () => {
  const matches = useMediaQuery("(max-width:900px)")
  const [submitLoading, setSubmitLoading] = useState(false)

  const [acceptsMarketing, setAcceptsMarketing] = useState(false)

  const handleSavePreferences = async () => {
    setSubmitLoading(true)

    customerUpdate({
      variables: {
        customerAccessToken,
        customer: {
          acceptsMarketing,
        },
      },
    })
      .then(result => {
        console.log(result)
        refetch()
        toast.success("Preferences Updated")
      })
      .catch(error => {
        console.log(error)
        toast.error("Oops! Something went wrong. Please try again.")
      })

    setSubmitLoading(false)
  }

  const {
    store: { customerAccessToken },
  } = useContext(UserContext)

  const { data, loading, error, refetch } = useQuery(CUSTOMER_INFO, {
    variables: {
      customerAccessToken,
    },
  })
  const [customerUpdate] = useMutation(CUSTOMER_UPDATE)

  useEffect(() => {
    if (data?.customer) {
      /* console.log(data.customer) */
      setAcceptsMarketing(data?.customer?.acceptsMarketing)
    }
  }, [data])

  return (
    <AccountLayout title="Notification Settings" currentPage="notifications">
      {customerAccessToken ? (
        <Box>
          <Typography sx={{ marginBottom: 7 }} variant="h4">
            Notifications
          </Typography>
          {error && "Error"}
          {loading && <MiddleSpinner divMinHeight="460px" size={20} />}
          {data && (
            <Grid container spacing={4} sx={{ paddingBottom: 4 }}>
              <Grid item xs={12} md={4} sx={{ borderRight: matches ? "0" : "1px solid rgba(0,0,0,0.12)" }}>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  Email Preferences
                </Typography>
                <Box>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox checked={acceptsMarketing} onChange={() => setAcceptsMarketing(!acceptsMarketing)} />} label="Promotions" />
                  </FormGroup>
                  <Divider variant="middle" sx={{ marginTop: 2, marginBottom: 2 }} />
                  <LoadingButton size={'large'} variant={'contained'} onClick={() => handleSavePreferences()} loading={submitLoading}>
                    Save Preferences
                  </LoadingButton>
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  Restock Notifications
                </Typography>
                <RestockNotifications email={data.customer.email} />
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

export default AccountNotificationsPage

const CUSTOMER_INFO = gql`
  query ($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      email
      acceptsMarketing
    }
  }
`

const CUSTOMER_UPDATE = gql`
  mutation customerUpdate($customer: CustomerUpdateInput!, $customerAccessToken: String!) {
    customerUpdate(customer: $customer, customerAccessToken: $customerAccessToken) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`