const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { validateNumber } = require('../../middleware/validates');

router.get('/OneProfile/:id', validateNumber, controller.getProfile);
router.post('/createProfile', controller.createProfile);
router.put('/updateProfile', controller.updateProfile);
router.delete('/deleteProfile/:id', controller.deleteProfile);

module.exports = router;