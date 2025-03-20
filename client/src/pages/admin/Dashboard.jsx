import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="flex h-screen">
      <div className="bg-gray-800 text-white w-64 p-4">
        <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>
        <ul>
          <li>
            <Link
              to="/admin/dashboard"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/manage-products"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
            >
              Manage Products
            </Link>
          </li>
          <li>
            <Link
              to="/admin/manage-users"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
            >
              Manage Users
            </Link>
          </li>
          <li>
            <Link
              to="/admin/settings"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
            >
              Settings
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-8 bg-gray-100">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Add New Item
          </button>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold">Total Products</h3>
            <p className="text-3xl">120</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold">Total Users</h3>
            <p className="text-3xl">350</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold">Total Orders</h3>
            <p className="text-3xl">200</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold">Total Revenue</h3>
            <p className="text-3xl">$10,000</p>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <p>
              No recent activity to display. You can add charts or reports here.
            </p>
            <div className="bg-gray-200 h-48 mt-4 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
