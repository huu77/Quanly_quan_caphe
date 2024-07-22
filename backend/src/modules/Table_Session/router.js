const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { validateNumber } = require('../../middleware/validates');
const authenticateJWT = require('../../middleware/role');
// add middleware  account
// Define routes
router.get('/oneSession/:id',authenticateJWT(['Manager']),validateNumber, controller.getSession);
router.get('/muiltiSession',authenticateJWT(['Manager']), controller.getMuiltiSession);
router.post('/createSession',authenticateJWT(['Manager']), controller.createSession);
router.put('/updateSession',authenticateJWT(['Manager']), controller.updateSession);
router.delete('/deleteSession/:id',authenticateJWT(['Manager']),validateNumber, controller.deleteSession);
module.exports = router;