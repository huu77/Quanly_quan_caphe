// middleware.js
import Account from "@apis/slices/Account";
import Table from "@apis/slices/Table";

import Product from "@apis/slices/Product";

const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware()
    .concat(Product.middleware)
    .concat(Account.middleware)
    .concat(Table.middleware)


export default middleware;
