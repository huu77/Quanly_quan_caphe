const express = require('express');
const router = express.Router();
const controller = require('./controller');

// Define routes
router.get('/oneStatus/:id', controller.getStatus);
router.get('/muiltiStatus', controller.getMuiltiStatus);
module.exports = router;