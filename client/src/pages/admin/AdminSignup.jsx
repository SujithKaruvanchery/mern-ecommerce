import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AxiosInstance } from "../../config/AxiosInstance";
import toast from "react-hot-toast";

function AdminSignup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({});

  const admin = {
    role: "admin",
    signup_api: "/admin/signup",
    login_route: "/admin/login",
  };

  const onSubmit = async (data) => {
    try {
      const payload = { ...data, role: admin.role };

      const response = await AxiosInstance({
        method: "POST",
        url: admin.signup_api,
        data: payload,
      });

      toast.success("Admin account created successfully!");
      navigate(admin.login_route);
    } catch (error) {
      setErrorMessages(error.response?.data || {});
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center">Create Admin Account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          action="#"
          method="POST"
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label htmlFor="name" className="block">
              First Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="given-name"
                className="w-full mt-2 p-2 border"
                placeholder="Enter your first name"
                {...register("name", { minLength: 2, maxLength: 50 })}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  Name must be between 2 and 50 characters.
                </span>
              )}
            </div>
          </div>

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
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Please enter a valid email address",
                  },
                })}
                onChange={(e) =>
                  (e.target.value = e.target.value.toLowerCase())
                }
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
              {errorMessages.email && (
                <span className="text-red-500 text-sm">
                  {errorMessages.email}
                </span>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="mobile" className="block">
              Mobile Number
            </label>
            <div className="mt-2">
              <input
                id="mobile"
                name="mobile"
                type="text"
                required
                className="w-full mt-2 p-2 border"
                placeholder="Enter your mobile number"
                {...register("mobile", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Mobile number must be between 10 and 15 digits",
                  },
                })}
                inputMode="numeric"
                maxLength="15"
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
              />
              {errors.mobile && (
                <span className="text-red-500 text-sm">
                  {errors.mobile.message}
                </span>
              )}
              {errorMessages.mobile && (
                <span className="text-red-500 text-sm">
                  {errorMessages.mobile}
                </span>
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
                autoComplete="new-password"
                className="w-full mt-2 p-2 border"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
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
          <Link to={admin.login_route}>
            <button
              type="button"
              className="flex w-full justify-center bg-white px-3 py-1.5 text-black shadow-sm hover:bg-gray-100 outline outline-1 outline-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Already have an account? Log in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminSignup;
