import React from "react";

function SellerContact() {
  return (
    <div className="min-h-screen p-8 text-center">
      <h1 className="text-3xl font-bold">Online Seller Support</h1>
      <p className="mt-4">
        For product listings, orders, or account help, contact us.
      </p>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Contact Information</h2>
        <ul className="text-left max-w-md mx-auto space-y-4 mt-4">
          <li>🌐 Website:mango.com/seller-support</li>
          <li>📞 +91 87654 32109</li>
          <li>📧 seller-support@mango.com</li>
          <li>⏰ Mon - Sat, 9 AM - 8 PM</li>
        </ul>
      </div>
    </div>
  );
}

export default SellerContact;
