import React from "react";
import useFetch from "../../hooks/useFetch";
import AdminProductCard from "../../components/admin/AdminProductCard";
import { Link } from "react-router-dom";

function AdminProducts() {
  const [productList, isLoading, error] = useFetch("/product/get-all-products");

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <p className="text-center">Loading...</p>
        </div>
      ) : !productList || productList.length === 0 ? (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="mb-4 font-bold text-lg">No Products Available!</h1>
            <p className="font-light text-sm">
              Update or remove existing products to keep your store up to date.
            </p>
            <Link to="/admin">
              <button className="rounded-none py-2 bg-black text-white font-light text-sm w-full mt-4">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3 justify-center">
          {productList.map((value) => (
            <AdminProductCard key={value._id} product={value} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminProducts;
