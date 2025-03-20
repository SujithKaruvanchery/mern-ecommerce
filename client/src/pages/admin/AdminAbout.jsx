import React from "react";
import { Link } from "react-router-dom";

function AdminAbout() {
  return (
    <div className="min-h-screen p-8 text-center">
      <h1 className="text-3xl font-bold">Admin Panel</h1>
      <p className="mt-4 max-w-2xl mx-auto">
        Control and oversee platform operations with ease. Our admin panel
        offers advanced tools to manage users, products, and orders efficiently.
      </p>

      <div className="mt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Key Features</h2>
        <ul className="text-left max-w-md mx-auto space-y-2">
          <li>✔ Centralized Control Panel</li>
          <li>✔ Comprehensive Analytics and Reports</li>
          <li>✔ Efficient User and Product Management</li>
          <li>✔ Secure Transactions and Data Protection</li>
          <li>✔ Real-time Order Tracking</li>
        </ul>
        <Link to={"/admin/login"}>
          <button className="mt-4 px-6 py-2 bg-black text-white">
            Admin Login
          </button>
        </Link>
      </div>
    </div>
  );
}

export default AdminAbout;
