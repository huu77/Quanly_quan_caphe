const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { validateNumber } = require('../../middleware/validates');
const authenticateJWT = require('../../middleware/role');

router.get('/OneProfile/:id',authenticateJWT(['Manager','Start','Counter Staff']), validateNumber, controller.getProfile);
router.get('/MuiltiProfile',authenticateJWT(['Manager']), controller.getAllProfile);
router.post('/createProfile',authenticateJWT(['Manager']), controller.createProfile);
router.put('/updateProfile', authenticateJWT(['Manager']),controller.updateProfile);
router.delete('/deleteProfile/:id',authenticateJWT(['Manager']), controller.deleteProfile);

module.exports = router;