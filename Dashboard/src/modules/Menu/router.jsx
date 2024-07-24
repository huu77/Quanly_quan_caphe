
import { Children } from "react";
import Pagemenu from "./index";
import PageMain from "./MainBody";
import PageStaff from "./Staff";
import PageDetailStaff from "./DetailStaff";
import PageSession from './Sesion'
import PageCategory from './Category'
const RouterMenu = {
  path: "/",
  element: <Pagemenu />,
  children:[
    {
      path: "",
      element: <PageMain />,
    },
    {
      path: "staff",
      element: <PageStaff />,
    },
    {
      path: "detailstaff",
      element: <PageDetailStaff />,
    },
    {
      path: "session",
      element: <PageSession />,
    },
    {
      path: "category",
      element: <PageCategory />,
    }
  ]
};

export default RouterMenu;
