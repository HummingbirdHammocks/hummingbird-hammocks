const query = `{
  allArticles {
    nodes {
      title
      id
      tags
      contentHtml
      excerpt
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
      featuredMedia {
        preview {
          image {
            gatsbyImageData
            altText
          }
        }
      }
      handle
    }
  }
  allKnowledgebaseArticles {
    nodes {
      title
      id
      tags
      contentHtml
      excerpt
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
      contentHtml
      excerpt
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

const queries = [
  {
    query: query,
    transformer: ({ data }) => flatten(data.allShopifyProduct.nodes),
    indexName: process.env.GATSBY_ALGOLIA_PRODUCTS_INDEX_NAME,
    settings: {
      searchableAttributes: [`title`, `description`],
      attributesToSnippet: [`description:20`]
    }
  },
  {
    query: query,
    transformer: ({ data }) => flatten(data.allArticles.nodes),
    indexName: process.env.GATSBY_ALGOLIA_ARTICLES_INDEX_NAME,
    settings: {
      searchableAttributes: [`title`, `tags`, `contentHtml`],
      attributesToSnippet: [`excerpt:20`]
    }
  },
  {
    query: query,
    transformer: ({ data }) => flatten(data.allKnowledgebaseArticles.nodes),
    indexName: process.env.GATSBY_ALGOLIA_KNOWLEDGEBASE_INDEX_NAME,
    settings: {
      searchableAttributes: [`title`, `tags`, `contentHtml`],
      attributesToSnippet: [`excerpt:20`]
    }
  },
  {
    query: query,
    transformer: ({ data }) => flatten(data.allManualArticles.nodes),
    indexName: process.env.GATSBY_ALGOLIA_MANUALS_INDEX_NAME,
    settings: {
      searchableAttributes: [`title`, `tags`, `contentHtml`],
      attributesToSnippet: [`excerpt:20`]
    }
  }
];

module.exports = queries;
