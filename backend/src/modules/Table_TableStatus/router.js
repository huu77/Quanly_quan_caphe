const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { validateNumber } = require('../../middleware/validates');
const authenticateJWT = require('../../middleware/role');

router.get('/muiltiStatusTable', controller.getTableStatus);
router.get('/statusTable/:id', validateNumber, controller.getTableStatusById);
router.post('/createStatusTable',authenticateJWT(['Manager']), controller.createTableStatus);
router.put('/updateStatusTable',authenticateJWT(['Manager']), controller.updateTableStatus);
router.delete('/deleteStatusTable',authenticateJWT(['Manager']), controller.deleteTableStatus);
module.exports = router;