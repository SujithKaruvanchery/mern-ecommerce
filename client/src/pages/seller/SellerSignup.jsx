import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AxiosInstance } from "../../config/AxiosInstance";

function SellerSignup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [errorMessages, setErrorMessages] = useState({
    email: "",
    mobile: "",
  });

  const seller = {
    role: "seller",
    signup_api: "/seller/signup",
    profile_route: "/seller/profile",
    login_route: "/seller/login",
  };

  const onSubmit = async (data) => {
    try {
      setErrorMessages({ email: "", mobile: "" });

      const response = await AxiosInstance.post(seller.signup_api, data);

      toast.success("Account created successfully!");
      navigate(seller.login_route);
    } catch (error) {
      console.error("Registration Error:", error.response?.data);
      if (error.response?.data?.error) {
        const errorMessage = error.response.data.error;

        if (errorMessage.includes("email")) {
          setErrorMessages((prev) => ({ ...prev, email: errorMessage }));
        } else if (errorMessage.includes("mobile")) {
          setErrorMessages((prev) => ({ ...prev, mobile: errorMessage }));
        } else {
          toast.error(errorMessage || "Registration failed. Please try again.");
        }
      }
    }
  };

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center">Create your Seller account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name" className="block">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                className="w-full mt-2 p-2 border"
                placeholder="Enter your full name"
                {...register("name", { required: true, minLength: 2 })}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  Enter a valid name.
                </span>
              )}
            </div>

            <div className="mt-2">
              <label htmlFor="email" className="block">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full mt-2 p-2 border rounded-none"
                placeholder="Enter your email address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
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
              {errorMessages.email && (
                <span className="text-red-500 text-sm">
                  {errorMessages.email}
                </span>
              )}
            </div>

            <div className="mt-2">
              <label htmlFor="mobile" className="block">
                Mobile Number
              </label>
              <input
                id="mobile"
                name="mobile"
                type="text"
                required
                className="w-full mt-2 p-2 border"
                placeholder="Enter your mobile number"
                {...register("mobile", {
                  required: true,
                  pattern: /^[0-9]{10,15}$/,
                })}
                inputMode="numeric"
                maxLength="15"
                onInput={(e) =>
                  (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                }
              />
              {errors.mobile && (
                <span className="text-red-500 text-sm">
                  Enter a valid mobile number.
                </span>
              )}
              {errorMessages.mobile && (
                <span className="text-red-500 text-sm">
                  {errorMessages.mobile}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="storeName" className="block">
                Store Name
              </label>
              <input
                id="storeName"
                type="text"
                required
                className="w-full mt-2 p-2 border"
                placeholder="Enter your store name"
                {...register("storeName", { required: true, minLength: 2 })}
              />
              {errors.storeName && (
                <span className="text-red-500 text-sm">
                  Enter a valid store name.
                </span>
              )}
            </div>

            <div>
              <label htmlFor="address" className="block">
                Store Address
              </label>
              <textarea
                id="address"
                required
                className="w-full mt-2 p-2 border"
                placeholder="Enter your store address"
                {...register("address", { required: true, minLength: 5 })}
              />
              {errors.address && (
                <span className="text-red-500 text-sm">
                  Enter a valid address.
                </span>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="w-full mt-2 p-2 border"
                placeholder="Enter your password"
                {...register("password", { required: true, minLength: 8 })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  Password must be at least 8 characters.
                </span>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center bg-black px-3 py-1.5 text-white shadow-sm hover:bg-gray-800"
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="mt-2">
            <Link to={seller.login_route}>
              <button className="flex w-full justify-center bg-white px-3 py-1.5 text-black shadow-sm hover:bg-gray-100 outline outline-1 outline-gray-500">
                Already have an account? Log in
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerSignup;
