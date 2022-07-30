const path = require(`path`)
const { nextTick } = require("process")

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
        prev: previous?.handle,
        next: next?.handle,
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
