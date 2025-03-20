import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AxiosInstance } from "../../config/AxiosInstance";
import { useForm } from "react-hook-form";

const UpdateAdminProfile = () => {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({
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
    const fetchAdminData = async () => {
      try {
        const response = await AxiosInstance.get("/admin/profile");
        setAdminData({
          name: response.data.name,
          email: response.data.email,
          mobile: response.data.mobile,
        });
      } catch (error) {
        console.error("Error fetching admin data:", error);
        toast.error("Failed to load admin data");
      }
    };

    fetchAdminData();
  }, []);

  const onSubmit = async (data) => {
    if (!data.name && !data.email && !data.mobile) {
      toast.error("At least one field is required to update");
      return;
    }

    setLoading(true);
    setErrorMessages({ email: "", mobile: "" });

    try {
      const response = await AxiosInstance.put("/admin/update-profile", data);
      toast.success(response.data.message);
      navigate("/admin/profile");
    } catch (error) {
      console.error("Error updating admin profile:", error);

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
        <h1 className="text-center mb-6">Update Admin Profile</h1>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block">
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={adminData.name}
                className="w-full p-2 border"
                placeholder="Enter your full name"
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
                defaultValue={adminData.email}
                className="w-full p-2 border"
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
              Mobile number
            </label>
            <div className="mt-2">
              <input
                id="mobile"
                name="mobile"
                type="text"
                defaultValue={adminData.mobile}
                className="w-full p-2 border"
                placeholder="Enter your mobile number"
                {...register("mobile", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Enter a valid mobile number",
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

export default UpdateAdminProfile;
