import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../config/AxiosInstance";
import toast from "react-hot-toast";

const GetAllSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await AxiosInstance.get("/seller/get-all-sellers");
        setSellers(response.data);
        toast.success("Sellers fetched successfully");
      } catch (error) {
        toast.error("Failed to fetch sellers");
        console.error(
          "Error fetching sellers:",
          error.response?.data?.message || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-black">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-center font-bold">All Sellers</h1>
      {sellers.length === 0 ? (
        <p className="text-center">No sellers found.</p>
      ) : (
        <div className="space-y-4">
          {sellers.map((seller) => (
            <div key={seller._id} className="shadow-md p-4 border">
              <div className="flex items-center space-x-4">
                <img
                  src={seller.profilePicture}
                  alt={seller.name}
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <div>
                  <h3 className="text-lg font-semibold">{seller.name}</h3>
                  <p className="text-gray-600">
                    Role:{" "}
                    {seller.role.charAt(0).toUpperCase() + seller.role.slice(1)}
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <p>
                  <span className="font-semibold">Email:</span> {seller.email}
                </p>
                <p>
                  <span className="font-semibold">Mobile:</span> {seller.mobile}
                </p>
                <p>
                  <span className="font-semibold">Store Name:</span>{" "}
                  {seller.storeName}
                </p>
                <p>
                  <span className="font-semibold">Address:</span>{" "}
                  {seller.address}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  {seller.isActive ? (
                    <span className="text-green-600 font-bold">Active</span>
                  ) : (
                    <span className="text-red-600 font-bold">Inactive</span>
                  )}
                </p>
                <p>
                  <span className="font-semibold">Products:</span>{" "}
                  {seller.products && seller.products.length > 0
                    ? `${seller.products.length} Product(s)`
                    : "No Products"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetAllSellers;
