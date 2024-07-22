const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { validateNumber } = require('../../middleware/validates');
const authenticateJWT = require('../../middleware/role');
// add middleware  account
// Define routes
router.get('/oneStatus/:id',validateNumber, controller.getStatus);
router.get('/muiltiStatus', controller.getMuiltiStatus);
router.post('/createStatus',authenticateJWT(['Manager']), controller.createStatus);
router.put('/updateStatus',authenticateJWT(['Manager']), controller.updateStatus);
router.delete('/deleteStatus/:id',authenticateJWT(['Manager']),validateNumber, controller.deleteStatus);
module.exports = router;