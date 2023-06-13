import { Container } from '@mui/material';
import { Layout, MainWrapper, Seo } from 'components';
import React from 'react';
import { ReturnsStepper } from 'sections';

const ReturnsPage = () => {
  return (
    <Layout>
      <Seo />

      <MainWrapper>
        <Container sx={{ marginTop: 2, marginBottom: 2 }}>
          <ReturnsStepper />
        </Container>
      </MainWrapper>
    </Layout>
  );
};

export default ReturnsPage;
