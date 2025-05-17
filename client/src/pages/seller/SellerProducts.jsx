import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import SellerProductCards from "../../components/seller/SellerProductCards";

function SellerProducts() {
  const [productList, isLoading, error] = useFetch("/product/seller/products");

  console.log("=======isLoading:", isLoading);
console.log("=======productList:", productList);
console.log("=======error:", error);


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
              Start selling your products today and reach more customers
            </p>
            <Link to="/seller/create-product">
              <button className="rounded-none py-2 bg-black text-white font-light text-sm w-full mt-4">
                Create Products
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3 justify-center">
          {productList.map((value) => (
            <SellerProductCards key={value._id} product={value} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SellerProducts;
