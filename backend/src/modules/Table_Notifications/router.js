const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { validateNumber } = require('../../middleware/validates');

router.get('/notifications/:id', validateNumber, controller.getNotifications);
router.get('/notifications', controller.getMuiltiNotifications);
router.post('/createNotifications', controller.createNotifications);
router.put('/notifications/:id', validateNumber, controller.updateNotifications);
router.delete('/notifications/:id', validateNumber, controller.deleteNotifications);

module.exports = router;