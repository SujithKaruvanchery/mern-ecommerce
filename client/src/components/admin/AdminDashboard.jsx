import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { AxiosInstance } from "../../config/AxiosInstance";

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await AxiosInstance.get("/admin/dashboard-stats");
        setData(response?.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (isLoading) {
    return <div className="text-center text-gray-900">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error loading data.</div>;
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 p-5 space-y-6 border-r">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <nav className="space-y-3">
          <Link
            to="get-all-users"
            className="block p-2 hover:bg-gray-300 rounded transition duration-200"
          >
            Manage Users
          </Link>
          <Link
            to="get-all-sellers"
            className="block p-2 hover:bg-gray-300 rounded transition duration-200"
          >
            Manage Sellers
          </Link>
          <Link
            to="get-all-orders"
            className="block p-2 hover:bg-gray-300 rounded transition duration-200"
          >
            View Orders
          </Link>
          <Link
            to="products"
            className="block p-2 hover:bg-gray-300 rounded transition duration-200"
          >
            Manage Products
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
          {[
            { title: "Total Users", value: data?.totalUsers ?? 0 },
            { title: "Total Sellers", value: data?.totalSellers ?? 0 },
            { title: "Total Orders", value: data?.totalOrders ?? 0 },
            { title: "Canceled Orders", value: data?.totalCanceledOrders ?? 0 },
            { title: "Revenue", value: `$${data?.totalRevenue ?? 0}` },
          ].map((stat, index) => (
            <div
              key={index}
              className=" p-4 rounded-lg shadow-md border hover:shadow-lg transition duration-300"
            >
              <h3 className="text-lg font-semibold">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className=" p-6 rounded-lg shadow-md border mb-6">
          <h3 className="text-lg font-semibold mb-3">Monthly Orders</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data?.orderData || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="name" stroke="#333" />
              <YAxis stroke="#333" />
              <Tooltip
                contentStyle={{
                  background: "white",
                  color: "black",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                }}
                labelStyle={{ color: "black", fontWeight: "bold" }}
                itemStyle={{ color: "black" }}
                cursor={{ fill: "#f5f5f5" }}
              />
              <Bar dataKey="orders" fill="#333" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
