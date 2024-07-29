const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { validateNumber } = require('../../middleware/validates');
const authenticateJWT = require('../../middleware/role');
// add middleware  account
// Define routes
router.get('/oneOrder/:id', validateNumber, controller.getOrder);
router.get('/oneOrder/:idcustomer', validateNumber, controller.getOrderOfCustomer);
router.get('/muiltiOrder', controller.getMuiltiOrder);
router.post('/createOrder', controller.createOrder);
router.put('/updateOrder',authenticateJWT(['Manager']), controller.updateOrder);
router.delete('/deleteOrder/:id',authenticateJWT(['Manager']),validateNumber, controller.deleteOrder);
router.post('/createOrderByCustomer', controller.createOrderByCustomer);
module.exports = router;