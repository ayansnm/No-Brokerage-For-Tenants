import { useState } from 'react';
import toast from 'react-hot-toast';

const useGetPropertyDetails = () => {
  const [loading, setLoading] = useState(false);
  const [property, setProperty] = useState({});
  const API_URL = import.meta.env.VITE_API_URL;

  const getPropertyDetails = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        throw new Error("Authentication token not found");
      }

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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Failed to fetch property details");
      }

      const result = await response.json();
      console.log("Property details fetched:", result?.data);
      
      if (result?.data) {
        setProperty(result.data);
        return result.data;
      } else {
        throw new Error("No property data received");
      }
    } catch (error) {
      toast.error(error.message || "Error fetching property");
      console.error("Error fetching property details:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, property, getPropertyDetails };
};

export default useGetPropertyDetails;
