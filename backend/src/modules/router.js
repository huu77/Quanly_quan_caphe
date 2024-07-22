const express = require('express');
const routers = express.Router();

const StatusRouter = require('./Table_Status/router')
const RoleRouter = require('./Table_Role/router')
const TableRouter = require('./Table_Table/router')
const CategoryRouter = require('./Table_Category/router')
routers.use(StatusRouter)
routers.use(RoleRouter)
routers.use(TableRouter)
routers.use(CategoryRouter)

module.exports = routers