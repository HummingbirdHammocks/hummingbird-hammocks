import React from "react"

import { Seo, Layout } from "components"
import { Info } from "sections"

const ShippingPolicyPage = () => (
  <Layout>
    <Seo title="DO NOT SELL MY PERSONAL INFORMATION" />

    <Info subTextAlign="left" title="DO NOT SELL MY PERSONAL INFORMATION">
      <b>YOUR RIGHTS UNDER THE CALIFORNIA CONSUMER PRIVACY ACT</b> <br />
      <br />
      The California Consumer Privacy Act (CCPA) provides you with rights
      regarding how your data or personal information is treated. Under the
      legislation, California residents can choose to opt out of the “sale” of
      their personal information to third parties. Based on the CCPA definition,
      “sale” refers to data collection for the purpose of creating advertising
      and other communications.{" "}
      <a
        href="https://oag.ca.gov/privacy/ccpa"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn more about CCPA and your privacy rights.
      </a>
      <br />
      <br />
      <b>How to opt out</b> <br />
      <br />
      By clicking on the link below, we will no longer collect or sell your
      personal information. This applies to both third-parties and the data we
      collect to help personalize your experience on our website or through
      other communications. For more information, view our privacy policy.
      <br />
      <br />
      To be eligible to opt-out, you must be browsing from California.
    </Info>
  </Layout>
)

export default ShippingPolicyPage
