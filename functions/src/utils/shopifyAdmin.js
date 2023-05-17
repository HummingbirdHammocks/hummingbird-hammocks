const axios = require("axios");

const url = `https://${process.env.SHOPIFY_STORE_URL}/admin/api/${process.env.SHOPIFY_API_VERSION}/graphql.json`;

const config = {
  headers: {
    'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
    'Content-Type': 'application/json'
  }
};

exports.getOrderByName = async function (orderName) {
  if (!orderName) {
    return false
  };

  let data = JSON.stringify({
    query: `{
        orders(first: 1, query: "name:${orderName}") {
          edges {
            node {
              id
              name
              createdAt
              displayFulfillmentStatus
              lineItems(first: 20) {
                edges {
                  node {
                    title
                    variant {
                      sku
                      title
                      image {
                        originalSrc
                        height
                        id
                        url
                        width
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }`,
    variables: {}
  });

  return await axios
    .post(url, data, config)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        console.log("error_getOrderByName: " + JSON.stringify(response.data));
        throw new Error(JSON.stringify(response.data));
      }
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error);
    });
}

exports.getOrdersByEmail = async function (email) {
  if (!email) {
    return false
  };

  let data = JSON.stringify({
    query: `{
        orders(first: 10, query: "email:${email}") {
          edges {
            node {
              id
              name
              createdAt
              displayFulfillmentStatus
              lineItems(first: 20) {
                edges {
                  node {
                    title
                    variant {
                      sku
                      title
                      image {
                        originalSrc
                        height
                        id
                        url
                        width
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }`,
    variables: {}
  });

  return await axios
    .post(url, data, config)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        console.log("error_getOrdersByEmail: " + JSON.stringify(response.data));
        throw new Error(JSON.stringify(response.data));
      }
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error);
    });
}

exports.checkReturnEligible = async function (orderId) {
  if (!orderId) {
    return false
  };

  let data = JSON.stringify({
    query: `query returnableFulfillmentsQuery {
    returnableFulfillments(orderId: "${orderId}", first: 1) {
      edges {
        node {
          id
          fulfillment {
            id
          }
          returnableFulfillmentLineItems(first: 20) {
            edges {
              node {
                fulfillmentLineItem {
                  id
                }
                quantity
              }
            }
          }
        }
      }
    }
  }`,
    variables: {}
  });

  return await axios
    .post(url, data, config)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        console.log("error_checkReturnEligible: " + JSON.stringify(response.data));
        throw new Error(JSON.stringify(response.data));
      }
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error);
    });
}