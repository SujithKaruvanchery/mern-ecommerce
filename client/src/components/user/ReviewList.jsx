import React, { useState } from "react";
import useFetchReviews from "../../hooks/useFetchReviews";
import { AxiosInstance } from "../../config/AxiosInstance";
import toast from "react-hot-toast";

function ReviewList({ productId }) {
  const { reviews, loading, error, setReviews } = useFetchReviews(productId);
  const [deletingId, setDeletingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < rating ? "text-yellow-500" : "text-gray-300"}
      >
        &#9733;
      </span>
    ));
  };

  const confirmDelete = (reviewId) => {
    setSelectedReviewId(reviewId);
    setShowModal(true);
  };

  const handleDeleteReview = async () => {
    if (!selectedReviewId) return;
    setDeletingId(selectedReviewId);

    try {
      const response = await AxiosInstance.delete(
        `/review/delete-review/${selectedReviewId}`
      );

      if (response.status === 200) {
        toast.success("Review deleted successfully!");
        setReviews((prevReviews) =>
          prevReviews.filter((r) => r._id !== selectedReviewId)
        );
      } else {
        throw new Error("Unexpected server response");
      }
    } catch (error) {
      console.error("Delete error:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to delete review";
      toast.error(errorMessage);
    } finally {
      setDeletingId(null);
      setShowModal(false);
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold">Customer Reviews</h3>

      {loading && <p>Loading reviews...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {reviews.length === 0 && !loading && (
        <p className="text-sm dark:text-gray-300">No reviews available.</p>
      )}

      <ul className="mt-2 space-y-3">
        {reviews.map((review) => (
          <li
            key={review._id}
            className=" p-2 flex justify-between items-start"
          >
            <div>
              <p className="text-sm font-semibold">
                {review.userId?.name || "Anonymous"}
              </p>
              <div className="flex items-center">
                {renderStars(review.rating)}
              </div>
              <p className="text-sm">{review.comment}</p>
            </div>
            <button
              className="text-red-500 text-xs font-semibold hover:underline"
              onClick={() => confirmDelete(review._id)}
              disabled={deletingId === review._id}
            >
              {deletingId === review._id ? "Deleting..." : "Delete"}
            </button>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-base-300">
          <div className="p-4 rounded-lg shadow-lg w-80 bg-base-100 text-base-content">
            <h3 className="text-lg font-semibold">Confirm Delete</h3>
            <p className="text-sm my-2">
              Are you sure you want to delete this review? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 text-sm bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteReview}
                disabled={deletingId !== null}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-700"
              >
                {deletingId ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewList;
