import React from "react";
import { Redirect } from "react-router-dom";
 
//Tables
import BasicTables from "../pages/Tables/BasicTables/BasicTables";
import GridTables from "../pages/Tables/GridTables/GridTables"; 
 

//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";

const authProtectedRoutes = [ 
   
  //Tables
  { path: "/users", component: BasicTables },
  { path: "/tables-gridjs", component: GridTables }, 
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/users" />,
  },
];

const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPasswordPage }
];

export { authProtectedRoutes, publicRoutes };
