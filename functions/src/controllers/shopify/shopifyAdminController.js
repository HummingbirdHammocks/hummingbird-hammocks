const {
  getOrderByName,
  getOrdersByEmail,
  checkReturnEligible,
  sendReturnRequest,
  getOrderByID
} = require('../../utils/shopifyAdmin');

exports.get_order_by_id = async function (req, res) {
  if (!req.body.id) {
    return res.status(500).send('id is required');
  }

  return await getOrderByID(req.body.id)
    .then((response) => res.status(200).send(response))
    .catch((error) => {
      console.log('get_order_by_id: ' + error);
      return res.status(500).send(error.message);
    });
};

exports.get_order_by_name = async function (req, res) {
  if (!req.body.orderName) {
    return res.status(500).send('orderName is required');
  }

  return await getOrderByName(req.body.orderName)
    .then((response) => res.status(200).send(response))
    .catch((error) => {
      console.log('get_order_by_name: ' + error);
      return res.status(500).send(error.message);
    });
};

exports.get_orders_by_email = async function (req, res) {
  if (!req.body.email) {
    return res.status(500).send('email is required');
  }

  return await getOrdersByEmail(req.body.email)
    .then((response) => res.status(200).send(response))
    .catch((error) => {
      console.log('get_orders_by_email: ' + error);
      return res.status(500).send(error.message);
    });
};

exports.check_return_eligible = async function (req, res) {
  if (!req.body.orderId) {
    return res.status(500).send('orderId is required');
  }

  return await checkReturnEligible(req.body.orderId)
    .then((response) => res.status(200).send(response))
    .catch((error) => {
      console.log('check_return_eligible: ' + error);
      return res.status(500).send(error.message);
    });
};

exports.request_return = async function (req, res) {
  if (!req.body.orderId) {
    return res.status(500).send('orderId is required');
  }

  if (!req.body.returnItems) {
    return res.status(500).send('returnItems are required');
  }

  return await sendReturnRequest(req.body.orderId, req.body.returnItems)
    .then((response) => res.status(200).send(response))
    .catch((error) => {
      console.log('request_return: ' + error);
      return res.status(500).send(error.message);
    });
};
