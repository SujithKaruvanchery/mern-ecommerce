import { Link } from "react-router-dom";

const AdminHome = () => {
  return (
    <div className="flex items-center justify-center p-10 bg-base-100 text-base-content">
      <div className="max-w-2xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Why Become an Admin?
        </h1>
        <p className="mb-4">
          <strong>🛠 Full Control:</strong> Manage users, products, orders, and platform settings from one powerful dashboard.
        </p>
        <p className="mb-4">
          <strong>🔒 Secure Access:</strong> Protected routes and role-based access ensure system integrity and data privacy.
        </p>
        <p className="mb-4">
          <strong>📢 Manage Content:</strong> Oversee product listings, seller activities, and customer reviews to maintain quality.
        </p>
        <p className="mb-4">
          <strong>📈 Track Performance:</strong> Get insights with analytics and reports to monitor platform growth and usage.
        </p>
        <p className="mb-4">
          <strong>🧑‍🤝‍🧑 Support Users:</strong> Help sellers and buyers by resolving issues and keeping operations smooth.
        </p>

        <div className="flex justify-center mt-8">
          <Link
            to={"/admin/login"}
            className="px-6 py-2 border border-base-content bg-base-content text-base-100 hover:bg-opacity-80 transition"
          >
            Go to Admin Panel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
