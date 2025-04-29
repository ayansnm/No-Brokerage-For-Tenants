import React, { useState } from "react";
import toast from "react-hot-toast";

const useGetBrokerDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [dashboard, setDashboard] = useState({});

  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const getBrokerDashboard = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/api/property/brokerdashboard/${localStorage.getItem(
          "userId"
        )}`,
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
        setDashboard(result?.data || {});
        console.log(result?.data);
        
      } else {
        toast.error(result?.message || "Failed to fetch dashboard");
      }
    } catch (error) {
      toast.error(error.message || "Error fetching dashboard");
      console.error("Error fetching dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, dashboard, getBrokerDashboard };
};

export default useGetBrokerDashboard;
