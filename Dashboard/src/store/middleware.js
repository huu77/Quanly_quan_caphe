// middleware.js

import Product from "@apis/slices/Product";
import Account from "@apis/slices/Account";
import Table from "@apis/slices/Table"; 
const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware()
    .concat(Product.middleware)
    .concat(Account.middleware)
    .concat(Table.middleware)
 
export default middleware;
