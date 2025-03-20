import React from "react";
import ProductsCard from "../../components/user/ProductsCard";
import useFetch from "../../hooks/useFetch";

function Products() {
  const [productList, isLoading, error] = useFetch("/product/get-all-products");
  console.log("==========productList==========", productList);

  return (
    <div>
      <h1 className="text-center mb-4 font-bold text-lg">
        Explore Collections
      </h1>
      <div className="flex flex-wrap gap-3 justify-center">
        {productList?.map((value) => {
          return <ProductsCard key={value._id} product={value} />;
        })}
      </div>
    </div>
  );
}

export default Products;
