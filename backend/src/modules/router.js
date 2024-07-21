const express = require('express');
const routers = express.Router();

const StatusRouter = require('./Table_Status/router')

routers.use(StatusRouter)


module.exports = routers