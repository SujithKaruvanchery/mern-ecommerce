import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams, useNavigate } from "react-router-dom";
import { AxiosInstance } from "../../config/AxiosInstance";
import toast from "react-hot-toast";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ReviewList from "../../components/user/ReviewList";
import ReviewForm from "../../components/user/ReviewForm";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productDetails, isLoading, error] = useFetch(
    `/product/get-product/${id}`
  );
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeError, setSizeError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const handleAddToCart = async () => {
    if (productDetails?.stockQuantity === 0) {
      toast.error("This product is out of stock");
      return;
    }
    if (!selectedSize) {
      setSizeError(true);
      toast.error("Please select a size");
      return;
    }
    try {
      await AxiosInstance.post("/cart/add-to-cart", {
        productId: productDetails?._id,
        size: selectedSize,
      });
      toast.success("Item successfully added to your shopping bag!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add item to bag");
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="lg:flex lg:space-x-8 bg-base-100 overflow-hidden">
        <div className="lg:w-1/2">
          <img
            src={productDetails?.image}
            alt={`${productDetails?.title} image`}
            className="w-96 h-90 object-cover"
          />
          <div className="mt-4 mb-4">
            <p className="text-sm font-semibold">DESCRIPTION</p>
            <p className="text-sm text-base-content">
              {productDetails?.description}
            </p>
          </div>
        </div>
        <div className="lg:w-1/2 p-6 space-y-5 text-base-content mt-10">
          <h1 className="text-sm font-semibold">New Now</h1>
          <h1 className="text-lg font-medium">{productDetails?.title}</h1>
          <p className="text-sm font-medium">Rs.{productDetails?.price}</p>
          <p className="text-sm font-medium font-semibold">
            Quantity: {productDetails?.stockQuantity}
          </p>
          <hr />
          <div className="mt-4">
            <label className="block text-sm font-semibold">Select Size:</label>
            <select
              value={selectedSize}
              onChange={(e) => {
                setSelectedSize(e.target.value);
                setSizeError(false);
              }}
              className={`w-full py-2 px-4 ${
                sizeError && !selectedSize ? "border-red-500" : ""
              }`}
            >
              <option value="">Choose a size</option>
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            {sizeError && (
              <p className="text-red-500 mt-2 text-sm">
                Select the size you wish to add
              </p>
            )}
          </div>
          <div className="mt-6 space-y-2">
            <button
              className={`flex w-full justify-center px-3 py-1.5 text-white shadow-sm ${
                productDetails?.stockQuantity === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-opacity-80"
              }`}
              onClick={handleAddToCart}
              disabled={productDetails?.stockQuantity === 0}
            >
              {productDetails?.stockQuantity === 0 ? "Out of Stock" : "Add"}
            </button>
            <button
              onClick={() => navigate("/products")}
              className="flex w-full justify-center bg-base-200 px-3 py-1.5 text-base-content shadow-sm hover:bg-opacity-80 outline outline-1 outline-gray-500"
            >
              Back
            </button>
            <p
              className="underline cursor-pointer text-sm font-semibold"
              onClick={() => setIsReviewModalOpen(true)}
            >
              Write a Review
            </p>
            <p
              className="underline cursor-pointer text-sm font-semibold"
              onClick={() => setIsModalOpen(true)}
            >
              Composition, origin and care guidelines
            </p>
          </div>
        </div>
      </div>
      <ReviewList productId={id} />
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-base-300 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-base-100 p-8 w-1/3 h-auto relative rounded-lg shadow-lg">
            <i
              className="fa fa-times text-xl absolute top-2 right-2 cursor-pointer"
              onClick={() => setIsReviewModalOpen(false)}
            ></i>
            <ReviewForm
              productId={id}
              closeModal={() => setIsReviewModalOpen(false)}
            />
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-base-300 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-base-100 p-8 w-1/3 h-auto relative rounded-lg shadow-lg">
            <i
              className="fa fa-times text-xl absolute top-2 right-2 cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            ></i>
            <div className="text-left">
              <h1 className="text-lg font-semibold mb-4">
                Composition, Origin and Care Guidelines
              </h1>
              <h2 className="text-md font-semibold">Composition</h2>
              <ul className="ml-4 list-disc">
                <li>100% cotton</li>
                <li>Lining: 65% polyester, 35% cotton</li>
                <li>Filling: 100% polyester</li>
              </ul>
              <h2 className="text-md font-semibold mt-4">Origin</h2>
              <ul className="ml-4 list-disc">
                <li>Designed in Barcelona</li>
                <li>Finish: China</li>
                <li>Assembly: China</li>
              </ul>
              <h2 className="text-md font-semibold mt-4">Care</h2>
              <ul className="ml-4 list-disc">
                <li>Machine wash max 30°C / 85°F short spin dry</li>
                <li>Do not bleach</li>
                <li>Ironing max 110°C / 230°F</li>
                <li>Do not dry clean</li>
                <li>Do not tumble dry</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
