import React from "react";
import { Redirect } from "react-router-dom";

//login
import Login from "../pages/auth/Login";
import ForgetPasswordPage from "../pages/auth/ForgetPassword";
import UserPage from "../pages/user";
import GroupPage from "../pages/group";
import RolePage from "../pages/role";
import PostPage from "../pages/post";
import CommentPage from "../pages/comment";

const authProtectedRoutes = [
  { path: "/users", component: UserPage },
  { path: "/groups", component: GroupPage },
  { path: "/posts", component: PostPage },
  { path: "/roles", component: RolePage },
  { path: "/comments", component: CommentPage },
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/users" />,
  },
];

const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPasswordPage },
];

export { authProtectedRoutes, publicRoutes };
