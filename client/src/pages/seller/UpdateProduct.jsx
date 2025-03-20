import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { AxiosInstance } from "../../config/AxiosInstance";

const UpdateProduct = () => {
  const { id: productId } = useParams();
  const [productData, setProductData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    stockQuantity: "",
  });
  const [initialData, setInitialData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    stockQuantity: "",
  });

  const fetchProduct = async () => {
    try {
      const response = await AxiosInstance.get(
        `/product/get-product/${productId}`
      );
      setInitialData({
        title: response.data.title || "",
        price: response.data.price !== null ? response.data.price : "",
        description: response.data.description || "",
        category: response.data.category || "",
        stockQuantity:
          response.data.stockQuantity !== null
            ? response.data.stockQuantity
            : 0,
      });
      setProductData({
        title: response.data.title || "",
        price: response.data.price !== null ? response.data.price : "",
        description: response.data.description || "",
        category: response.data.category || "",
        stockQuantity:
          response.data.stockQuantity !== null
            ? response.data.stockQuantity
            : 0,
      });
    } catch (error) {
      console.error("Error fetching product details:", error);
      toast.error("Failed to fetch product details");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {};
    for (const key in productData) {
      if (productData[key] !== initialData[key]) {
        updatedData[key] = productData[key];
      }
    }

    if (Object.keys(updatedData).length > 0) {
      try {
        const response = await AxiosInstance.put(
          `/product/update-product/${productId}`,
          updatedData
        );
        toast.success(response.data.message || "Product updated successfully!");
      } catch (error) {
        console.error("Error updating product:", error);
        toast.error(
          error.response?.data?.message || "Failed to update product"
        );
      }
    } else {
      toast.info("No changes to update.");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center">Update Product</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block">
              Product Title
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="title"
                id="title"
                value={productData.title}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300"
                placeholder="Enter product title"
              />
            </div>
          </div>

          <div>
            <label htmlFor="price" className="block">
              Product Price
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="price"
                id="price"
                value={productData.price}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300"
                placeholder="Enter price"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block">
              Product Description
            </label>
            <div className="mt-2">
              <textarea
                name="description"
                id="description"
                value={productData.description}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300"
                placeholder="Enter product description"
              ></textarea>
            </div>
          </div>

          <div>
            <label htmlFor="category" className="block">
              Product Category
            </label>
            <div className="mt-2">
              <select
                id="category"
                name="category"
                required
                className="w-full p-2 border border-gray-300"
                value={productData.category}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kids">Kids</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="stockQuantity" className="block">
              Stock Quantity
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="stockQuantity"
                id="stockQuantity"
                value={productData.stockQuantity}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300"
                placeholder="Enter stock quantity"
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-full bg-black text-white py-1.5 px-3 shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Update Product
            </button>
          </div>
        </form>

        <div className="mt-2">
          <button
            onClick={() => window.history.back()}
            className="w-full bg-white text-black py-1.5 px-3 shadow-sm hover:bg-gray-100 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Back to Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
