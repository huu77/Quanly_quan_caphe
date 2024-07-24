import { createBrowserRouter } from "react-router-dom";
import RouterPage404 from "./Page404/router";
import RouterPageMenu from "./Menu/router";
import RouterLogin from './Login/router'
export const routers = createBrowserRouter([
  RouterPage404,
  RouterPageMenu,
  RouterLogin
]);
