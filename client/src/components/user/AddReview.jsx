import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import { AxiosInstance } from "../../config/AxiosInstance";

export const AddReview = () => {
  const { productId } = useParams();
  console.log("Params:", productId);

  const [rating, setRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const onSubmit = async (data) => {
    if (rating === 0) {
      toast.error("Please select a rating before submitting.");
      return;
    }

    try {
      console.log("Submitting review for productId:", productId);

      const response = await AxiosInstance.post("/review/add-product-review", {
        ...data,
        productId,
        rating,
      });

      if (response.status === 200) {
        console.log("Review submitted successfully:", response.data);
        toast.success("Review added successfully!");
        navigate("/user/success-review");
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error during review submission:", error);

      if (error.response) {
        if (error.response.status === 404) {
          toast.error("Product not found");
        } else if (error.response.status === 400) {
          const errorMessage = error.response.data.message;
          if (
            errorMessage === "You must purchase the product to add your review!"
          ) {
            toast.error("You must purchase the product before reviewing.");
          } else if (
            errorMessage === "You have already reviewed this product"
          ) {
            toast.error("You have already reviewed this product.");
          } else {
            toast.error(errorMessage || "Something went wrong!");
          }
        } else {
          toast.error("Something went wrong!");
        }
      } else {
        toast.error("Network or server error. Please try again.");
      }
    }
  };

  return (
    <div className="container mx-auto text-center">
      <div className="py-4">
        <button
          onClick={handleShowModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Rate Product
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
            <div className="flex justify-between items-center border-b pb-2">
              <h5 className="text-lg font-semibold w-full text-center">
                Add Your Review
              </h5>
              <button
                onClick={handleCloseModal}
                className="text-gray-600 hover:text-gray-900"
              >
                ✖
              </button>
            </div>
            <div className="mt-4">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4 items-center"
              >
                <div className="flex gap-1 text-3xl">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => handleStarClick(star)}
                      className={`cursor-pointer ${
                        star <= rating ? "text-black" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                {errors.comment && (
                  <span className="text-red-500 text-sm">
                    Comment is required
                  </span>
                )}
                <textarea
                  className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                  {...register("comment", { required: true })}
                  placeholder="Enter your comment"
                  rows="4"
                />
                <button
                  type="submit"
                  className="w-full max-w-xs bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  disabled={rating === 0}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
