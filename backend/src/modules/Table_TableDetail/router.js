const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/getAllTableDetail', controller.getTableDetail);
router.get('/getTableDetailById/:id', controller.getTableDetailById);
router.post('/createTableDetail', controller.createTableDetail);
router.put('/updateTableDetail', controller.updateTableDetail);
router.delete('/deleteTableDetail/:id', controller.deleteTableDetail);
module.exports = router;