import React from "react";
import { Redirect } from "react-router-dom";

//login
import Login from "../pages/auth/Login";
import ForgetPasswordPage from "../pages/auth/ForgetPassword";
import UserPage from "../pages/user";
import GroupPage from "../pages/group";
import RolePage from "../pages/role";

const authProtectedRoutes = [
  { path: "/users", component: UserPage },
  { path: "/groups", component: GroupPage },
  { path: "/roles", component: RolePage },
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/users" />,
  },
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/groups" />,
  },
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/roles" />,
  },
];

const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPasswordPage },
];

export { authProtectedRoutes, publicRoutes };
