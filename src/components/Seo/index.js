import React from "react"
import { Helmet } from "react-helmet"
import { PropTypes } from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Image from "../../assets/images/logo.png"

// SEO & Schema Markup components

export const Seo = ({ title, description, keywords, image }) => (
  <StaticQuery
    query={query}
    render={({
      site: {
        siteMetadata: {
          defaultDescription,
          //   defaultImage,
          url,
          defaultKeywords,
          defaultTitle,
        },
      },
    }) => {
      const seo = {
        defaultTitle: defaultTitle,
        description: description || defaultDescription,
        image: `${image ? url + image : url + `${Image}`}`,
        keywords: `${keywords ? keywords + "," : defaultKeywords}`,
      }

      return (
        <Helmet
          title={title || defaultTitle}
          titleTemplate={title ? `%s | ${defaultTitle}` : ""}
        >
          <html lang="en" />
          <meta name="image" content={seo.image} />
          <meta name="description" content={seo.description} />
          <meta name="keywords" content={seo.keywords} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={seo.description} />
          <meta property="og:image" content={seo.image} />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={seo.description} />
          <meta name="twitter:image" content={seo.image} />
        </Helmet>
      )
    }}
  />
)

//get default seo data from gatsby-config.js
const query = graphql`
  {
    site {
      siteMetadata {
        defaultTitle: title
        defaultDescription: description
        defaultKeywords: keywords
        url: siteUrl
      }
    }
  }
`

Seo.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  keywords: PropTypes.string,
}
