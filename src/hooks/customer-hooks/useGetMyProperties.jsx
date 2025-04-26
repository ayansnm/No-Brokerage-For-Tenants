import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useGetMyProperties = () => {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [requirement, setRequirement] = useState();
  const API_URL = import.meta.env.VITE_API_URL;

//   const getProperties = async ({searchQuery,category, floor,format,priceRange,type}) => {
  const getProperties = async ({searchQuery="",category="", floor="",format="",priceRange="",type="", furnished=""}) => {
//   const getProperties = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId")
      const token = localStorage.getItem("token");
      console.log(`${API_URL}/api/shareproperty/getproperties/${userId}?search=${searchQuery || ""}&category=${type || ""}&floor=${floor || ""}&priceRange=${priceRange || ""}&format=${format || ""}&type=${""}&furnished=${furnished || ""}`);
    //   ?search=${searchQuery || ""}&category=${type || ""}&floor=${floor || ""}&priceRange=${priceRange || ""}&format=${format || ""}&type=${""}
      
      const response = await fetch(
        `${API_URL}/api/shareproperty/getproperties/${userId}?search=${searchQuery || ""}&category=${type || ""}&floor=${floor || ""}&priceRange=${priceRange || ""}&format=${format || ""}&type=${""}&furnished=${furnished || ""}`,
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
        setProperties(result?.data?.properties  || []);
        setRequirement(result?.data?.customerRequirement);
        console.log(JSON.stringify(result?.data?.customerRequirement));
      }
      else{
        setProperties([]);
        setRequirement({});
      }
    } catch (error) {
      toast.error(error.message || "Error fetching properties");
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false)
    }
  }

  return { loading, properties, getProperties, requirement };
}

export default useGetMyProperties
