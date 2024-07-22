const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { validateNumber } = require('../../middleware/validates');
const authenticateJWT = require('../../middleware/role');
// add middleware  account
// Define routes
router.get('/oneCategory/:id',validateNumber, controller.getCategory);
router.get('/muiltiCategory', controller.getMuiltiCategory);
router.post('/createCategory',authenticateJWT(['Manager']), controller.createCategory);
router.put('/updateCategory',authenticateJWT(['Manager']), controller.updateCategory);
router.delete('/deleteCategory/:id',authenticateJWT(['Manager']),validateNumber, controller.deleteCategory);
module.exports = router;