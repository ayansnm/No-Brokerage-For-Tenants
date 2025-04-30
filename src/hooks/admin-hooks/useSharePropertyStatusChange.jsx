import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useSharePropertyStatusChange = () => {
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const sharePropertyStatusChange = async ({ id, status }) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/shareproperty/changestatus/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: status }),
        }
      );
      const result = await response.json();
      console.log(result);
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

  return { sharePropertyStatusChange, loading };
}

export default useSharePropertyStatusChange
