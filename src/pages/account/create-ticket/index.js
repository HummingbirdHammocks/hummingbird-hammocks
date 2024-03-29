import { gql, useQuery } from '@apollo/client';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { navigate } from 'gatsby';
import React from 'react';

// components
import { Layout, Link, MainWrapper, MiddleSpinner, Seo } from '../../../components';
import { SupportTicketForm } from '../../../sections/AccountPage/components/SupportTicketForm';
// stores
import { useAuthStore } from '../../../stores';

const CreateTicketPage = () => {
  const theme = useTheme();

  const { customerAccessToken } = useAuthStore();

  const { data, loading } = useQuery(CUSTOMER_INFO, {
    variables: {
      customerAccessToken
    }
  });

  return (
    <Layout>
      <Box
        sx={{
          background: theme.palette.white,
          padding: '60px 15px'
        }}>
        <MainWrapper>
          <Box padding={{ xs: '0', lg: '0 200px' }}>
            <Stack
              spacing={2}
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              sx={{ paddingBottom: '30px' }}>
              <Typography variant="h2">Create New Ticket</Typography>
              {data ? (
                <Button variant="outlined" component={Link} to="/account/tickets">
                  View Tickets
                </Button>
              ) : (
                <Button variant="outlined" onClick={() => navigate('/account/login')}>
                  Log In
                </Button>
              )}
            </Stack>
            <Divider />

            <Box
              sx={{ paddingLeft: { xs: 0, sm: 2 }, paddingRight: { xs: 0, sm: 2 } }}
              justifyContent="center"
              display="flex">
              <Box>
                <Box
                  pb="20px"
                  justifyContent="space-between"
                  display={{ xs: 'inline-block', sm: 'flex' }}></Box>
                {loading && <MiddleSpinner divminheight="460px" size={20} />}
                <Stack sx={{ paddingBottom: 4 }}>
                  {data && (
                    <Box sx={{ paddingLeft: { xs: 0, sm: 2 }, paddingRight: { xs: 0, sm: 2 } }}>
                      <Typography sx={{ padding: 2 }} variant="body1">
                        Since you are logged in, your name and email will automatically be added to
                        your ticket so we can assist you efficiently.
                      </Typography>
                    </Box>
                  )}
                  <SupportTicketForm
                    firstName={data?.customer?.firstName}
                    lastName={data?.customer?.lastName}
                    email={data?.customer?.email}
                  />
                </Stack>
              </Box>
            </Box>
          </Box>
        </MainWrapper>
      </Box>
    </Layout>
  );
};

export default CreateTicketPage;

const CUSTOMER_INFO = gql`
  query ($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      email
      firstName
      lastName
    }
  }
`;

export const Head = () => <Seo title="Create Support Ticket | Hummingbird Hammocks" />;
