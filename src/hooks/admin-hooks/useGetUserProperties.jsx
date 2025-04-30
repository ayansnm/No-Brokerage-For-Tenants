import { useState } from "react";
import toast from "react-hot-toast";

const useGetUserProperties = () => {
  const [loading, setLoading] = useState(false);
  const [allProperties, setAllProperties] = useState([]);
  const [requirement, setRequirement] = useState([]);
  const [user, setUser] = useState({});
  const [pagination, setPagination] = useState({});
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchSharingProperty = async ({
    page = 1,
    limit = 10,
    search = "",
    userId,
    category = "",
    floor = "",
    format = "",
    priceRange = "",
    type = "",
    furnished = ""
  }) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // Construct query parameters
      const params = new URLSearchParams({
        page,
        limit,
        search: search || "",
        category: category || "",
        floor: floor || "",
        format: format || "",
        priceRange: priceRange || "",
        type: type || "",
        furnished: furnished || ""
      });

      const response = await fetch(
        `${API_URL}/api/property/getpropertylistbyuserrequirement/${userId}?${params.toString()}`,
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
        setAllProperties(result?.data?.properties || []);
        setRequirement(result?.data?.requirement || {});
        setUser(result?.data?.user || {});
        setPagination(result?.data?.pagination || {});
      } else {
        setAllProperties([]);
        setRequirement({});
        setUser({});
        setPagination({
          total: 0,
          totalPages: 1,
        });
      }
    } catch (error) {
      toast.error(error.message || "Error fetching properties");
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  return { 
    loading, 
    allProperties, 
    fetchSharingProperty, 
    user, 
    requirement,
    pagination 
  };
};

export default useGetUserProperties;