import React from 'react';

import { IframeWrap, Layout, Seo } from '../components';

const AffiliateProgramPage = () => (
  <Layout>
    <IframeWrap>
      <iframe
        src="https://www.shoutout.global/signup?id=nq1rq"
        width="100%"
        height="900px"
        frameborder="no"
        title="Affiliate Program Form"></iframe>
    </IframeWrap>
  </Layout>
);

export default AffiliateProgramPage;

export const Head = () => <Seo title="Affiliate Program | Hummingbird Hammocks" />;
