var express = require('express');
var router = express.Router();

// Require controller modules.
var freescout_controller = require('../controllers/freescout/freescoutController');

/// FREESCOUT ROUTES ///

//Create Ticket
router.post('/create_ticket', freescout_controller.create_ticket);


module.exports = router;