import { useState } from "react";
import toast from "react-hot-toast";

const useFetchAllBrokers = () => {
  const [loading, setLoading] = useState(false);
  const [allBrokers, setAllBrokers] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchAllBrokers = async (page = 1, limit = 10, search = "") => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const url = `${API_URL}/api/users/getallbrokers?page=${page}&limit=${limit}&search=${search || ""}`;
      
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        setAllBrokers(result?.data || []);
      } else {
        toast.error(result.message || "Failed to fetch brokers");
      }
    } catch (error) {
      toast.error(error.message || "Error fetching brokers");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, allBrokers, fetchAllBrokers };
};

export default useFetchAllBrokers;