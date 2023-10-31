import React from "react";
import { Redirect } from "react-router-dom";
   
//login
import Login from "../pages/auth/Login";
import ForgetPasswordPage from "../pages/auth/ForgetPassword";
import UserPage from "../pages/user";

const authProtectedRoutes = [  
  { path: "/users", component: UserPage }, 
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
