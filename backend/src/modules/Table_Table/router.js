const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { validateNumber } = require('../../middleware/validates');
// add middleware  account
// Define routes
router.get('/oneTable/:id',validateNumber, controller.getTable);
router.get('/muiltiTable', controller.getMuiltiTable);
router.post('/createTable', controller.createTable);
router.put('/updateTable', controller.updateTable);
router.delete('/deleteTable/:id',validateNumber, controller.deleteTable);
module.exports = router;