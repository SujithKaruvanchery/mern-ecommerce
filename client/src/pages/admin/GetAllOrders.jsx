import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../config/AxiosInstance";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const GetAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await AxiosInstance.get("/order/get-all-orders");
        setOrders(response.data);
        toast.success("Orders fetched successfully");
      } catch (error) {
        toast.error("Failed to fetch orders");
        console.error(
          "Error fetching orders:",
          error.response?.data?.message || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleAdminVerification = async (orderId, approvalStatus) => {
    try {
      const response = await AxiosInstance.put(
        `order/admin/verify-order/${orderId}`,
        {
          approvalStatus,
        }
      );

      toast.success(response.data.message);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, ...response.data.order } : order
        )
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to verify order");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-black">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-center font-bold mb-4">All Orders</h1>
      {orders.length === 0 ? (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="mb-4 font-bold text-lg">Your Order List is Empty</h1>
            <p className="font-light text-sm">
              Start selling and manage your orders efficiently
            </p>
            <Link to={"/admin"}>
              <button className="rounded-none py-2 font-light text-sm w-full mt-4">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="shadow-md p-4 border">
              <h3 className="text-lg font-semibold">
                Order ID: <span className="text-blue-600">{order._id}</span>
              </h3>
              <p className="text-gray-600">
                User:{" "}
                <span className="font-medium">
                  {order.userId?.name || "Unknown User"}
                </span>
              </p>
              <p className="text-gray-600">
                Email: {order.userId?.email || "No Email Available"}
              </p>

              <div className="mt-4">
                <p className="font-semibold">Products:</p>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 border-b pb-2"
                    >
                      {item.productId?.image && (
                        <img
                          src={item.productId?.image}
                          alt={item.productId.title}
                          className="w-16 h-16 object-cover"
                        />
                      )}
                      <div>
                        <p className="font-medium">
                          {item.productId?.title || "Unknown Product"}
                        </p>
                        <p className="text-sm text-gray-600">
                          ₹{item.productId?.price || 0} × {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-3 font-semibold">
                Total Price:{" "}
                <span className="text-blue-600">₹{order.totalPrice}</span>
              </p>

              <p className="mt-2">
                <span className="font-semibold">Status:</span>{" "}
                {order.orderStatus === "Delivered Successfully" ? (
                  <span className="text-green-600 font-bold">Delivered</span>
                ) : order.orderStatus === "Canceled" ? (
                  <span className="text-red-600 font-bold">Canceled</span>
                ) : (
                  <span className="text-yellow-600 font-bold">
                    {order.orderStatus}
                  </span>
                )}
              </p>

              {!order.verifiedByAdmin && order.orderStatus !== "Canceled" && (
                <div className="mt-3">
                  <button
                    onClick={() =>
                      handleAdminVerification(order._id, "Approved")
                    }
                    className="bg-blue-500 text-white px-3 py-1 mr-2"
                  >
                    Verify
                  </button>
                  <button
                    onClick={() =>
                      handleAdminVerification(order._id, "Canceled")
                    }
                    className="bg-red-500 text-white px-3 py-1"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetAllOrders;
