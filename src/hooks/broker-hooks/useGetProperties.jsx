import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useGetProperties = () => {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const getProperties = async ({searchQuery,category, floor,format,priceRange,type}) => {

    const price = priceRange == 0 ? "" : priceRange;
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId")
      const token = localStorage.getItem("token");
      console.log(`${API_URL}/api/property/getbybrokerid/${userId}?search=${searchQuery || ""}&category=${type || ""}&floor=${floor || ""}&priceRange=${price || ""}&format=${format || ""}&type=${""}`);
      
      const response = await fetch(
        `${API_URL}/api/property/getbybrokerid/${userId}?search=${searchQuery || ""}&category=${type || ""}&floor=${floor || ""}&priceRange=${price || ""}&format=${format || ""}&type=${category || ""}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
    //   console.log(JSON.stringify(result));
      
      if (response.ok) {
        setProperties(result?.data || []);
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

  return { loading, properties, getProperties };
}

export default useGetProperties
