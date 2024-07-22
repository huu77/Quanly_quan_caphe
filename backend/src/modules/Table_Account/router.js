const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { validateNumber } = require('../../middleware/validates');
const authenticateJWT = require('../../middleware/role');

router.get('/OneAccount/:id',authenticateJWT(['Manager','Start','Counter Staff']), validateNumber, controller.getAccount);
router.get('/muiltiAccount',authenticateJWT(['Manager']), controller.getMuiltiAccount);
router.post('/createAccount', controller.createAccount);
router.put('/updateAccount/:id',authenticateJWT(['Manager']), controller.updateAccount);
router.delete('/deleteAccount/:id',authenticateJWT(['Manager']), controller.deleteAccount);
router.put('/updateIsActive/:id',authenticateJWT(['Manager']), controller.UpdateIsActive);// xoa mềm
router.post('/login', controller.login);
router.post('/refreshtoken',authenticateJWT(['Manager','Start','Counter Staff']), controller.refreshtoken);
module.exports = router;