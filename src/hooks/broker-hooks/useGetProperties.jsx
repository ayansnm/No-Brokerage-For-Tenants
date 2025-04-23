import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useGetProperties = () => {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const getProperties = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId")
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/api/property/getbybrokerid/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      console.log(JSON.stringify(result));
      
      if (response.ok) {
        setProperties(result?.data || []);
      }
    } catch (error) {
      toast.error(error.message || "Error fetching properties");
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false)
    }
  }

  return { loading, properties, getProperties };
}

export default useGetProperties
