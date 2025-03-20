import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { AxiosInstance } from "../config/AxiosInstance";
import { clearAdmin, saveAdmin } from "../redux/features/adminSlice";
import AuthorizedHeader from "../components/admin/AuthorizedHeader";
import UnauthorizedHeader from "../components/admin/UnauthorizedHeader";
import AdminFooter from "../components/admin/AdminFooter";

const AdminLayout = () => {
  const location = useLocation();
  const { isAdminAuth } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const checkAdmin = async () => {
    try {
      const response = await AxiosInstance({
        method: "GET",
        url: "/admin/check-admin",
      });
      console.log("=======response", response);
      dispatch(saveAdmin(response.data));
    } catch (error) {
      console.log(error);
      dispatch(clearAdmin());
    }
  };

  console.log("=======isadminauth", isAdminAuth);

  useEffect(() => {
    checkAdmin();
  }, [location.pathname]);

  return (
    <div>
      {isAdminAuth ? <AuthorizedHeader /> : <UnauthorizedHeader />}
      <div>
        <Outlet />
      </div>
      <AdminFooter />
    </div>
  );
};

export default AdminLayout;
