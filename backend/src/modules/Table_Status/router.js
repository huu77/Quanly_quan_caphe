const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { validateNumber } = require('../../middleware/validates');
// add middleware  account
// Define routes
router.get('/oneStatus/:id',validateNumber, controller.getStatus);
router.get('/muiltiStatus', controller.getMuiltiStatus);
router.post('/createStatus', controller.createStatus);
router.put('/updateStatus', controller.updateStatus);
router.delete('/deleteStatus/:id',validateNumber, controller.deleteStatus);
module.exports = router;