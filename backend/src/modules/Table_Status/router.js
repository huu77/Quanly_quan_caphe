const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { validateNumber } = require('../../middleware/validates');

// Define routes
router.get('/oneStatus/:id',validateNumber, controller.getStatus);
router.get('/muiltiStatus', controller.getMuiltiStatus);
router.post('/createStatus', controller.createStatus);
router.post('/updateStatus',validateNumber, controller.updateStatus);
module.exports = router;