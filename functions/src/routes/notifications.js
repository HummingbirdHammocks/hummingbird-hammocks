var express = require('express');
var router = express.Router();

// Require controller modules.
var notifications_controller = require('../controllers/notifications/notificationsController');

/// FREESCOUT ROUTES ///

//Restock Notification
router.post('/restock_notification', notifications_controller.restock_notification);


module.exports = router;