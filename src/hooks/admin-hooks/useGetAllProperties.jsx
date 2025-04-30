import { useState } from 'react'
import toast from 'react-hot-toast';

const useGetAllProperties = () => {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    currentPage: 1,
    totalPages: 1
  });
  const API_URL = import.meta.env.VITE_API_URL;

  const getAllProperties = async ({
    searchQuery,
    category,
    floor,
    format,
    priceRange,
    type,
    furnished,
    page = 1
  }) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      const response = await fetch(
        `${API_URL}/api/property/getallproperties?` + new URLSearchParams({
          search: searchQuery || "",
          category: type || "",
          floor: floor || "",
          priceRange: priceRange || "",
          format: format || "",
          type: category || "",
          furnished: furnished || "",
          page: page
        }),
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
        setProperties(result?.data?.data || []);
        setPagination(result?.data?.pagination || {
          total: 0,
          currentPage: 1,
          totalPages: 1
        });
      } else {
        setProperties([]);
        setPagination({
          total: 0,
          currentPage: 1,
          totalPages: 1
        });
      }
    } catch (error) {
      toast.error(error.message || "Error fetching properties");
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  }

  return { loading, properties, pagination, getAllProperties };
}

export default useGetAllProperties;