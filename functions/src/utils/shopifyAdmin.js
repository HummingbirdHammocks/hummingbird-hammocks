const axios = require('axios');

const url = `https://${process.env.SHOPIFY_STORE_URL}/admin/api/${process.env.SHOPIFY_API_VERSION}/graphql.json`;

const config = {
  headers: {
    'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
    'Content-Type': 'application/json'
  }
};

exports.getOrderByName = async function (orderName) {
  if (!orderName) {
    return false;
  }

  const data = JSON.stringify({
    query: `query orderByName($query: String!) {
        orders(first: 1, query: $query) {
          edges {
            node {
              id
              name
              createdAt
              displayFulfillmentStatus
              returnStatus
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
    variables: {
      query: `name:${orderName}}`
    }
  });

  return await axios
    .post(url, data, config)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        console.log('error_getOrderByName: ' + JSON.stringify(response.data));
        throw new Error(JSON.stringify(response.data));
      }
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error);
    });
};

exports.getOrdersByEmail = async function (email) {
  if (!email) {
    return false;
  }

  const data = JSON.stringify({
    query: `query ordersByEmail($query: String!) {
        orders(first: 10, query: $query) {
          edges {
            node {
              id
              name
              createdAt
              displayFulfillmentStatus
              returnStatus
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
    variables: {
      query: `email:${email}}`
    }
  });

  return await axios
    .post(url, data, config)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        console.log('error_getOrdersByEmail: ' + JSON.stringify(response.data));
        throw new Error(JSON.stringify(response.data));
      }
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error);
    });
};

exports.checkReturnEligible = async function (orderId) {
  if (!orderId) {
    return false;
  }

  const data = JSON.stringify({
    query: `query returnableFulfillmentsQuery($orderId: ID!) {
    returnableFulfillments(orderId: $orderId, first: 1) {
      edges {
        node {
          id
          fulfillment {
            id
          }
          # Return the first ten returnable fulfillment line items that belong to the order.
          returnableFulfillmentLineItems(first: 10) {
            edges {
              node {
                fulfillmentLineItem {
                  id
                  discountedTotalSet {
                      presentmentMoney {
                          amount
                          currencyCode
                      }
                  }
                  lineItem {
                      id
                      sku
                      title
                      name
                      refundableQuantity
                      image {
                          altText
                          height
                          id
                          url
                          width
                      }
                  }
                  quantity
                }
                quantity
              }
            }
          }
        }
      }
    }
  }`,
    variables: {
      orderId: orderId
    }
  });

  return await axios
    .post(url, data, config)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        console.log('error_checkReturnEligible: ' + JSON.stringify(response.data));
        throw new Error(JSON.stringify(response.data));
      }
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error);
    });
};

exports.sendReturnRequest = async function (orderId, returnItems) {
  if (!orderId || !returnItems) {
    return false;
  }

  const returnLineItems = returnItems.map((item) => {
    return {
      fulfillmentLineItemId: item.fulfillmentLineItemId,
      quantity: item.quantity,
      returnReason: item.returnReason,
      customerNote: item.customerNote
    };
  });

  console.log('sendReturnRequest: ', returnLineItems);

  const data = JSON.stringify({
    query: `mutation RequestReturnMutation($orderId: ID!, $returnLineItems: [ReturnRequestLineItemInput!]!) {
   returnRequest(
     input: {
       orderId: $orderId
       returnLineItems: $returnLineItems
     }
   ) {
     return {
       id
       status
     }
     userErrors {
       field
       message
     }
    }
  }`,
    variables: {
      orderId: orderId,
      returnLineItems: returnLineItems
    }
  });

  return await axios
    .post(url, data, config)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        console.log('error_sendReturnRequest: ' + JSON.stringify(response.data));
        throw new Error(JSON.stringify(response.data));
      }
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error);
    });
};
