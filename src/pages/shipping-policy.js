import React from 'react';

import { Layout, Seo } from '../components';
import { Info } from '../sections';

const ShippingPolicyPage = () => (
  <Layout>
    <Info subTextAlign="left" title="SHIPPING POLICY">
      <b>GENERAL</b>
      <br />
      <br />
      We will always try our best to get your order to you as quickly as possible. <br /> <br /> We
      do not guarantee shipping times or delivery dates. If you need an order for a time sensitive
      event, please order well ahead of time. Allow at least 2 weeks for domestic orders, and 4
      weeks for international orders to ensure you order arrives in time. <br /> <br /> All orders
      are subject to product availability. <br /> <br /> We ship anywhere in the world except
      Indonesia.
      <br />
      <br />
      <b>DELIVERY TIME</b>
      <br />
      <br />
      Your order will be processed and shipped in 1-3 days from the time we receive your order,
      typically within 24 hours.
      <br />
      <br />
      Shipping time to most locations in the continental United States is about 5-7 days from the
      time the post office receives the package to the time it arrives at your location.
      <br />
      <br />
      Shipping time to international locations can vary drastically. Please account for 2-4 weeks
      for your package to be delivered after we ship it.
      <br />
      <br />
      <b>FREE SHIPPING OFFERS</b>
      <br />
      <br />
      We offer free shipping on orders within the United States. Our primary shipping methods for
      free-shipping orders are USPS First Class and USPS Priority, depending on the size of the
      order. We may also use other carriers for free-shipping orders, depending on shipping rates.
      International orders are not eligible for free shipping promotions.
      <br />
      <br />
      <b> RATES</b>
      <br />
      <br />
      We do not profit from shipping. Your shipping cost is calculated based on the weight and size
      of your order. You are charged what we are charged by the shipping company in addition to a
      small handling fee.
      <br /> <br />
      To find out how much your shipping will cost, simply add all the items you wish to order to
      your cart and proceed to the checkout page. Once at the checkout page you will be able to see
      your shipping charges added to your total cost.
      <br /> <br />
      If in the United States, sales tax is charged according to the state and county to which the
      item is shipped.
      <br />
      <br />
      <b>INTERNATIONAL SHIPPING</b>
      <br />
      <br />
      Customs charges and duty fees are the responsibility of the customer. We will not pay for any
      additional charges incurred by importing our products. Please account for the additional
      charges required by your country when calculating the total cost of our products.
      Additionally, we will not falsely claim the value of any of our products to avoid customs
      charges or duty fees.
      <br />
      <br />
      <b>DAMAGED OR MISSING ITEMS</b>
      <br />
      <br />
      Please inform us immediately of any damaged or missing items in your shipment. You can submit
      a <a href="https://hummingbirdhammocks.com/contact-us">Support Ticket</a> on our website,
      (preferred) or email us at{' '}
      <a href="mailto:help@hummingbirdhammocks.com">help@hummingbirdhammocks.com</a>, and we will
      assist you in correcting your order.
    </Info>
  </Layout>
);

export default ShippingPolicyPage;

export const Head = () => <Seo title="Shipping Policy | Hummingbird Hammocks" />;
