import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import Home from "../pages/user/Home";
import About from "../pages/user/About";
import Contact from "../pages/user/Contact";
import Signup from "../pages/user/Signup";
import Login from "../pages/user/Login";
import Products from "../pages/user/Products";
import ProductDetails from "../pages/user/ProductDetails";
import UserProfile from "../pages/user/UserProfile";
import NewArrivals from "../pages/user/NewArrivals";
import ErrorPage from "../pages/shared/ErrorPage";
import ProductCategory from "../pages/user/ProductCategory";
import Cart from "../pages/user/Cart";
import UpdateUserProfile from "../pages/user/UpdateUserProfile";
import SellerLayout from "../layout/SellerLayout";
import SellerHome from "../pages/seller/SellerHome";
import SellerSignup from "../pages/seller/SellerSignup";
import SellerLogin from "../pages/seller/SellerLogin";
import SellerProfile from "../pages/seller/SellerProfile";
import AdminLayout from "../layout/AdminLayout";
import AdminSignup from "../pages/admin/AdminSignup";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminProfile from "../pages/admin/AdminProfile";
import UpdateSellerProfile from "../pages/seller/UpdateSellerProfile";
import UpdateAdminProfile from "../pages/admin/UpdateAdminProfile";
import CreateProduct from "../pages/seller/CreateProduct";
import UpdateProduct from "../pages/seller/UpdateProduct";
import SellerProducts from "../pages/seller/SellerProducts";
import SellerProductDetails from "../pages/seller/SellerProductDetails";
import GetAllUsers from "../pages/admin/GetAllUsers";
import GetAllSellers from "../pages/admin/GetAllSellers";
import GetSellerOrders from "../pages/seller/GetSellerOrders";
import GetAllOrders from "../pages/admin/GetAllOrders";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPasswordUser from "../pages/user/ForgotPasswordUser";
import ResetPasswordUser from "../pages/user/ResetPasswordUser";
import ForgotPasswordSeller from "../pages/seller/ForgotPasswordSeller";
import ResetPasswordSeller from "../pages/seller/ResetPasswordSeller";
import ForgotPasswordAdmin from "../pages/admin/ForgotPasswordAdmin";
import ResetPasswordAdmin from "../pages/admin/ResetPasswordAdmin";
import PaymentSuccess from "../pages/user/PaymentSuccess";
import AdminDashboard from "../components/admin/AdminDashboard";
import UserOrders from "../pages/user/UserOrders";
import SellerBenefits from "../components/seller/SellerBenefits";
import ProtectedRouteSeller from "./ProtectedRouteSeller";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminProductDetails from "../pages/admin/AdminProductDetails";
import AdminUpdateProduct from "../pages/admin/AdminUpdateProduct";
import SellerDashboard from "../components/seller/SellerDashboard";
import ProtectedRouteAdmin from "./ProtectedRouteAdmin";
import SellerAbout from "../pages/seller/SellerAbout";
import SellerContact from "../pages/seller/SellerContact";
import AdminAbout from "../pages/admin/AdminAbout";
import AdminContact from "../pages/admin/AdminContact";

export const router = createBrowserRouter([
  {
    path: "",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "signup", element: <Signup /> },
      { path: "login", element: <Login /> },
      { path: "products", element: <Products /> },
      { path: "product-details/:id", element: <ProductDetails /> },
      { path: "new-arrivals", element: <NewArrivals /> },
      { path: "products/:category", element: <ProductCategory /> },
      { path: "forgot-password", element: <ForgotPasswordUser /> },
      { path: "reset-password/:token", element: <ResetPasswordUser /> },
      {
        path: "user",
        element: <ProtectedRoute />,
        children: [
          { path: "profile", element: <UserProfile /> },
          { path: "update-profile", element: <UpdateUserProfile /> },
          { path: "cart", element: <Cart /> },
          { path: "payment/success", element: <PaymentSuccess /> },
          { path: "get-order", element: <UserOrders /> },
        ],
      },
    ],
  },
  {
    path: "seller",
    element: <SellerLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <SellerHome /> },
      { path: "signup", element: <SellerSignup /> },
      { path: "login", element: <SellerLogin /> },
      { path: "about", element: <SellerAbout /> },
      { path: "contact", element: <SellerContact /> },
      {
        element: <ProtectedRouteSeller />,
        children: [
          { path: "dashboard", element: <SellerDashboard /> },
          { path: "profile", element: <SellerProfile /> },
          { path: "update-profile", element: <UpdateSellerProfile /> },
          { path: "create-product", element: <CreateProduct /> },
          { path: "update-product/:id", element: <UpdateProduct /> },
          { path: "products", element: <SellerProducts /> },
          { path: "product-details/:id", element: <SellerProductDetails /> },
          { path: "get-seller-orders", element: <GetSellerOrders /> },
          { path: "forgot-password", element: <ForgotPasswordSeller /> },
          { path: "reset-password/:token", element: <ResetPasswordSeller /> },
          { path: "benefits", element: <SellerBenefits /> },
        ],
      },
    ],
  },
  {
    path: "admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "login", element: <AdminLogin /> },
      { path: "signup", element: <AdminSignup /> },
      { path: "about", element: <AdminAbout /> },
      { path: "contact", element: <AdminContact /> },
      { path: "forgot-password", element: <ForgotPasswordAdmin /> },
      { path: "reset-password/:token", element: <ResetPasswordAdmin /> },
      {
        element: <ProtectedRouteAdmin />,
        children: [
          { path: "", element: <AdminDashboard /> },
          { path: "profile", element: <AdminProfile /> },
          { path: "update-profile", element: <UpdateAdminProfile /> },
          { path: "get-all-users", element: <GetAllUsers /> },
          { path: "get-all-sellers", element: <GetAllSellers /> },
          { path: "get-all-orders", element: <GetAllOrders /> },
          { path: "products", element: <AdminProducts /> },
          { path: "product-details/:id", element: <AdminProductDetails /> },
          { path: "update-product/:id", element: <AdminUpdateProduct /> },
        ],
      },
    ],
  },
]);
