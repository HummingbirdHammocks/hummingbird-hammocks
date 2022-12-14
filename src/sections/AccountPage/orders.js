import React, { useEffect, useState } from "react"
import { Typography, Button, Box, Grid } from "@mui/material"
import { navigate } from "gatsby"
import { useQuery, gql } from "@apollo/client"
import { useLocation } from "@gatsbyjs/reach-router"
import queryString from "query-string"
// stores
import { useAuthStore } from "../../stores/useAuthStore";
// components
import {
  AccountLayout,
  Link,
  MiddleSpinner,
} from "components"
import { OrderHistory, OrderDetails } from "./components"


const AccountOrdersPage = () => {
  const [accountDetails, setAccountDetails] = useState({
    open: false,
    index: null,
  })

  const { customerAccessToken } = useAuthStore();

  // Variants & Product Image
  const { search } = useLocation()
  const q = queryString.parse(search).orders

  const returnAccount = () => {
    setAccountDetails({ open: false, index: null })
    navigate("/account/orders")
  }

  const { data, loading, error } = useQuery(CUSTOMER_INFO, {
    variables: {
      customerAccessToken,
    },
  })

  useEffect(() => {
    if (data?.customer.orders?.edges && q) {
      let index = data.customer.orders?.edges.findIndex(i => i.node.name === q)
      if (index >= 0) {
        setAccountDetails({ open: true, index })
      } else {
        navigate("/account/login")
      }
    }
  }, [q, data])

  return (
    <AccountLayout title="Order History" currentPage="orders">
      {customerAccessToken && !accountDetails.open ? (
        <Box>
          {error && "Error"}
          {loading && <MiddleSpinner divMinHeight="460px" size={20} />}
          {data && (
            <Grid container spacing={2} sx={{ paddingBottom: 4 }}>
              <Grid item xs={12}>
                <Typography sx={{ marginBottom: 7 }} variant="h4">
                  Order History
                </Typography>
                <OrderHistory rows={data.customer.orders?.edges} />
              </Grid>
            </Grid>
          )}
        </Box>
      ) : customerAccessToken && accountDetails.open ? (
        <OrderDetails
          firstName={data.customer.firstName}
          lastName={data.customer.lastName}
          email={data.customer.email}
          data={data?.customer.orders?.edges[accountDetails.index]}
          returnAccount={returnAccount}
        />
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

export default AccountOrdersPage

const CUSTOMER_INFO = gql`
      query ($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
        email
      firstName
      lastName
      defaultAddress {
        firstName
        lastName
      address1
      address2
      phone
      city
      zip
      country
      }
      orders(first: 10) {
        edges {
        node {
        name
            id
      totalPrice
      processedAt
      currencyCode
      fulfillmentStatus
      financialStatus
      shippingAddress {
        address1
              address2
      city
      lastName
      firstName
      country
      phone
      name
      zip
            }
      currentTotalTax {
        amount
      }
      totalShippingPrice
      lineItems(first: 10) {
        edges {
        node {
        title
                  variant {
        sku
      }

      originalTotalPrice {
        amount
                    currencyCode
                  }
      discountedTotalPrice {
        amount
      }
      quantity
                }
              }
            }

      subtotalPrice
      totalPrice
          }
        }
      }
      addresses(first: 10) {
        edges {
        node {
        address1
            address2
      city
      lastName
      firstName
      country
      phone
      name
      zip
          }
        }
      }
    }
  }
      `
