const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { validateNumber } = require('../../middleware/validates');
const authenticateJWT = require('../../middleware/role');
// add middleware  account
// Define routes
router.get('/oneTable/:id',validateNumber, controller.getTable);
router.get('/muiltiTable', controller.getMuiltiTable);
router.post('/createTable',authenticateJWT(['Manager']), controller.createTable);
router.put('/updateTable',authenticateJWT(['Manager']), controller.updateTable);
router.delete('/deleteTable/:id',authenticateJWT(['Manager']),validateNumber, controller.deleteTable);
module.exports = router;