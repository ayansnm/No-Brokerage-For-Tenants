import React, { useState } from "react";
import toast from "react-hot-toast";

const useGetCustomer = () => {
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState()

  const getCustomer = async ({ id }) => {
    setLoading(true);
    try {
        const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/users/profile/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      if (response.ok) {
        setUser(result?.data?.user);
        console.log(JSON.stringify(result?.data?.user));
      } 
    } catch (error) {
      toast.error(error.message || "Error fetching customer");
      console.error("Error fetching customer:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, getCustomer, user };
};

export default useGetCustomer;
