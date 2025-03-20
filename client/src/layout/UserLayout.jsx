// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Outlet, useLocation } from "react-router-dom";
// import { AxiosInstance } from "../config/AxiosInstance";
// import AuthorizedHeader from "../components/user/AuthorizedHeader";
// import UnauthorizedHeader from "../components/user/UnauthorizedHeader";
// import UserFooter from "../components/user/UserFooter";
// import { clearUser, saveUser } from "../redux/features/userSlice";

// function UserLayout() {
//   const location = useLocation();
//   const { isUserAuth } = useSelector((state) => state.user);
//   const dispatch = useDispatch();

//   const checkUser = async () => {
//     try {
//       const response = await AxiosInstance({
//         method: "GET",
//         url: "/user/check-user",
//       });
//       console.log("=======response", response);
//       dispatch(saveUser());
//     } catch (error) {
//       console.log(error);
//       dispatch(clearUser());
//     }
//   };
//   console.log("=======isuserauth", isUserAuth);
//   useEffect(() => {
//     checkUser();
//   }, [location.pathname]);

//   return (
//     <div>
//       {isUserAuth ? <AuthorizedHeader /> : <UnauthorizedHeader />}
//       <Outlet />
//       <UserFooter />
//     </div>
//   );
// }

// export default UserLayout;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { AxiosInstance } from "../config/AxiosInstance";
import AuthorizedHeader from "../components/user/AuthorizedHeader";
import UnauthorizedHeader from "../components/user/UnauthorizedHeader";
import UserFooter from "../components/user/UserFooter";
import { clearUser, saveUser } from "../redux/features/userSlice";

function UserLayout() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isUserAuth } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true); // ✅ Added loading state

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await AxiosInstance.get("/user/check-user");
        console.log("======= response:", response);
        dispatch(saveUser(response.data.user)); // ✅ Pass user data
      } catch (error) {
        console.log("Auth error:", error);
        dispatch(clearUser());
      } finally {
        setLoading(false); // ✅ Stop loading
      }
    };

    checkUser();
  }, [dispatch]); // ✅ Runs only once when component mounts

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>; // ✅ Prevent flickering
  }

  return (
    <div>
      {isUserAuth ? <AuthorizedHeader /> : <UnauthorizedHeader />}
      <Outlet />
      <UserFooter />
    </div>
  );
}

export default UserLayout;
