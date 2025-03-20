// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import NewArrivalsCard from "../../components/user/NewArrivalsCard";
// import { AxiosInstance } from "../../config/AxiosInstance";

// function NewArrivals() {
//   const [productList, setProductList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchNewArrivals = async () => {
//     try {
//       const response = await AxiosInstance({
//         method: "GET",
//         url: "/product/get-new-arrivals",
//       });
//       console.log("=======product", response);
//       console.log("API Response Data:", response?.data);
//       setProductList(response?.data?.data || []);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchNewArrivals();
//   }, []);

//   return (
//     <div>
//       {loading ? (
//         <div className="flex items-center justify-center h-screen">
//           <p className="text-center">Loading...</p>
//         </div>
//       ) : productList.length === 0 ? (
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
//             New Arrivals Collection
//           </h1>
//           <div className="flex flex-wrap gap-3 justify-center">
//             {productList.map((value) => (
//               <NewArrivalsCard key={value._id} product={value} />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default NewArrivals;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import NewArrivalsCard from "../../components/user/NewArrivalsCard";
// import { AxiosInstance } from "../../config/AxiosInstance";

// function NewArrivals() {
//   const [productList, setProductList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [category, setCategory] = useState("");

//   const fetchNewArrivals = async () => {
//     try {
//       const response = await AxiosInstance.get(
//         `/product/get-new-arrivals${category ? `?category=${category}` : ""}`
//       );
//       console.log("API Response Data:", response?.data);
//       setProductList(response?.data?.data || []);
//     } catch (error) {
//       console.error("Error fetching new arrivals:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchNewArrivals();
//   }, [category]);

//   return (
//     <div>
//       <div className="flex justify-end mb-4 px-4">
//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//         >
//           <option value="">All Categories</option>
//           <option value="men">Men</option>
//           <option value="women">Women</option>
//           <option value="kids">Kids</option>
//         </select>
//       </div>

//       {loading ? (
//         <div className="flex items-center justify-center h-screen">
//           <p className="text-center">Loading...</p>
//         </div>
//       ) : productList.length === 0 ? (

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
//             New Arrivals Collection
//           </h1>
//           <div className="flex flex-wrap gap-3 justify-center">
//             {productList.map((value) => (
//               <NewArrivalsCard key={value._id} product={value} />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default NewArrivals;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NewArrivalsCard from "../../components/user/NewArrivalsCard";
import { AxiosInstance } from "../../config/AxiosInstance";

function NewArrivals() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchNewArrivals = async () => {
    try {
      const response = await AxiosInstance.get(
        `/product/get-new-arrivals?category=${category}&page=${currentPage}&limit=8`
      );
      setProductList(response?.data?.data || []);
      setTotalPages(response?.data?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching new arrivals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewArrivals();
  }, [category, currentPage]);

  return (
    <div>
      <div className="flex justify-end mb-4 px-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <p className="text-center">Loading...</p>
        </div>
      ) : productList.length === 0 ? (
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
          <h1 className="text-center mb-4 font-bold text-lg">
            New Arrivals Collection
          </h1>
          <div className="flex flex-wrap gap-3 justify-center">
            {productList.map((value) => (
              <NewArrivalsCard key={value._id} product={value} />
            ))}
          </div>

          <div className="flex justify-center items-center gap-3 mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-black text-white"
            >
              Prev
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-black text-white"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewArrivals;
