const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { validateNumber } = require('../../middleware/validates');
const authenticateJWT = require('../../middleware/role');


// add middleware  account
// Define routes
router.get('/oneProduct/:id',validateNumber, controller.getProduct);
router.get('/muiltiProduct',controller.getMuiltiProduct);
router.post('/createProduct', authenticateJWT(['Manager']),  controller.createProduct);
router.put('/updateProduct',authenticateJWT(['Manager']), controller.updateProduct);
router.delete('/deleteProduct/:id',authenticateJWT(['Manager']),validateNumber, controller.deleteProduct);
module.exports = router;