// middleware.js

import Product from "@apis/slices/Product";
import Account from "@apis/slices/Account";
import Table from "@apis/slices/Table"; 
import Category from "@apis/slices/Category";
import Client from "@apis/slices/Client";
import Session from "@apis/slices/Session";
const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware()
    .concat(Product.middleware)
    .concat(Account.middleware)
    .concat(Table.middleware)
    .concat(Category.middleware)
    .concat(Client.middleware)
    .concat(Session.middleware)
export default middleware;
