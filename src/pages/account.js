import React, { useContext, useEffect, useState } from "react"
import { styled, Typography, Divider, Box } from "@mui/material"
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

const AccountSection = styled("section")(({ theme }) => ({
  background: theme.palette.white,
  padding: "60px 15px",
}))

const AccountGrid = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "1fr 2fr",
  padding: "30px 0",
}))

const AccountPage = () => {
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
      <AccountSection>
        <MainWrapper>
          {customerAccessToken && !accountDetails.open ? (
            <Box padding="0 200px">
              {error && "Error"}
              {loading && <MiddleSpinner divMinHeight="460px" size={20} />}
              {data && (
                <>
                  <Box pb="20px" justifyContent="space-between" display="flex">
                    <Typography variant="h2">Account Details</Typography>
                    <OnButton
                      hovercolor="black"
                      hoverback="white"
                      padding="0"
                      border="0"
                      onClick={userLogout}
                    >
                      Logout
                    </OnButton>
                  </Box>

                  <Divider />

                  <AccountGrid>
                    <Box p="20px 0" borderRight="1px solid #111">
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
                    <Box p="20px">
                      <Typography variant="h5">Order History</Typography>
                      <OrderHistory rows={data.customer.orders?.edges} />
                    </Box>
                  </AccountGrid>
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
      </AccountSection>
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
