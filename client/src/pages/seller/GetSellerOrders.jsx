import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../config/AxiosInstance";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const GetSellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSellerOrders = async () => {
      try {
        const response = await AxiosInstance.get(
          "/order/get-all-orders-seller"
        );

        const filteredOrders = Array.isArray(response.data.data)
          ? response.data.data.filter(
              (order) => order.orderStatus !== "Canceled"
            )
          : [];

        setOrders(filteredOrders);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to fetch orders");
        toast.error(err?.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchSellerOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await AxiosInstance.put(
        `/order/orders/${orderId}/status`,
        { status: newStatus }
      );
      toast.success(response.data.message);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to update order status"
      );
    }
  };

  return (
    <div>
      {loading ? (
        <p className="text-center">Loading orders...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : orders.length === 0 ? (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="mb-4 font-bold text-lg">
              Your Order List is Empty!
            </h1>
            <p className="font-light text-sm">
              Start selling and manage your orders efficiently
            </p>
            <Link to={"/seller/dashboard"}>
              <button className="rounded-none py-2 bg-black text-white font-light text-sm w-full mt-4">
                Go to Dashboard
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-black text-white text-sm">
                <th className="px-6 py-3 border-b text-left">Order ID</th>
                <th className="px-6 py-3 border-b text-left">User Name</th>
                <th className="px-6 py-3 border-b text-left">User Email</th>
                <th className="px-6 py-3 border-b text-left">Items</th>
                <th className="px-6 py-3 border-b text-left">Total Price</th>
                <th className="px-6 py-3 border-b text-left">Order Status</th>
                <th className="px-6 py-3 border-b text-left">Update Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="px-6 py-3">{order._id}</td>
                  <td className="px-6 py-3">{order.userId?.name || "N/A"}</td>
                  <td className="px-6 py-3">{order.userId?.email || "N/A"}</td>
                  <td className="px-6 py-3">
                    {order.items && order.items.length > 0 ? (
                      order.items.map((item, index) => (
                        <div key={index}>
                          <strong>{item.productId?.title || "Unknown"}</strong>{" "}
                          {item.quantity} x Rs.{item.price}
                        </div>
                      ))
                    ) : (
                      <p>No items</p>
                    )}
                  </td>
                  <td className="px-6 py-3">
                    Rs.{" "}
                    {order.items?.reduce(
                      (total, item) => total + item.quantity * item.price,
                      0
                    ) || 0}
                  </td>
                  <td className="px-6 py-3">{order.orderStatus}</td>
                  <td className="px-6 py-3">
                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="p-2 border"
                    >
                      <option value="Order Received">Order Received</option>
                      <option value="Shipping Progress">
                        Shipping Progress
                      </option>
                      <option value="Out for Dispatch">Out for Dispatch</option>
                      <option value="Delivered Successfully">
                        Delivered Successfully
                      </option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GetSellerOrders;
