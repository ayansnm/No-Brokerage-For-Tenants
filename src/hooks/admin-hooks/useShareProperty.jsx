import React, { useState } from "react";
import toast from "react-hot-toast";

const useShareProperty = () => {
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const shareProperty = async ({ customerId, propertyId }) => {
    setLoading(true);

    const body = {
      userId: localStorage.getItem("userId"),
      sharedWith: customerId,
      propertyId: propertyId,
    };

    try {
      
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/api/shareproperty/customer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body)
        }
      );

      const result = await response.json();
      console.log(JSON.stringify(result));
      if (response.ok) {
        toast.success("Property shared successfully!");
    }
    else{
          toast.error("Property not shared!");
      }
    } catch (error) {
      toast.error(error.message || "Error sharing properties");
      console.error("Error sharing properties:", error);
    } finally {
      setLoading(false);
    }
  };

  return {loading, shareProperty};
};

export default useShareProperty;
