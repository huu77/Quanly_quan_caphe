const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { validateNumber } = require('../../middleware/validates');

router.get('/OneAccount/:id', validateNumber, controller.getAccount);
router.get('/muiltiAccount', controller.getMuiltiAccount);
router.post('/createAccount', controller.createAccount);
router.put('/updateAccount/:id', controller.updateAccount);
router.delete('/deleteAccount/:id', controller.deleteAccount);
router.post('/login', controller.login);

module.exports = router;