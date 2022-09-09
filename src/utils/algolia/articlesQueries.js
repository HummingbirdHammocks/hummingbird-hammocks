const query = `{
  allArticles {
    nodes {
      title
      handle
      id
      tags
      localFile {
        childImageSharp {
          gatsbyImageData(height: 96, width: 96)
        }
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
    transformer: ({ data }) => flatten(data.allArticles.nodes),
    indexName: `dev_articles`,
    settings: settings,
  },
]

module.exports = queries
