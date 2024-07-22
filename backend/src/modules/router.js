const express = require('express');
const routers = express.Router();

const StatusRouter = require('./Table_Status/router')
const RoleRouter = require('./Table_Status/router')
routers.use(StatusRouter)
routers.use(RoleRouter)

module.exports = routers