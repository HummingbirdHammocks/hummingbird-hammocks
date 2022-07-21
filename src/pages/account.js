import React, { useContext } from "react"
import { styled, Typography, Divider, Box } from "@mui/material"
import { navigate } from "gatsby"
import { useQuery, gql } from "@apollo/client"

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

  const { data, loading, error } = useQuery(CUSTOMER_INFO, {
    variables: {
      customerAccessToken,
    },
  })

  // const data = useQuery(CUSTOMER_INFO, {
  //   variables: {
  //     customerAccessToken,
  //   },
  // })

  // console.log(data)

  return (
    <Layout>
      <Seo title="Account" />
      <AccountSection>
        <MainWrapper>
          {customerAccessToken ? (
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
