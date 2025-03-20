import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";
import { AxiosInstance } from "../../config/AxiosInstance";
import toast from "react-hot-toast";

function SellerProfile() {
  const [sellerData, isLoading, error] = useFetch("/seller/profile");
  const [activeTab, setActiveTab] = useState("account");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const tabs = [
    { id: "account", label: "Account Info" },
    { id: "update", label: "Update Profile" },
    { id: "remove", label: "Remove Account" },
    { id: "logout", label: "Logout" },
  ];

  const handleDeleteAccount = async () => {
    try {
      const response = await AxiosInstance.delete(
        `/seller/delete-seller/${sellerData?._id}`
      );
      toast.success(response.data.message);
      navigate("/seller");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete account");
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await AxiosInstance.get("/seller/logout");
      toast.success("Logged out successfully");
      navigate("/seller");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    } finally {
      setIsLogoutModalOpen(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full px-4 py-2 text-left border-b ${
                activeTab === tab.id
                  ? "bg-black text-white"
                  : "bg-white text-black"
              } hover:bg-gray-100 focus:outline-none text-sm`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        {activeTab === "account" && (
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold">Account Info</h2>
            <p className="text-sm">{sellerData?.name}</p>
            <p className="text-sm">{sellerData?.storeName}</p>
            <p className="text-sm">{sellerData?.email}</p>
            <p className="text-sm">{sellerData?.mobile}</p>
            <p className="text-sm">{sellerData?.address}</p>
          </div>
        )}

        {activeTab === "update" && (
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold">Update Profile</h2>
            <p className="text-sm">Edit your profile information.</p>
            <Link to="/seller/update-profile">
              <button className="mt-4 w-48 py-2 bg-black text-white text-sm">
                Edit Profile
              </button>
            </Link>
          </div>
        )}

        {activeTab === "remove" && (
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold">Remove Account</h2>
            <p className="text-sm">
              Deleting your account is permanent. Are you sure?
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 w-48 py-2 bg-red-600 text-white text-sm"
            >
              Delete Account
            </button>
          </div>
        )}

        {activeTab === "logout" && (
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold">Logout</h2>
            <p className="text-sm">Are you sure you want to logout?</p>
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="mt-4 w-48 py-2 bg-black text-white text-sm"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-base-300">
          <div className="p-4 rounded-lg shadow-lg w-80 bg-base-100 text-base-content">
            <h3 className="text-lg font-semibold">Are you sure?</h3>
            <p className="text-sm my-2">
              Deleting your account is permanent and cannot be undone. Please
              confirm to proceed.
            </p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-3 py-1 text-sm bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {isLogoutModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-base-300">
          <div className="p-4 rounded-lg shadow-lg w-80 bg-base-100 text-base-content">
            <h3 className="text-lg font-semibold">Confirm Logout</h3>
            <p className="text-sm my-2">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="px-3 py-1 text-sm bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SellerProfile;
