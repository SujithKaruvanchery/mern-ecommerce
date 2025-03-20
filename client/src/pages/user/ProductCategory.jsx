// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { AxiosInstance } from "../../config/AxiosInstance";
// import ProductCategoryCard from "../../components/user/ProductCategoryCard";

// function ProductCategory() {
//   const { category } = useParams();
//   console.log("=======category", category);

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchProduct = async () => {
//     try {
//       const response = await AxiosInstance({
//         method: "GET",
//         url: `/product/products/${category}`,
//       });
//       console.log("=======ProductCategory", response);
//       setProducts(response?.data?.data || []);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProduct();
//   }, [category]);

//   return (
//     <div className="text-base">
//       {loading ? (
//         <div className="flex items-center justify-center h-screen">
//           <p className="text-center">Loading...</p>
//         </div>
//       ) : products.length === 0 ? (
//         <div className="flex items-center justify-center h-screen">
//           <div className="text-center">
//             <h1 className="mb-4 font-bold text-lg">No Products Available!</h1>
//             <p className="font-light text-sm">
//               Get inspiration for your new wardrobe from the latest looks
//             </p>
//             <Link to={"/products"}>
//               <button className="rounded-none py-2 bg-black text-white font-light text-sm w-full mt-4">
//                 Browse Products
//               </button>
//             </Link>
//           </div>
//         </div>
//       ) : (
//         <div>
//           <h1 className="text-center mb-4 font-bold text-lg">
//             Best Collections Available
//           </h1>
//           <div className="flex flex-wrap gap-3 justify-center">
//             {products.map((value) => (
//               <ProductCategoryCard
//                 key={value._id || value.id}
//                 product={value}
//               />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProductCategory;

// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { AxiosInstance } from "../../config/AxiosInstance";
// import ProductCategoryCard from "../../components/user/ProductCategoryCard";

// function ProductCategory() {
//   const { category } = useParams();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [sortOrder, setSortOrder] = useState("");

//   const fetchProduct = async () => {
//     try {
//       const response = await AxiosInstance({
//         method: "GET",
//         url: `/product/products/${category}${sortOrder ? `?sort=${sortOrder}` : ""}`,
//       });
//       setProducts(response?.data?.data || []);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProduct();
//   }, [category, sortOrder]);

//   return (
//     <div className="text-base">
//       {loading ? (
//         <div className="flex items-center justify-center h-screen">
//           <p className="text-center">Loading...</p>
//         </div>
//       ) : products.length === 0 ? (
//         <div className="flex items-center justify-center h-screen">
//           <div className="text-center">
//             <h1 className="mb-4 font-bold text-lg">No Products Available!</h1>
//             <p className="font-light text-sm">
//               Get inspiration for your new wardrobe from the latest looks
//             </p>
//             <Link to={"/products"}>
//               <button className="rounded-none py-2 bg-black text-white font-light text-sm w-full mt-4">
//                 Browse Products
//               </button>
//             </Link>
//           </div>
//         </div>
//       ) : (
//         <div>
//           <div className="flex justify-end mb-4 px-4">
//             <select
//               value={sortOrder}
//               onChange={(e) => setSortOrder(e.target.value)}
//             >
//               <option value="">Default</option>
//               <option value="asc">Price: Low to High</option>
//               <option value="desc">Price: High to Low</option>
//             </select>
//           </div>

//           <h1 className="text-center mb-4 font-bold text-lg">
//             Best Collections Available
//           </h1>
//           <div className="flex flex-wrap gap-3 justify-center">
//             {products.map((value) => (
//               <ProductCategoryCard
//                 key={value._id || value.id}
//                 product={value}
//               />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProductCategory;

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AxiosInstance } from "../../config/AxiosInstance";
import ProductCategoryCard from "../../components/user/ProductCategoryCard";

function ProductCategory() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProduct = async () => {
    try {
      const response = await AxiosInstance({
        method: "GET",
        url: `/product/products/${category}?sort=${sortOrder}&page=${currentPage}&limit=8`,
      });

      setProducts(response?.data?.data || []);
      setTotalPages(response?.data?.totalPages || 1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [category, sortOrder, currentPage]);

  return (
    <div className="text-base">
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <p className="text-center">Loading...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="mb-4 font-bold text-lg">No Products Available!</h1>
            <p className="font-light text-sm">
              Get inspiration for your new wardrobe from the latest looks
            </p>
            <Link to={"/products"}>
              <button className="rounded-none py-2 bg-black text-white font-light text-sm w-full mt-4">
                Browse Products
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-end mb-4 px-4">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-3 py-2"
            >
              <option value="">Default</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>

          <h1 className="text-center mb-4 font-bold text-lg">
            Best Collections Available
          </h1>

          <div className="flex flex-wrap gap-3 justify-center">
            {products.map((value) => (
              <ProductCategoryCard
                key={value._id || value.id}
                product={value}
              />
            ))}
          </div>

          <div className="flex justify-center items-center mt-8">
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-black text-white"
              >
                Prev
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-black text-white"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCategory;
