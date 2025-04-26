import React, { useState } from "react";
import toast from "react-hot-toast";

const useGiveResponseTicket = () => {
  const [loading, setLoading] = useState(false);
  const giveResponse = async (response, id) => {
    const data = { reply: response };
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/support/replytocustomer/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({reply : response}),
        }
      );
      const result = await response.json();
      console.log(JSON.stringify(data));

      if (response.ok) {
        return result;
      }
    } catch (error) {
      toast.error(error.message || "Error fetching customer");
      console.error("Error fetching customer:", error);
    } finally {
      setLoading(false);
    }
  };

  return { giveResponse, loading };
};

export default useGiveResponseTicket;
