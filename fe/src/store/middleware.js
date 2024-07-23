// middleware.js

// import ProvicesApi from "@apis/slice/provices";
 
const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware()
    // .concat(ProvicesApi.middleware)
    

export default middleware;
