import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useTotalCount = () => {
  const [loading, setLoading] = useState(false);
  const [counts, setCounts] = useState({
    userCount: 0,
    brokerCount: 0,
    propertyCount: 0,
  });

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchTotalCount = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/users/totalcount`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (response.ok) {
        setCounts(result?.data || {});
      } else {
        toast.error(result?.message || "Failed to fetch counts");
      }
    } catch (error) {
      toast.error(error.message || "Error fetching total count");
      console.error("Error fetching total count:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTotalCount();
  }, []);

  return { loading, counts };
};

export default useTotalCount;
