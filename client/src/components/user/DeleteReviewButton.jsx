// import React, { useState } from "react";
// import { AxiosInstance } from "../../config/AxiosInstance";
// import toast from "react-hot-toast";

// const DeleteReviewButton = ({ reviewId, onReviewDeleted }) => {
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);

//   const handleDelete = async () => {
//     setLoading(true);
//     try {
//       const response = await AxiosInstance.delete(
//         `/review/delete-review/${reviewId}`
//       );

//       if (response.status === 200) {
//         toast.success("Review deleted successfully");
//         onReviewDeleted(reviewId);
//       } else {
//         toast.error("Unexpected response from server");
//       }
//     } catch (error) {
//       console.error("Delete error:", error);
//       toast.error(error.response?.data?.message || "Failed to delete review");
//     } finally {
//       setLoading(false);
//       setShowModal(false);
//     }
//   };

//   return (
//     <>
//       <button
//         onClick={() => setShowModal(true)}
//         className="text-red-500 text-xs font-semibold hover:underline"
//       >
//         Delete
//       </button>

//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-base-300">
//           <div className="p-4 rounded-lg shadow-lg w-80 bg-base-100 text-base-content">
//             <h3 className="text-lg font-semibold">Confirm Delete</h3>
//             <p className="text-sm my-2">
//               Are you sure you want to delete this review? This action cannot be
//               undone.
//             </p>
//             <div className="flex justify-end space-x-2 mt-4">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-3 py-1 text-sm bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-600"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDelete}
//                 disabled={loading}
//                 className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-700"
//               >
//                 {loading ? "Deleting..." : "Delete"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default DeleteReviewButton;

import React, { useState } from "react";
import { AxiosInstance } from "../../config/AxiosInstance";
import toast from "react-hot-toast";

const DeleteReviewButton = ({ reviewId, onReviewDeleted }) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await AxiosInstance.delete(
        `/review/delete-review/${reviewId}`
      );

      if (response.status === 200) {
        toast.success("Review deleted successfully");
        onReviewDeleted(reviewId);
      } else {
        toast.error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.response?.data?.message || "Failed to delete review");
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-red-500 text-xs font-semibold hover:underline"
      >
        Delete
      </button>

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
                onClick={handleDelete}
                disabled={loading}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-700"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteReviewButton;

