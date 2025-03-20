import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { AxiosInstance } from "../../config/AxiosInstance";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await AxiosInstance.get("/order/get-order");
        setOrders(response.data.data);
        toast.success("Orders retrieved successfully");
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch orders");
        toast.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelClick = (orderId) => {
    setSelectedOrderId(orderId);
    setShowModal(true);
  };

  const cancelOrder = async () => {
    if (!selectedOrderId) return;

    try {
      await AxiosInstance.patch(
        `/order/orders/${selectedOrderId}/cancel-order`
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === selectedOrderId
            ? { ...order, orderStatus: "Canceled" }
            : order
        )
      );
      toast.success("Order canceled successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel order");
    } finally {
      setShowModal(false);
      setSelectedOrderId(null);
    }
  };

  const trackOrder = async (orderId) => {
    try {
      const response = await AxiosInstance.get(
        `/order/orders/${orderId}/track-order`
      );
      toast.success(`Order Status: ${response.data.status}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to track order");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 dark:bg-gray-900 dark:text-white">
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center">{error}</p>
      ) : orders.length === 0 ? (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="mb-4 font-bold text-lg">
              Your Order List is Empty!
            </h1>
            <p className="font-light text-sm">
              Get inspiration for your new wardrobe from the latest looks
            </p>
            <Link to={"/products"}>
              <button className="rounded-none py-2 bg-black text-white dark:bg-white dark:text-black font-light text-sm w-full mt-4">
                Browse Products
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-4 border-b border-black dark:border-white"
            >
              <h3 className="mb-2 font-semibold">
                Order ID: <span>{order._id}</span>
              </h3>
              <div className="space-y-2">
                <p className="font-medium">Items:</p>
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <img
                      src={item.productId?.image || "/default-product.jpg"}
                      className="w-12 h-12 object-cover"
                      alt={item.productId?.title || "Product"}
                    />
                    <div>
                      <p className="text-sm">{item.productId?.title}</p>
                      <p className="text-sm text-black dark:text-white">
                        ₹{item.price} x {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-lg font-semibold">
                Total Price:{" "}
                <span>
                  ₹
                  {order.items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )}
                </span>
              </p>
              <div className="flex gap-2 mt-3">
                {order.orderStatus !== "Canceled" &&
                  ![
                    "Shipping Progress",
                    "Out for Dispatch",
                    "Delivered Successfully",
                  ].includes(order.orderStatus) && (
                    <button
                      onClick={() => handleCancelClick(order._id)}
                      className="bg-black text-white dark:bg-white dark:text-black px-3 py-1 text-sm hover:bg-gray-800 dark:hover:bg-gray-300"
                    >
                      Cancel Order
                    </button>
                  )}
                <button
                  onClick={() => trackOrder(order._id)}
                  className="bg-black text-white dark:bg-white dark:text-black px-3 py-1 text-sm hover:bg-gray-800 dark:hover:bg-gray-300"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-base-300">
          <div className="p-4 rounded-lg shadow-lg w-80 bg-base-100 text-base-content">
            <h3 className="text-lg font-semibold">Cancel Order</h3>
            <p className="text-sm my-2">
              Are you sure you want to cancel this order? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 text-sm bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-600"
              >
                No, Keep Order
              </button>
              <button
                onClick={cancelOrder}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-700"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrders;
