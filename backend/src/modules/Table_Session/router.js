const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { validateNumber } = require('../../middleware/validates');
const authenticateJWT = require('../../middleware/role');
// add middleware  account
// Define routes
router.get('/oneSession/:id',authenticateJWT(['Manager','Start','Counter Staff']),validateNumber, controller.getSession);
router.get('/muiltiSession',authenticateJWT(['Manager','Start','Counter Staff']), controller.getMuiltiSession);
router.post('/createSession',authenticateJWT(['Manager']), controller.createSession);
router.put('/updateSession',authenticateJWT(['Manager']), controller.updateSession);
router.delete('/deleteSession/:id',authenticateJWT(['Manager']),validateNumber, controller.deleteSession);

router.post('/createSessionDetail',authenticateJWT(['Manager']), controller.createSessionDetail);
router.get('/getAllDetailSession',authenticateJWT(['Manager']), controller.getAllDetailSession);
router.get('/getAllNVtoSession/:id',authenticateJWT(['Manager']), controller.getAllNVtoSession);
module.exports = router;