import React from "react"
import { StaticImage } from "gatsby-plugin-image"

import { Seo, Layout, IframeWrap } from "components"
import { Hero } from "sections"

const heroData = {
  position: "center",
  mainText: "AFFILIATE PROGRAM",
}

const AffiliateProgramPage = () => (
  <Layout>
    <Seo />
    <Hero data={heroData}>
      <StaticImage
        style={{
          gridArea: "1/1",
        }}
        layout="fullWidth"
        alt="Ultralight Hammock"
        src="../assets/images/pro-deal/pro-deal.jpg"
        placeholder="blurred"
      />
    </Hero>

    <IframeWrap>
      <iframe src="https://www.shoutout.global/signup?id=nq1rq" width="100%" height="900px" frameborder="no" title="Affiliate Program Form"></iframe>
    </IframeWrap>
  </Layout>
)

export default AffiliateProgramPage
