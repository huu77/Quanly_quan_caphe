const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { validateNumber } = require('../../middleware/validates');

router.get('/payment', controller.getPayment);
router.get('/payment/:id', validateNumber, controller.getPaymentById);
router.post('/createPayment', controller.createPayment);
router.put('/updatePayment', controller.updatePayment);
router.delete('/deletePayment/:id', validateNumber, controller.deletePayment);
module.exports = router;