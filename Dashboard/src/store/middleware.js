// middleware.js

import Product from "@apis/slices/Product";
 
const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware()
    .concat(Product.middleware)
    

export default middleware;
