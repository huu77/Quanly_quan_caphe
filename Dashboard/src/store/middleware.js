// middleware.js

import Product from "@apis/slices/Product";
import Account from "@apis/slices/Account";
import Table from "@apis/slices/Table";
import Category from "@apis/slices/Category";
import Client from "@apis/slices/Client";
import Session from "@apis/slices/Session";
import Customer from "@apis/slices/Customer";
import Order from "@apis/slices/Order";


const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware()
    .concat(Product.middleware)
    .concat(Account.middleware)
    .concat(Table.middleware)
    .concat(Category.middleware)
    .concat(Client.middleware)
    .concat(Session.middleware)
    .concat(Customer.middleware)
    .concat(Order.middleware)


export default middleware;
