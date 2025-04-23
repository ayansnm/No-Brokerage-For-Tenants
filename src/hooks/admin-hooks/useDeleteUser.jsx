import React, { useState } from "react";
import toast from "react-hot-toast";

const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const deleteUser = async (userId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/users/deleteuser/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      if (response.ok) {
        toast.success("User Successfully Deleted!");
      } else {
        toast.error("User not Deleted!");
      }
    } catch (error) {
      toast.error(error.message || "Error fetching customers");
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, deleteUser };
};

export default useDeleteUser;
