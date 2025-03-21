import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AxiosInstance } from "../../config/AxiosInstance";
import { useForm } from "react-hook-form";

const UpdateSellerProfile = () => {
  const navigate = useNavigate();
  const [sellerData, setSellerData] = useState({
    name: "",
    email: "",
    mobile: "",
    storeName: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const response = await AxiosInstance.get("/seller/profile");
        const { name, email, mobile, storeName, address } = response.data;
        setSellerData({
          name,
          email,
          mobile,
          storeName,
          address,
        });
        setValue("name", name);
        setValue("email", email);
        setValue("mobile", mobile);
        setValue("storeName", storeName);
        setValue("address", address);
      } catch (error) {
        console.error("Error fetching seller data:", error);
        toast.error("Failed to load seller data");
      }
    };

    fetchSellerData();
  }, [setValue]);

  const onSubmit = async (data) => {
    if (
      !data.name &&
      !data.email &&
      !data.mobile &&
      !data.storeName &&
      !data.address
    ) {
      toast.error("At least one field is required to update");
      return;
    }

    setLoading(true);
    try {
      const response = await AxiosInstance.put("/seller/update-profile", data);
      toast.success(response.data.message);
      navigate("/seller/profile");
    } catch (error) {
      console.error("Error updating seller profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-center mb-6">Update Seller Profile</h1>
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
              <span className="text-red-500 text-sm">Enter a valid name.</span>
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
              onChange={(e) => (e.target.value = e.target.value.toLowerCase())}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
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

export default UpdateSellerProfile;
