const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { validateNumber } = require('../../middleware/validates');
// add middleware  account
// Define routes
router.get('/oneRole/:id',validateNumber, controller.getRole);
router.get('/muiltiRole', controller.getMuiltiRole);
router.post('/createRole', controller.createRole);
router.put('/updateRole', controller.updateRole);
router.delete('/deleteRole/:id',validateNumber, controller.deleteRole);
module.exports = router;