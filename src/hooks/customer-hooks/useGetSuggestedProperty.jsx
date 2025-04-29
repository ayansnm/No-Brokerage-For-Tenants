import { useState } from "react";
import toast from "react-hot-toast";

const useGetSuggestedProperty = () => {
  const [loading, setLoading] = useState(false);
  const [suggestedProperties, setSuggestedProperties] = useState([]);
  const [totalSharedWithCount, setTotalSharedWithCount] = useState(0);
  const API_URL = import.meta.env.VITE_API_URL;

  const getSuggestedProperties = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/property/suggestedproperties/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      console.log("API result:", result);

      if (response.ok) {
        setSuggestedProperties(result?.data?.properties || []);
        setTotalSharedWithCount(result?.data?.totalSharedWithCount || 0);
      } else {
          setTotalSharedWithCount(0);
        setSuggestedProperties([]);
      }
    } catch (error) {
      toast.error(error.message || "Error fetching properties");
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, suggestedProperties, totalSharedWithCount, getSuggestedProperties };
};

export default useGetSuggestedProperty;
