import React, { useContext, useEffect, useState } from "react"
import { useTheme } from '@mui/material/styles';
import { Typography, Divider, Box, useMediaQuery } from "@mui/material"
import { navigate } from "gatsby"
import { useQuery, gql } from "@apollo/client"
import { useLocation } from "@gatsbyjs/reach-router"
import queryString from "query-string"

import { UserContext } from "contexts"
import {
  Seo,
  Layout,
  MainWrapper,
  OnButton,
  Link,
  MiddleSpinner,
} from "components"
import { OrderHistory, OrderDetails } from "sections"


const AccountPage = () => {
  const theme = useTheme();
  const matches = useMediaQuery("(max-width:900px)")
  const [accountDetails, setAccountDetails] = useState({
    open: false,
    index: null,
  })

  const {
    store: { customerAccessToken },
    logout,
  } = useContext(UserContext)

  // Variants & Product Image
  const { search } = useLocation()
  const q = queryString.parse(search).orders

  const userLogout = () => {
    logout()
    navigate("/")
  }

  const returnAccount = () => {
    setAccountDetails({ open: false, index: null })
    navigate("/account")
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
        navigate("/account")
      }
    }
  }, [q, data])

  return (
    <Layout>
      <Seo title="Account" />
      <Box
        sx={{
          background: theme.palette.white,
          padding: "60px 15px",

          [theme.breakpoints.down("md")]: {
            padding: "40px 0",
          },
        }}>
        <MainWrapper>
          {customerAccessToken && !accountDetails.open ? (
            <Box padding={!matches ? "0 200px" : "0"}>
              {error && "Error"}
              {loading && <MiddleSpinner divMinHeight="460px" size={20} />}
              {data && (
                <>
                  <Box pb="20px" justifyContent="space-between" display="flex">
                    <Typography variant="h2">Account Details</Typography>
                    <OnButton
                      hovercolor="#d2cbcb"
                      background="#34542a"
                      padding="0 10px"
                      color="white"
                      border="0"
                      borderRadius="10px"
                      onClick={userLogout}
                    >
                      Logout
                    </OnButton>
                  </Box>

                  <Divider />

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 2fr",
                      padding: "30px 0",

                      [theme.breakpoints.down("md")]: {
                        gridTemplateColumns: "1fr",
                        padding: "0",
                      },
                    }}>
                    <Box
                      p="20px 0"
                      borderRight={matches ? "0" : "1px solid #ead5d5"}
                    >
                      <Typography variant="h5">{`${data.customer.firstName} ${data.customer.lastName}`}</Typography>
                      <Typography variant="body1">
                        {data.customer.email}
                      </Typography>
                      {data.customer.addresses.edges.length > 0 && (
                        <>
                          <Typography mt="40px" variant="h5">
                            Primary Address
                          </Typography>
                          <Typography variant="body1">
                            {data.customer.defaultAddress?.address1}
                            <br />
                            {data.customer.defaultAddress?.address2 && (
                              <>
                                {data.customer.defaultAddress?.address2} <br />
                              </>
                            )}
                            {data.customer.defaultAddress?.city},{" "}
                            {data.customer.defaultAddress?.zip}
                            <br />
                            {data.customer.defaultAddress?.country}
                            <br />
                            {data.customer.defaultAddress?.phone}
                          </Typography>
                        </>
                      )}

                      <Typography mt="20px" variant="body1">
                        <Link to="/account/addresses">{`View Addresses (${data.customer.addresses.edges.length})`}</Link>
                      </Typography>
                    </Box>
                    <Box p={matches ? "0" : "20px"}>
                      <Typography mb="20px" variant="h5">
                        Order History
                      </Typography>
                      <OrderHistory rows={data.customer.orders?.edges} />
                    </Box>
                  </Box>
                </>
              )}
            </Box>
          ) : customerAccessToken && accountDetails.open ? (
            <OrderDetails
              data={data?.customer.orders?.edges[accountDetails.index]}
              userLogout={userLogout}
              returnAccount={returnAccount}
            />
          ) : (
            <Box
              minHeight="450px"
              justifyContent="center"
              alignItems="center"
              display="flex"
            >
              <Typography variant="h1">You need to login first!</Typography>
              <OnButton>
                <Link to="/account/login">Go to Log In</Link>
              </OnButton>
            </Box>
          )}
        </MainWrapper>
      </Box>
    </Layout>
  )
}

export default AccountPage

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
