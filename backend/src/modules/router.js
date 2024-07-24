const express = require('express');
const routers = express.Router();

const StatusRouter = require('./Table_Status/router')
const RoleRouter = require('./Table_Role/router')
const TableRouter = require('./Table_Table/router')
const AccountRouter = require('./Table_Account/router')
const ProfileRouter = require('./Table_Profile/router')
const CustomerRouter = require('./Table_Customer/router')
const NotificationsRouter = require('./Table_Notifications/router')
const ProductRouter = require('./Table_Product/router')
const SessionRouter = require('./Table_Session/router')
const DetailsSessionRouter = require('./Table_DetailSessions/router')
const OrderRouter = require('./Table_Order/router')
const TableStatusRouter = require('./Table_TableStatus/router')
// const TableDetailRouter = require('./Table_TableDetail/router')
const PaymentRouter = require('./Table_Payment/router')
routers.use(StatusRouter)
routers.use(RoleRouter)
routers.use(AccountRouter)
routers.use(ProfileRouter)
routers.use(TableRouter)
routers.use(CustomerRouter)
routers.use(NotificationsRouter)
routers.use(ProductRouter)
routers.use(SessionRouter)
routers.use(DetailsSessionRouter)
routers.use(OrderRouter)
routers.use(TableStatusRouter)
// routers.use(TableDetailRouter)
routers.use(PaymentRouter)
module.exports = routers