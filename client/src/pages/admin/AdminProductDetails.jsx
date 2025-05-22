// import { useParams, useNavigate } from "react-router-dom";
// import { AxiosInstance } from "../../config/AxiosInstance";
// import toast from "react-hot-toast";
// import { useState, useEffect } from "react";

// function AdminProductDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await AxiosInstance.get(`/product/get-product/${id}`);
//         setProduct(response.data.data);
//         setIsLoading(false);
//       } catch (err) {
//         const errorMessage =
//           err.response?.data?.message || "Failed to fetch product";
//         setError(errorMessage);
//         toast.error(errorMessage);
//         setIsLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handleEdit = () => {
//     navigate(`/admin/update-product/${id}`);
//   };

//   const handleDelete = async () => {
//     try {
//       await AxiosInstance.delete(`/product/delete-product-by-admin/${id}`);
//       toast.success("Product deleted successfully");
//       navigate("/admin/products");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to delete product");
//     }
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="container mx-auto p-4 space-y-8">
//       {isLoading ? (
//         <p className="text-center text-gray-500">Loading...</p>
//       ) : error ? (
//         <p className="text-center text-red-500">{error}</p>
//       ) : product ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <img
//               src={product.image || "/default-image.jpg"}
//               alt={product.title}
//               className="w-96 h-90 object-cover"
//             />
//           </div>
//           <div className="space-y-4">
//             <h1 className="text-lg font-medium">{product.title}</h1>
//             <p className="text-sm text-gray-600">{product.description}</p>
//             <p className="text-sm font-medium">Price: Rs.{product.price}</p>
//             <p className="text-sm text-gray-600">
//               Category: <span className="font-medium">{product.category}</span>
//             </p>
//             <p className="text-sm font-medium">
//               Stock Quantity:{" "}
//               <span className="font-medium">{product.stockQuantity}</span>
//             </p>
//             {product.stockQuantity === 0 && (
//               <p className="text-sm text-red-500 font-medium">Out of Stock</p>
//             )}
//             <div className="flex space-x-4 mt-4">
//               <button
//                 onClick={handleEdit}
//                 className="flex w-full justify-center bg-black px-3 py-1.5 text-white shadow-sm hover:bg-gray-800"
//               >
//                 Edit Product
//               </button>
//               <button
//                 onClick={() => setIsModalOpen(true)}
//                 className="flex w-full justify-center bg-white px-3 py-1.5 text-black shadow-sm hover:bg-gray-100 outline outline-1 outline-gray-500"
//               >
//                 Delete Product
//               </button>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="flex items-center justify-center h-screen">
//           <div className="text-center">
//             <h1 className="mb-4 font-bold text-lg">No Product Data Found</h1>
//             <p className="font-light text-sm">
//               Please try again or go back to the product list.
//             </p>
//             <button
//               onClick={() => navigate("/admin/products")}
//               className="rounded-none py-2 bg-black text-white font-light text-sm w-full mt-4"
//             >
//               Back to Products
//             </button>
//           </div>
//         </div>
//       )}

//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-base-300">
//           <div className="p-4 rounded-lg shadow-lg w-80 bg-base-100 text-base-content">
//             <h2 className="text-lg font-semibold">Confirm Deletion</h2>
//             <p className="text-sm my-2">
//               Are you sure you want to delete this product?
//             </p>
//             <div className="flex justify-end space-x-2 mt-4">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="px-3 py-1 text-sm bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-600"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDelete}
//                 className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AdminProductDetails;

import { useParams, useNavigate } from "react-router-dom";
import { AxiosInstance } from "../../config/AxiosInstance";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

function AdminProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await AxiosInstance.get(`/product/get-product/${id}`);
        setProduct(response.data.data);
        setIsLoading(false);
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || "Failed to fetch product";
        setError(errorMessage);
        toast.error(errorMessage);
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleEdit = () => {
    navigate(`/admin/update-product/${id}`);
  };

  const handleDelete = async () => {
    try {
      await AxiosInstance.delete(`/product/delete-product-by-admin/${id}`);
      toast.success("Product deleted successfully");
      navigate("/admin/products");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete product");
    }
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : product ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img
              src={product.image || "/default-image.jpg"}
              alt={product.title}
              className="w-96 h-90 object-cover"
            />
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Seller:{" "}
              <span className="font-medium text-blue-700">
                {product.seller?.name || "Unknown"}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Store:{" "}
              <span className="font-medium text-blue-700">
                {product.seller?.storeName || "Unknown"}
              </span>
            </p>
            <h1 className="text-lg font-medium">{product.title}</h1>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="text-sm font-medium">Price: Rs.{product.price}</p>
            <p className="text-sm text-gray-600">
              Category:{" "}
              <span className="font-medium text-blue-700">{product.category}</span>
            </p>
            <p className="text-sm font-medium">
              Stock Quantity:{" "}
              <span className="font-medium">{product.stockQuantity}</span>
            </p>
            {product.stockQuantity === 0 && (
              <p className="text-sm text-red-500 font-medium">Out of Stock</p>
            )}
            <div className="flex space-x-4 mt-4">
              <button
                onClick={handleEdit}
                className="flex w-full justify-center bg-black px-3 py-1.5 text-white shadow-sm hover:bg-gray-800"
              >
                Edit Product
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex w-full justify-center bg-white px-3 py-1.5 text-black shadow-sm hover:bg-gray-100 outline outline-1 outline-gray-500"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="mb-4 font-bold text-lg">No Product Data Found</h1>
            <p className="font-light text-sm">
              Please try again or go back to the product list.
            </p>
            <button
              onClick={() => navigate("/admin/products")}
              className="rounded-none py-2 bg-black text-white font-light text-sm w-full mt-4"
            >
              Back to Products
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-base-300">
          <div className="p-4 rounded-lg shadow-lg w-80 bg-base-100 text-base-content">
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            <p className="text-sm my-2">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-3 py-1 text-sm bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProductDetails;
