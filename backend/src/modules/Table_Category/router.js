const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { validateNumber } = require('../../middleware/validates');
// add middleware  account
// Define routes
router.get('/oneCategory/:id',validateNumber, controller.getCategory);
router.get('/muiltiCategory', controller.getMuiltiCategory);
router.post('/createCategory', controller.createCategory);
router.put('/updateCategory', controller.updateCategory);
router.delete('/deleteCategory/:id',validateNumber, controller.deleteCategory);
module.exports = router;