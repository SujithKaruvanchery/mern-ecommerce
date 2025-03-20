import React from "react";
import { Link } from "react-router-dom";

function SellerAbout() {
  return (
    <div className="min-h-screen p-8 text-center">
      <h1 className="text-3xl font-bold">About Selling with Us</h1>
      <p className="mt-4 max-w-2xl mx-auto">
        Join our platform and expand your business by reaching a wider audience.
        We provide a seamless selling experience with powerful tools to manage
        your products, orders, and customer interactions efficiently.
      </p>

      <div className="mt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Why Sell With Us?</h2>
        <ul className="text-left max-w-md mx-auto space-y-2">
          <li>✔ Access to a Large Customer Base</li>
          <li>✔ Secure Payment and Fast Transactions</li>
          <li>✔ Easy-to-Use Seller Dashboard</li>
          <li>✔ Marketing and Promotional Support</li>
          <li>✔ Reliable Shipping and Logistics</li>
        </ul>
        <Link to={"/seller/signup"}>
          <button className="mt-4 px-6 py-2 bg-black text-white">
            Start Selling
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SellerAbout;
