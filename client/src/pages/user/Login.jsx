// import React from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import { AxiosInstance } from "../../config/AxiosInstance";
// import toast from "react-hot-toast";

// function Login() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const navigate = useNavigate();

//   const user = {
//     login_api: "/user/login",
//     profile_route: "/user/profile",
//     signup_route: "/signup",
//   };

//   const onSubmit = async (data) => {
//     try {
//       const response = await AxiosInstance({
//         method: "POST",
//         url: user.login_api,
//         data,
//       });

//       if (response.status === 200) {
//         toast.success("Welcome! You have logged in successfully.");
//         navigate(user.profile_route);
//       }
//     } catch (error) {
//       if (error.response) {
//         toast.error(
//           error.response.data.error ||
//             "Invalid login credentials. Please try again."
//         );
//       } else {
//         toast.error(
//           "Network error. Please check your connection and try again."
//         );
//       }
//     }
//   };

//   return (
//     <div>
//       <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
//         <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//           <h2 className="text-center">Sign in to your account</h2>
//         </div>

//         <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//           <form
//             action="#"
//             method="POST"
//             className="space-y-6"
//             onSubmit={handleSubmit(onSubmit)}
//           >
//             <div>
//               <label htmlFor="email" className="block">
//                 Email address
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   required
//                   autoComplete="email"
//                   className="w-full mt-2 p-2 border"
//                   placeholder="Enter your email address"
//                   {...register("email", {
//                     required: "Email is required",
//                     pattern: {
//                       value:
//                         /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
//                       message: "Enter a valid email address",
//                     },
//                   })}
//                   onChange={(e) =>
//                     (e.target.value = e.target.value.toLowerCase())
//                   }
//                 />
//                 {errors.email && (
//                   <p className="text-red-500 text-sm">{errors.email.message}</p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <div className="flex items-center justify-between">
//                 <label htmlFor="password" className="block">
//                   Password
//                 </label>
//                 <div className="text-sm">
//                   <Link to={"/forgot-password"} className="font-semibold">
//                     Forgot password?
//                   </Link>
//                 </div>
//               </div>
//               <div className="mt-2">
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   required
//                   autoComplete="current-password"
//                   className="w-full mt-2 p-2 border"
//                   placeholder="Enter your password"
//                   {...register("password", {
//                     required: "Password is required",
//                     minLength: {
//                       value: 8,
//                       message: "Password must be at least 8 characters",
//                     },
//                   })}
//                 />
//                 {errors.password && (
//                   <p className="text-red-500 text-sm">
//                     {errors.password.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="flex w-full justify-center bg-black px-3 py-1.5 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
//               >
//                 Sign in
//               </button>
//             </div>
//           </form>

//           <div className="mt-2">
//             <Link to={user.signup_route}>
//               <button
//                 type="submit"
//                 className="flex w-full justify-center bg-white px-3 py-1.5 text-black shadow-sm hover:bg-gray-100 outline outline-1 outline-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
//               >
//                 Create Account
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AxiosInstance } from "../../config/AxiosInstance";
import toast from "react-hot-toast";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const user = {
    login_api: "/user/login",
    profile_route: "/user/profile",
    signup_route: "/signup",
  };

  const onSubmit = async (data) => {
    try {
      const response = await AxiosInstance({
        method: "POST",
        url: user.login_api,
        data,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        toast.success("Welcome! You have logged in successfully.");

        window.location.href = user.profile_route;
      }
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response) {
        toast.error(
          error.response.data.error ||
            "Invalid login credentials. Please try again."
        );
      } else {
        toast.error(
          "Network error. Please check your connection and try again."
        );
      }
    }
  };

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full mt-2 p-2 border"
                  placeholder="Enter your email address"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  onChange={(e) =>
                    (e.target.value = e.target.value.toLowerCase())
                  }
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="w-full mt-2 p-2 border"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center bg-black px-3 py-1.5 text-white shadow-sm hover:bg-gray-800"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-2">
            <Link to={user.signup_route}>
              <button className="flex w-full justify-center bg-white px-3 py-1.5 text-black shadow-sm hover:bg-gray-100 outline outline-1 outline-gray-500">
                Create Account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
