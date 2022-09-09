const query = ` {
    allShopifyProduct {
        nodes {
          id
          title
          description
          featuredImage {
            gatsbyImageData
            altText
          }
          handle
        }
      }
  }
  `

const flatten = arr =>
  arr.map(({ data, ...rest }) => ({
    ...data,
    ...rest,
  }))

const settings = {
  attributesToSnippet: [`description:20`],
}

const queries = [
  {
    query: query,
    transformer: ({ data }) => flatten(data.allShopifyProduct.nodes),
    indexName: `dev_products`,
    settings: settings,
  },
]

module.exports = queries
