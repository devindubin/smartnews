import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import React from "react";

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();
  const location = useLocation();
  if (!auth?.accessToken) {
    console.log("user not authenticated");
    //user is not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
