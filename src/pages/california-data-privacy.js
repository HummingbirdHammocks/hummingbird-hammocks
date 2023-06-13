import { Layout, Seo } from 'components';
import React from 'react';
import { Info } from 'sections';

const ShippingPolicyPage = () => (
  <Layout>
    <Seo title="DO NOT SELL MY PERSONAL INFORMATION" />

    <Info subTextAlign="left" title="DO NOT SELL MY PERSONAL INFORMATION">
      <b>YOUR RIGHTS UNDER THE CALIFORNIA CONSUMER PRIVACY ACT</b>
      <br />
      <br />
      The California Consumer Privacy Act (CCPA) provides you with rights regarding how your data or
      personal information is treated. Under the legislation, California residents can opt out of
      the “sale” of their personal information to third parties. Based on the CCPA definition,
      “sale” refers to data collection for the purpose of creating advertising and other
      communications.{' '}
      <a href="https://oag.ca.gov/privacy/ccpa" target="_blank" rel="noopener noreferrer">
        Learn more about CCPA and your privacy rights.
      </a>
      <br />
      <br />
      <b>HOW TO OPT-OUT</b>
      <br />
      <br />
      Please let us know by submitting a{' '}
      <a href="https://hummingbirdhammocks.com/contact-us">Support Ticket</a> or emailing us at{' '}
      <a href="mailto:help@hummingbirdhammocks.com">help@hummingbirdhammocks.com</a> to let us know
      you would like to have your personal information deleted.
      <br />
      <br />
      We will then request your information be deleted through the Shopify platform, and after ten
      days, Shopify will process this erasure request. Shopify will also send a Webhook message to
      all the third-party app partners this merchant uses so they know to erase any information they
      have about this customer.
    </Info>
  </Layout>
);

export default ShippingPolicyPage;
