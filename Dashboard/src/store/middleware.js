// middleware.js

import Product from "@apis/slices/Product";
import Account from "@apis/slices/Account";
import Table from "@apis/slices/Table";
import Status from "@apis/slices/Status";
import Category from "@apis/slices/Category";

const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware()
    .concat(Product.middleware)
    .concat(Account.middleware)
    .concat(Table.middleware)
    .concat(Status.middleware)
    .concat(Category.middleware)

export default middleware;
