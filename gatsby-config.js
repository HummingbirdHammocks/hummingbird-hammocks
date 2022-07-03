require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Title Here`,
    description: `google description goes here`,
    keywords: `google keywords`,
    siteName: `Example`,
    siteUrl: `https://example.com/`,
    author: `@hungryhipposolutions`,
    phone: `+8801705916049`,
    email: `example@email.com`,
    address: `Address goes here`,
    privacyAccessibilityTermsUpdateDate: "15 May, 2022",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
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
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts-with-attributes`,
      options: {
        fonts: [
          `poppins\::300,400,500,600,700,800,900`,
          `montserrat\::300,400,500,600,700`,
        ],
        display: "swap",
        attributes: {
          rel: "preload",
          as: "font",
          // rel: "stylesheet preload prefetch",
          // as: "style",
        },
      },
    },
    {
      resolve: "gatsby-source-shopify",
      options: {
        password: process.env.SHOPIFY_SHOP_PASSWORD,
        storeUrl: process.env.GATSBY_SHOPIFY_STORE_URL,
        shopifyConnections: ["collections"],
        // downloadImages: true,
      },
    },
  ],
}
