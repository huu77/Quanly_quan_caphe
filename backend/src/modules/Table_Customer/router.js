const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { validateNumber } = require('../../middleware/validates');

router.get('/OneCustomer/:id', validateNumber, controller.getCustomer);
router.get('/muiltiCustomer', controller.getMuiltiCustomer);
router.get('/getAllCustomer', controller.getAllCustomer);
router.post('/createCustomer', controller.createCustomer);
router.put('/updateCustomer', controller.updateCustomer);
router.delete('/deleteCustomer/:id', controller.deleteCustomer);
router.get('/checkCustomerExists/:phoneNumber', controller.checkCustomerExists);

module.exports = router;