import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useGetPropertyDetails = () => {
  const [loading, setLoading] = useState(false);
  const [property, setProperty] = useState({});
  const API_URL = import.meta.env.VITE_API_URL;

  const getPropertyDetails = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/api/property/getbyid/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      console.log(JSON.stringify(result?.data));
      
      if (response.ok) {
        setProperty(result?.data || []);
      }
    } catch (error) {
      toast.error(error.message || "Error fetching property");
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false)
    }
  }

  return { loading, property, getPropertyDetails };
}

export default useGetPropertyDetails
