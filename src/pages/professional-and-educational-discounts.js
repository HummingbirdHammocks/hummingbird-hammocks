import { IframeWrap, Layout, Seo } from 'components';
import { Script } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';
import { Hero, Info } from 'sections';

const heroData = {
  position: 'center',
  mainText: 'PRO DEAL PROGRAM'
};

const ProDealPage = () => (
  <Layout>
    <Seo />
    <Hero data={heroData}>
      <StaticImage
        style={{
          gridArea: '1/1'
        }}
        loading="eager"
        layout="fullWidth"
        alt="Ultralight Hammock"
        src="../assets/images/pro-deal/pro-deal.jpg"
        placeholder="blurred"
      />
    </Hero>
    <Info
      title="WE APPRECIATE WHAT YOU DO!
">
      Our Pro Deal Program is our way of providing outdoor professionals and military personnel our
      products at a discounted price. If you are interested in applying for our Pro Deal Program
      please fill out the form below and we will get back to you shortly.
      <br />
      <br />
      <b>By sending this application you agree to the following terms and conditions:</b>
      <br />
      <br />
      <i>
        This special pricing program is strictly confidential, you are not to disclose these special
        prices to anyone outside our pro customer program. We may limit the quantities of products
        you may purchase using your pro deal. You may not resell products purchased with this
        program, purchase products for anyone else using this program, or allow anyone to purchase
        items under your name. Modifying, obscuring or removing the logo on products is prohibited.
        Sales using this program are final. Failure to follow these terms and conditions will result
        in your pro customer status being revoked.
      </i>
      <br />
      <br />
      <b>Thank you for your hard work in the outdoor industry!</b>
    </Info>
    <Script id="airtable" src="https://static.airtable.com/js/embed/embed_snippet_v1.js" />
    <IframeWrap>
      <iframe
        className="airtable-embed airtable-dynamic-height"
        src="https://airtable.com/embed/shrCreMzJ0hgwjKdp?backgroundColor=blue"
        frameborder="0"
        onmousewheel=""
        width="100%"
        height="2474"
        title="Pro Deal Program Form"
        style={{ border: '1px solid #ccc' }}></iframe>
    </IframeWrap>
  </Layout>
);

export default ProDealPage;
