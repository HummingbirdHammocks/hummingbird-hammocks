const path = require(`path`)

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
          node {
            shopifyId
            handle
          }
        }
      }
    }
  `)

  //create single product pages
  data.allShopifyProduct.edges.forEach(({ node }) => {
    createPage({
      path: `products/${node.handle}`,
      context: {
        shopifyId: node.shopifyId,
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
}
