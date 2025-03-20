import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRouteSeller() {
  const { isSellerAuth } = useSelector((state) => state.seller);

  if (!isSellerAuth) {
    return <Navigate to="/seller/login" />;
  }

  return <Outlet />;
}

export default ProtectedRouteSeller;
