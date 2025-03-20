import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRouteAdmin() {
  const { isAdminAuth } = useSelector((state) => state.admin);

  if (!isAdminAuth) {
    return <Navigate to="/admin/login" />;
  }

  return <Outlet />;
}

export default ProtectedRouteAdmin;
