import React, { useState } from "react";
import { AxiosInstance } from "../../config/AxiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    stockQuantity: "",
    image: null,
    isNewArrival: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({
      ...productDetails,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setProductDetails({
      ...productDetails,
      image: e.target.files[0],
    });
  };

  const handleCheckboxChange = (e) => {
    setProductDetails({
      ...productDetails,
      isNewArrival: e.target.checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", productDetails.title);
    formData.append("price", productDetails.price);
    formData.append("description", productDetails.description);
    formData.append("category", productDetails.category);
    formData.append("stockQuantity", productDetails.stockQuantity);
    formData.append("image", productDetails.image);
    formData.append("isNewArrival", productDetails.isNewArrival);

    try {
      const response = await AxiosInstance.post(
        "/product/create-product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Product created successfully!");
      console.log("Product created:", response.data);
      navigate("/seller/products");
    } catch (error) {
      toast.error("Failed to create product");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center">Create New Product</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          action="#"
          method="POST"
          className="space-y-6"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="title" className="block">
              Product Title
            </label>
            <div className="mt-2">
              <input
                id="title"
                name="title"
                type="text"
                required
                className="w-full p-2 border border-gray-300"
                value={productDetails.title}
                onChange={handleInputChange}
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
                id="price"
                name="price"
                type="number"
                required
                className="w-full p-2 border border-gray-300"
                value={productDetails.price}
                onChange={handleInputChange}
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
                id="description"
                name="description"
                required
                className="w-full p-2 border border-gray-300"
                value={productDetails.description}
                onChange={handleInputChange}
                placeholder="Enter description"
              />
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
                value={productDetails.category}
                onChange={handleInputChange}
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
                id="stockQuantity"
                name="stockQuantity"
                type="number"
                required
                className="w-full p-2 border border-gray-300"
                value={productDetails.stockQuantity}
                onChange={handleInputChange}
                placeholder="Enter stock quantity"
              />
            </div>
          </div>

          <div>
            <label htmlFor="image" className="block">
              Product Image
            </label>
            <div className="mt-2">
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                required
                className="w-full p-2 border border-gray-300"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label htmlFor="isNewArrival" className="block">
              Is New Arrival?
            </label>
            <input
              type="checkbox"
              id="isNewArrival"
              name="isNewArrival"
              checked={productDetails.isNewArrival}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center bg-black px-3 py-1.5 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Create Product
            </button>
          </div>
        </form>

        <div className="mt-2">
          <button
            onClick={() => navigate("/seller/products")}
            className="flex w-full justify-center bg-white px-3 py-1.5 text-black shadow-sm hover:bg-gray-100 outline outline-1 outline-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Back to Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
