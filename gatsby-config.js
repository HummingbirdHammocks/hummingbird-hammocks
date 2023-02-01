require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const queries = require("./src/utils/algolia/queries")

module.exports = {
  siteMetadata: {
    title: `Hummingbird Hammocks`,
    description: `Ultralight hammocks for camping and backpacking that are as tiny in your pack as they are on the scale. Hammocks, rain tarps, bug nets, tree straps, underquilts, and more designed to be as light and small as possible. Lighten your pack with Hummingbird Hammocks!`,
    keywords: `hummingbird hammock, ultralight hammocks, camping hammocks, hammock straps, hammock shelter, parachute hammock, ultralight camping, tree straps, Hammock Accessories, tree strap extensions, revivex pro cleaner, bug net, camping accessories, sleeping pad`,
    siteName: `Hummingbird Hammocks`,
    siteUrl: `https://hummingbirdhammocks.com/`,
    author: `@HummingbirdHammocks`,
    phone: `+17193772116`,
    email: `support@hummingbirdhammocks.com`,
    address: `18611 Cherry Springs Ranch Dr. Monument, CO 80132 USA`,
    privacyAccessibilityTermsUpdateDate: "15 May, 2022",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sitemap`,
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://hummingbirdhammocks.com",
        sitemap: "https://hummingbirdhammocks.com/sitemap.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleAnalytics: {
          trackingId: 'G-0XCJVE8GYC',
          // Setting this parameter is optional
          anonymize: true
        },
        facebookPixel: {
          pixelId: '560472584330855'
        },
        // Defines the environments where the tracking should be available  - default is ["production"]
        environments: ['production']
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/images/icon.png`,
      },
    },
    `gatsby-plugin-material-ui`,
    {
      resolve: "gatsby-source-shopify",
      options: {
        password: process.env.SHOPIFY_SHOP_PASSWORD,
        storeUrl: process.env.GATSBY_SHOPIFY_STORE_URL,
        shopifyConnections: ["collections"],
        apiVersion: "2022-04",
        // downloadImages: true,
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.GATSBY_ALGOLIA_ADMIN_KEY,
        queries,
        chunkSize: 10000, // default: 1000
      },
    },
  ],
}
