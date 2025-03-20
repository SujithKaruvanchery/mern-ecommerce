import { useState, useEffect } from "react";
import { AxiosInstance } from "../config/AxiosInstance";
import toast from "react-hot-toast";

const useFetchReviews = (productId) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await AxiosInstance.get(
          `/review/get-reviews/${productId}`
        );
        setReviews(response.data.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch reviews");
        toast.error(err.response?.data?.error || "Error fetching reviews");
      }
      setLoading(false);
    };

    fetchReviews();
  }, [productId]);

  return { reviews, setReviews, loading, error };
};

export default useFetchReviews;
