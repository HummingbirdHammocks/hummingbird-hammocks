import { Container } from '@mui/material';
import React from 'react';

import { Layout, MainWrapper, Seo } from '../components';
import { ReturnsStepper } from '../sections';

const ReturnsPage = () => {
  return (
    <Layout>
      <MainWrapper>
        <Container sx={{ marginTop: 2, marginBottom: 2 }}>
          <ReturnsStepper />
        </Container>
      </MainWrapper>
    </Layout>
  );
};

export default ReturnsPage;

export const Head = () => <Seo title="Returns | Hummingbird Hammocks" />;
