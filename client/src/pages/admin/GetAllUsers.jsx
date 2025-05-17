import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../config/AxiosInstance";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const GetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await AxiosInstance.get("/user/get-all-users");
        setUsers(response.data);
      } catch (error) {
        toast.error("Failed to fetch users");
        console.error(
          "Error fetching users:",
          error.response?.data?.message || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async () => {
    try {
      await AxiosInstance.delete(`/user/delete-user/${deleteUserId}`);
      toast.success("User deleted successfully");
      setUsers(users.filter((user) => user._id !== deleteUserId));
      setShowModal(false);
    } catch (error) {
      toast.error("Failed to delete user");
      console.error(
        "Error deleting user:",
        error.response?.data?.message || error.message
      );
    }
  };

  const handleActivate = async (id) => {
    try {
      await AxiosInstance.put(`/user/activate/${id}`);
      toast.success("User activated successfully");
      setUsers(
        users.map((user) =>
          user._id === id ? { ...user, status: "active" } : user
        )
      );
    } catch (error) {
      toast.error("Failed to activate user");
      console.error(
        "Error activating user:",
        error.response?.data?.message || error.message
      );
    }
  };

  const handleDeactivate = async (id) => {
    try {
      await AxiosInstance.put(`/user/deactivate/${id}`);
      toast.success("User deactivated successfully");
      setUsers(
        users.map((user) =>
          user._id === id ? { ...user, status: "inactive" } : user
        )
      );
    } catch (error) {
      toast.error("Failed to deactivate user");
      console.error(
        "Error deactivating user:",
        error.response?.data?.message || error.message
      );
    }
  };

  const toggleModal = (id) => {
    setDeleteUserId(id);
    setShowModal(!showModal);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-center font-bold">All Users</h1>
      {users.length === 0 ? (
       <div className="flex items-center justify-center h-screen">
       <div className="text-center">
         <h1 className="mb-4 font-bold text-lg">No Users Found</h1>
         <p className="font-light text-sm">
           Manage your user data efficiently.
         </p>
         <Link to={"/admin"}>
           <button className="rounded-none py-2 bg-black text-white font-light text-sm w-full mt-4">
             Back to Home
           </button>
         </Link>
       </div>
     </div>     
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user._id} className="shadow-md p-4 border">
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p>{user.email}</p>
              <p>{user.mobile}</p>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => handleActivate(user._id)}
                  className="bg-black text-white px-4 py-2 rounded-none hover:bg-gray-800"
                >
                  Activate
                </button>
                <button
                  onClick={() => handleDeactivate(user._id)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-none hover:bg-gray-600"
                >
                  Deactivate
                </button>
                <button
                  onClick={() => toggleModal(user._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-none hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-base-300">
          <div className="p-4 rounded-lg shadow-lg w-80 bg-base-100 text-base-content">
            <h1 className="text-lg font-semibold">Delete User</h1>
            <p className="text-sm my-2">
              Are you sure you want to delete this user?
            </p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={toggleModal}
                className="px-3 py-1 text-sm bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetAllUsers;
