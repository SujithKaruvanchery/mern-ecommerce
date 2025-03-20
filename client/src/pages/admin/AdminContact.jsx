import React from "react";

function AdminContact() {
  return (
    <div className="min-h-screen p-8 text-center">
      <h1 className="text-3xl font-bold">Admin Support</h1>
      <p className="mt-4">
        For platform management, user control, or technical support, contact us.
      </p>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Contact Information</h2>
        <ul className="text-left max-w-md mx-auto space-y-4 mt-4">
          <li>🌐 Website: mango.com/admin-support</li>
          <li>📞 +91 98765 43210</li>
          <li>📧 admin-support@mango.com</li>
          <li>⏰ Mon - Sat, 9 AM - 8 PM</li>
        </ul>
      </div>
    </div>
  );
}

export default AdminContact;
