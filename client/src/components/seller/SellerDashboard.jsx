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

const SellerDashboard = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await AxiosInstance.get("/seller/dashboard");
        console.log("Seller Dashboard Stats:", response?.data);
        setData(response?.data);
      } catch (err) {
        console.error("Error fetching seller dashboard stats:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (isLoading) {
    return <div className="text-center text-black">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error loading data.</div>;
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 p-5 space-y-6 border-r">
        <h2 className="text-xl font-bold">Seller Dashboard</h2>
        <nav className="space-y-3">
          <Link
            to="/seller/products"
            className="block p-2 hover:bg-gray-400 rounded"
          >
            Manage Products
          </Link>
          <Link
            to="/seller/get-seller-orders"
            className="block p-2 hover:bg-gray-400 rounded"
          >
            View Orders
          </Link>
          <Link
            to="/seller/create-product"
            className="block p-2 hover:bg-gray-400 rounded"
          >
            Create Product
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="p-4 rounded-lg shadow-md border">
            <h3 className="text-lg font-semibold">Total Products</h3>
            <p className="text-2xl font-bold">{data?.totalProducts ?? 0}</p>
          </div>
          <div className="p-4 rounded-lg shadow-md border">
            <h3 className="text-lg font-semibold">Total Orders</h3>
            <p className="text-2xl font-bold">{data?.totalOrders ?? 0}</p>
          </div>
          <div className="p-4 rounded-lg shadow-md border">
            <h3 className="text-lg font-semibold">Canceled Orders</h3>
            <p className="text-2xl font-bold">
              {data?.totalCanceledOrders ?? 0}
            </p>
          </div>
          <div className="p-4 rounded-lg shadow-md border">
            <h3 className="text-lg font-semibold">Revenue</h3>
            <p className="text-2xl font-bold">${data?.totalRevenue ?? 0}</p>
          </div>
        </div>

        <div className="p-6 rounded-lg shadow-md border mb-6">
          <h3 className="text-lg font-semibold mb-3">Monthly Orders</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data?.orderData || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="name" stroke="#000" />
              <YAxis stroke="#000" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
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

export default SellerDashboard;
