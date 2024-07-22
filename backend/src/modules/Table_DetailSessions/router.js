const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { validateNumber } = require('../../middleware/validates');
const authenticateJWT = require('../../middleware/role');
// add middleware  account
// Define routes
router.get('/oneDetailsSession/:id',authenticateJWT(['Manager','Start','Counter Staff']),validateNumber, controller.getDetailsSession);
router.get('/muiltiDetailsSession',authenticateJWT(['Manager','Start','Counter Staff']), controller.getMuiltiDetailsSession);
router.post('/createDetailsSession',authenticateJWT(['Manager']), controller.createDetailsSession);
router.put('/updateDetailsSession',authenticateJWT(['Manager']), controller.updateDetailsSession);
router.delete('/deleteDetailsSession/:id',authenticateJWT(['Manager']),validateNumber, controller.deleteDetailsSession);
module.exports = router;