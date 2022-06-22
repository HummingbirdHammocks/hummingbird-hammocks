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
    `gatsby-plugin-material-ui`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Poppins\:200,300,400,500`, `Montserrat\:300,400,700`],
        display: "swap",
      },
    },
  ],
}
