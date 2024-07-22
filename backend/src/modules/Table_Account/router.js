const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { validateNumber } = require('../../middleware/validates');
const authenticateJWT = require('../../middleware/role');

router.get('/OneAccount/:id',authenticateJWT(['Manager','Start','Counter Staff']), validateNumber, controller.getAccount);
router.get('/muiltiAccount', controller.getMuiltiAccount);
router.post('/createAccount', controller.createAccount);
router.put('/updateAccount/:id', controller.updateAccount);
router.delete('/deleteAccount/:id', controller.deleteAccount);
router.put('/updateIsActive/:id', controller.UpdateIsActive);
router.post('/login', controller.login);
router.post('/refreshtoken', controller.refreshtoken);
module.exports = router;