import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useGetAllProperties = () => {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const getAllProperties = async ({searchQuery,category, floor,format,priceRange,type, furnished}) => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId")
      const token = localStorage.getItem("token");
      console.log(`${API_URL}/api/property/getallproperties?search=${searchQuery || ""}&category=${type || ""}&floor=${floor || ""}&priceRange=${priceRange || ""}&format=${format || ""}&type=${""}&furnished=${furnished || ""}`);
      
      const response = await fetch(
        `${API_URL}/api/property/getallproperties?search=${searchQuery || ""}&category=${type || ""}&floor=${floor || ""}&priceRange=${priceRange || ""}&format=${format || ""}&type=${category || ""}&furnished=${furnished || ""}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      console.log(JSON.stringify(result?.data?.data));
      
      if (response.ok) {
        setProperties(result?.data?.data || []);
      }
      else{
        setProperties([])
      }
    } catch (error) {
      toast.error(error.message || "Error fetching properties");
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false)
    }
  }

  return { loading, properties, getAllProperties };
}

export default useGetAllProperties
