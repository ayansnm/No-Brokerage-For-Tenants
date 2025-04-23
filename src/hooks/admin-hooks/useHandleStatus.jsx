import React, { useState } from "react";
import toast from "react-hot-toast";

const useHandleStatus = () => {
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleStatus = async (userId, status) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/users/activateuser/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({isActive:status})
        }
      );
      const result = await response.json();
      if (response.ok) {
        toast.success("Status Changed!");
      } else {
        toast.error("ERROR!");
      }
    } catch (error) {
      toast.error(error.message || "Error changins status");
      console.error("Error changing status:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleStatus };
};

export default useHandleStatus;
