import { useState } from "react";
import toast from "react-hot-toast";

const useFetchAllCustomers = () => {
  const [loading, setLoading] = useState(false);
  const [allCustomers, setAllCustomers] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchAllCustomers = async (page = 1, limit = 10, search) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/users/getallusers?page=${page}&limit=${limit}&search=${search || ""}`,
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
        setAllCustomers(result?.data?.data || []);
      }
    } catch (error) {
      toast.error(error.message || "Error fetching customers");
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, allCustomers, fetchAllCustomers };
};

export default useFetchAllCustomers;
