const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { validateNumber } = require('../../middleware/validates');
const authenticateJWT = require('../../middleware/role');
// add middleware  account
// Define routes
router.get('/oneRole/:id',authenticateJWT(['Manager']),validateNumber, controller.getRole);
router.get('/muiltiRole',authenticateJWT(['Manager']), controller.getMuiltiRole);
router.post('/createRole',authenticateJWT(['Manager']), controller.createRole);
router.put('/updateRole',authenticateJWT(['Manager']), controller.updateRole);
router.delete('/deleteRole/:id',authenticateJWT(['Manager']),validateNumber, controller.deleteRole);
module.exports = router;