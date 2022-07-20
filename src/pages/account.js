import React, { useContext } from "react"
import { styled, Typography, Divider, Box } from "@mui/material"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import { navigate } from "gatsby"

import { UserContext } from "contexts"
import {
  Seo,
  Layout,
  MainWrapper,
  OnButton,
  Link,
  MiddleSpinner,
} from "components"
import { OrderHistory } from "sections"

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
  const {
    store: { customerAccessToken },
    logout,
  } = useContext(UserContext)

  const userLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <Layout>
      <Seo title="Account" />
      <AccountSection>
        <MainWrapper>
          <Box padding="0 200px">
            {customerAccessToken ? (
              <Query
                query={CUSTOMER_INFO}
                variables={{
                  customerAccessToken,
                }}
              >
                {({ loading, error, data }) => {
                  if (loading)
                    return <MiddleSpinner divMinHeight="460px" size={20} />
                  if (error) return <div>Error</div>
                  const {
                    defaultAddress,
                    orders,
                    addresses,
                    email,
                    firstName,
                    lastName,
                  } = data.customer

                  console.log(data.customer)
                  return (
                    <>
                      <Box
                        pb="20px"
                        justifyContent="space-between"
                        display="flex"
                      >
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
                          <Typography variant="h5">{`${firstName} ${lastName}`}</Typography>
                          <Typography variant="body1">{email}</Typography>
                          {addresses.edges.length > 0 && (
                            <>
                              <Typography mt="40px" variant="h5">
                                Primary Address
                              </Typography>
                              <Typography variant="body1">
                                {defaultAddress?.address1}
                                <br />
                                {defaultAddress?.address2 && (
                                  <>
                                    {defaultAddress?.address2} <br />
                                  </>
                                )}
                                {defaultAddress?.city}, {defaultAddress?.zip}
                                <br />
                                {defaultAddress?.country}
                                <br />
                                {defaultAddress?.phone}
                              </Typography>
                            </>
                          )}

                          <Typography mt="20px" variant="body1">
                            <Link to="/account/addresses">{`View Addresses (${addresses.edges.length})`}</Link>
                          </Typography>
                        </Box>
                        <Box p="20px">
                          <Typography variant="h5">Order History</Typography>
                          <OrderHistory rows={orders?.edges} />
                        </Box>
                      </AccountGrid>
                    </>
                  )
                }}
              </Query>
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
          </Box>
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
            totalPrice
            processedAt
            currencyCode
            fulfillmentStatus
            financialStatus
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

// lineItems(first: 10) {
//   edges {
//     node {
//       title
//       quantity
//     }
//   }
// }
// shippingAddress {
//   address1
//   address2
//   city
//   lastName
//   firstName
//   zip
//   phone
//   country
// }
