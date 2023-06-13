const query = `{
  allArticles {
    nodes {
      title
      id
      tags
      body_html
      localFile {
        childImageSharp {
          gatsbyImageData(height: 96, width: 96)
        }
      }
      handle
    }
  }
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
  allKnowledgebaseArticles {
    nodes {
      title
      id
      tags
      body_html
      localFile {
        childImageSharp {
          gatsbyImageData(height: 96, width: 96)
        }
      }
      handle
    }
  }
  allManualArticles {
    nodes {
      title
      id
      tags
      body_html
      localFile {
        childImageSharp {
          gatsbyImageData(height: 96, width: 96)
        }
      }
      handle
    }
  }
}
`;

const flatten = (arr) =>
  arr.map(({ data, ...rest }) => ({
    ...data,
    ...rest
  }));

const settings = {
  attributesToSnippet: [`description:20`]
};

const queries = [
  {
    query: query,
    transformer: ({ data }) => flatten(data.allShopifyProduct.nodes),
    indexName: process.env.GATSBY_ALGOLIA_PRODUCTS_INDEX_NAME,
    settings: settings
  },
  {
    query: query,
    transformer: ({ data }) => flatten(data.allArticles.nodes),
    indexName: process.env.GATSBY_ALGOLIA_ARTICLES_INDEX_NAME,
    settings: settings
  },
  {
    query: query,
    transformer: ({ data }) => flatten(data.allKnowledgebaseArticles.nodes),
    indexName: process.env.GATSBY_ALGOLIA_KNOWLEDGEBASE_INDEX_NAME,
    settings: settings
  },
  {
    query: query,
    transformer: ({ data }) => flatten(data.allManualArticles.nodes),
    indexName: process.env.GATSBY_ALGOLIA_MANUALS_INDEX_NAME,
    settings: settings
  }
];

module.exports = queries;
