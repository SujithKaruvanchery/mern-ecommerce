import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AxiosInstance } from "../../config/AxiosInstance";
import { useForm } from "react-hook-form";

const UpdateUserProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    mobile: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await AxiosInstance.get("/user/profile");
        setUserData({
          name: response.data.name,
          email: response.data.email,
          mobile: response.data.mobile,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user data");
      }
    };

    fetchUserData();
  }, []);

  const onSubmit = async (data) => {
    if (!data.name && !data.email && !data.mobile) {
      toast.error("At least one field is required to update");
      return;
    }

    setLoading(true);
    setErrorMessages({ email: "", mobile: "" });

    try {
      const response = await AxiosInstance.put("/user/update-profile", data);
      toast.success(response.data.message);
      navigate("/user/profile");
    } catch (error) {
      console.error("Error updating profile:", error);

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
          toast.error(errorMessage || "Failed to update profile");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-center mb-6">Update Profile</h1>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block">
              First Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={userData.name}
                className="w-full mt-2 p-2 border"
                placeholder="Enter your first name"
                {...register("name", { minLength: 2, maxLength: 50 })}
                required
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
                defaultValue={userData.email}
                className="w-full mt-2 p-2 border"
                placeholder="Enter your email address"
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
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
                defaultValue={userData.mobile}
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

          <div className="flex justify-center">
            <button
              type="submit"
              className="flex w-full justify-center bg-black px-3 py-1.5 text-white shadow-sm hover:bg-gray-800"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserProfile;
