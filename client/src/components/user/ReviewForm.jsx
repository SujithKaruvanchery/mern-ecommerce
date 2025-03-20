import React, { useState } from "react";
import { AxiosInstance } from "../../config/AxiosInstance";
import toast from "react-hot-toast";

function ReviewForm({ productId, closeModal }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await AxiosInstance.post("/review/addOrUpdateReview", {
        productId,
        rating,
        comment,
      });

      toast.success("Review submitted successfully");
      setRating(5);
      setComment("");
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review");
    }

    setLoading(false);
  };

  const handleRatingChange = (rating) => {
    setRating(rating);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-lg font-semibold text-center">Rate this Product</h2>

        <div className="flex justify-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <i
              key={star}
              className={`fa fa-star cursor-pointer ${
                star <= rating ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => handleRatingChange(star)}
            ></i>
          ))}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          className="w-full p-2 border rounded-md"
          rows="4"
        />

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center bg-black dark:bg-gray-800 px-3 py-1.5 text-white shadow-sm hover:bg-gray-800 dark:hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="flex w-full justify-center bg-white dark:bg-gray-800 px-3 py-1.5 text-black dark:text-white shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 outline outline-1 outline-gray-500 dark:outline-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReviewForm;
