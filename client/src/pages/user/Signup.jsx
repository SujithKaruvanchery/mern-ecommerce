import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AxiosInstance } from "../../config/AxiosInstance";

function Signup() {
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

  const user = {
    role: "user",
    signup_api: "/user/signup",
    profile_route: "/user/profile",
    login_route: "/login",
  };

  const role = "user";

  if (role === "seller") {
    user.role = "seller";
    user.signup_api = "/seller/signup";
    user.profile_route = "/seller/profile";
  }

  const onSubmit = async (data) => {
    try {
      setErrorMessages({
        email: "",
        mobile: "",
      });

      const response = await AxiosInstance({
        method: "POST",
        url: user.signup_api,
        data,
      });

      toast.success("Account created successfully!");
      navigate(user.login_route);
    } catch (error) {
      console.error("Registration Error:", error.response?.data);

      if (error.response?.data?.error) {
        const { error: errorMessage } = error.response?.data;

        if (errorMessage.includes("email")) {
          setErrorMessages((prevState) => ({
            ...prevState,
            email: errorMessage,
          }));
        } else if (errorMessage.includes("mobile")) {
          setErrorMessages((prevState) => ({
            ...prevState,
            mobile: errorMessage,
          }));
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
          <h2 className="text-center">Create your account</h2>
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
                    required: true,
                    pattern:
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  })}
                  onChange={(e) =>
                    (e.target.value = e.target.value.toLowerCase())
                  }
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    Please enter a valid email address.
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
                    required: true,
                    pattern: /^[0-9]{10,15}$/,
                  })}
                  inputMode="numeric"
                  maxLength="15"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  }}
                />
                {errors.mobile && (
                  <span className="text-red-500 text-sm">
                    Mobile number must be between 10 and 15 digits.
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
                  {...register("password", { required: true, minLength: 8 })}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    Password must be at least 8 characters long.
                  </span>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center bg-black px-3 py-1.5 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="mt-2">
            <Link to={user.login_route}>
              <button
                type="submit"
                className="flex w-full justify-center bg-white px-3 py-1.5 text-black shadow-sm hover:bg-gray-100 outline outline-1 outline-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Already have an account? Log in
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
