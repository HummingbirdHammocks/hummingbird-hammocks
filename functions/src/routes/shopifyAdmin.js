var express = require('express');
var router = express.Router();

// Require controller modules.
var shopify_admin_controller = require('../controllers/shopify/shopifyAdminController');

/// SHOPIFY ADMIN ROUTES ///

//Get an order by its shopify id
router.post('/get_order_by_id', shopify_admin_controller.get_order_by_id);

//Get an order by its common name
router.post('/get_order_by_name', shopify_admin_controller.get_order_by_name);

//Get all orders related to an email
router.post('/get_orders_by_email', shopify_admin_controller.get_orders_by_email);

//Get the status of return eligibility for an order id
router.post('/check_return_eligible', shopify_admin_controller.check_return_eligible);

//Create a return request for an order id
router.post('/request_return', shopify_admin_controller.request_return);

//Add tags to a customer
router.post('/add_customer_tags', shopify_admin_controller.add_customer_tags);

//Remove tags from a customer
router.post('/remove_customer_tags', shopify_admin_controller.remove_customer_tags);

module.exports = router;
