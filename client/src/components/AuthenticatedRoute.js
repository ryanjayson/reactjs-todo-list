import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthenticatedRoute = () => {
  const isAuthenticated = !!localStorage.getItem("auth_token");

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default AuthenticatedRoute;
