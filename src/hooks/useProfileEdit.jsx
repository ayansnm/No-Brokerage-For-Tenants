import React, { useState } from "react";
import toast from "react-hot-toast";

const useProfileEdit = () => {
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const editProfile = async ({ data, userId }) => {
    setLoading(true);
    const finalUserId = userId || localStorage.getItem("userId");

    try {
      const endpoint = `${API_URL}/api/users/edituser/${finalUserId}`;
      console.log(endpoint);

      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const userData = await response.json();

      if (response.ok) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error(userData?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, editProfile };
};

export default useProfileEdit;
