import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="min-h-screen p-8 text-center">
      <h1 className="text-3xl font-bold">About Us</h1>
      <p className="mt-4 max-w-2xl mx-auto">
        We are dedicated to providing a seamless online shopping experience. Our
        platform offers high-quality products, excellent customer service, and
        secure transactions.
      </p>

      <div className="mt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Why Choose Us?</h2>
        <ul className="text-left max-w-md mx-auto space-y-2">
          <li>✔ High-Quality Products</li>
          <li>✔ Secure and Fast Shipping</li>
          <li>✔ Excellent Customer Service</li>
          <li>✔ Easy Returns & Exchanges</li>
        </ul>
        <Link to={"/login"}>
          <button className="mt-4 px-6 py-2 bg-black text-white">
            Join Us
          </button>
        </Link>
      </div>
    </div>
  );
}

export default About;
