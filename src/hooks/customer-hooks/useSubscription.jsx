import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const useSubscription = () => {
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const subscribe = async (amount, propertyId) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const startDate = new Date();
    const endDate = new Date(startDate);

    // Add 3 months
    endDate.setMonth(endDate.getMonth() + 3);

    console.log("Start Date:", startDate.toDateString());
    console.log("End Date:", endDate.toDateString());
    const alldata = {
      amount: amount,
      userId: localStorage.getItem("userId"),
      customerPropertyRequirementId: propertyId,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
    try {
      const response = await fetch(`${API_URL}/api/subscription/userSubscription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(alldata),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        navigate("/")
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, subscribe };
};

export default useSubscription;
