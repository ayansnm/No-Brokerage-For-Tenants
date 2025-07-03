import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useAddProperty = () => {
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const addProperty = async (formData) => {
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/property/addproperty`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formData, // Just pass the FormData directly
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (response.ok) {
        toast.success("Property added successfully!");
        navigate("/app/broker/dashboard");
      } else {
        toast.error(result?.message || "Failed to add property.");
      }
    } catch (error) {
      toast.error("Something went wrong while adding the property.");
      console.error("Add Property Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, addProperty };
};

export default useAddProperty;
