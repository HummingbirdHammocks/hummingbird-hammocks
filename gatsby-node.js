const path = require(`path`)
const axios = require("axios")
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

const NODE_TYPE = "Articles"

// called each time a node is created
exports.onCreateNode = async ({
  node, // the node that was just created
  actions: { createNode, createNodeField },
  createNodeId,
  getCache,
}) => {
  if (node.internal.type === NODE_TYPE) {
    const fileNode = await createRemoteFileNode({
      // the url of the remote image to generate a node for
      url: node.image.src,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      getCache,
    })

    if (fileNode) {
      createNodeField({ node, name: "localFile", value: fileNode.id })
    }
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type Articles implements Node {
      localFile: File @link(from: "fields.localFile")
    }
  `)
}

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions
  const {
    data: { articles }
  } = await axios(
    `https://${process.env.GATSBY_SHOPIFY_SHOP_NAME}.myshopify.com/admin/api/${process.env.GATSBY_SHOPIFY_API_VERSION}/blogs/${process.env.GATSBY_SHOPIFY_BLOG_ID}/articles.json`,
    {
      headers: {
        "X-Shopify-Access-Token": process.env.GATSBY_SHOPIFY_ADMIN_ACCESS_TOKEN
      }
    },
  )

  articles.forEach((node, index) => {
    createNode({
      ...node,
      id: createNodeId(`${NODE_TYPE}-${node.id}`),
      parent: null,
      children: [],
      internal: {
        type: NODE_TYPE,
        content: JSON.stringify(node),
        contentDigest: createContentDigest(node),
      },
    })
  })
}

// Absolute imports
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  //get shopifyId & handle from graphql
  const { data } = await graphql(`
    {
      allShopifyCollection {
        edges {
          node {
            handle
            shopifyId
          }
        }
      }
      allShopifyProduct {
        edges {
          next {
            handle
            title
          }
          node {
            id
            handle
            collections {
              handle
              title
            }
          }
          previous {
            handle
            title
          }
        }
      }
      allArticles {
        edges {
          node {
            handle
            id
          }
          next {
            handle
            title
          }
          previous {
            handle
            title
          }
        }
      }
    }
  `)

  //create single product pages
  data.allShopifyProduct.edges.forEach(({ node, previous, next }) => {
    createPage({
      path: `products/${node.handle}`,
      context: {
        id: node.id,
        collection: node.collections[1]?.handle
          ? {
            handle: node.collections[1].handle,
            title: node.collections[1].title,
          }
          : {
            handle: node.collections[0].handle,
            title: node.collections[0].title,
          },
        prev: {
          handle: previous?.handle,
          title: previous?.title,
        },
        next: {
          handle: next?.handle,
          title: next?.title,
        },
      },
      component: path.resolve("./src/templates/ProductsTemplate/index.js"),
    })
  })

  // create collections products pages
  data.allShopifyCollection.edges.forEach(({ node }) => {
    createPage({
      path: `collections/${node.handle}`,
      context: {
        shopifyId: node.shopifyId,
      },
      component: path.resolve("./src/templates/CollectionsTemplate/index.js"),
    })
  })

  // create blog pages with pagination
  const articles = data.allArticles.edges
  const articlesPerPage = 12
  const numPages = Math.ceil(articles.length / articlesPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blogs/news` : `/blogs/news/${i + 1}`,
      component: path.resolve("./src/templates/BlogTemplate/index.js"),
      context: {
        limit: articlesPerPage,
        skip: i * articlesPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  // create single articles pages
  articles.forEach(({ node, previous, next }) => {
    createPage({
      path: `blogs/news/${node.handle}`,
      context: {
        id: node.id,
        handle: node.handle,
        prev: {
          handle: previous?.handle,
          title: previous?.title,
        },
        next: {
          handle: next?.handle,
          title: next?.title,
        },
      },
      component: path.resolve("./src/templates/ArticlesTemplate/index.js"),
    })
  })
}
