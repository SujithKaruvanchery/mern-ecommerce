import React from "react";
import { FiPackage, FiShoppingCart } from "react-icons/fi";
import SellerProducts from "./SellerProducts";
import GetSellerOrders from "./GetSellerOrders";
import SellerProductDetails from "./SellerProductDetails";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/5 bg-gray-800 text-white p-5">
        <h2 className="text-2xl font-bold mb-5">Seller Dashboard</h2>
        <ul>
          <li className="mb-3 flex items-center space-x-2">
            <FiPackage /> <span>Manage Products</span>
          </li>
          <li className="mb-3 flex items-center space-x-2">
            <FiShoppingCart /> <span>Orders</span>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-5">
        <SellerProducts />
        <GetSellerOrders />
        <SellerProductDetails />
      </div>
    </div>
  );
};

export default Dashboard;
