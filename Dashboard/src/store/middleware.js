// middleware.js

import Product from "@apis/slices/Product";
import Account from "@apis/slices/Account";
const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware()
    .concat(Product.middleware)
    .concat(Account.middleware)

export default middleware;
