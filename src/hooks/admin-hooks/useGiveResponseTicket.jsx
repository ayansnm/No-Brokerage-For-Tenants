import React, { useState } from "react";
import toast from "react-hot-toast";

const useGiveResponseTicket = () => {
  const [loading, setLoading] = useState(false);
  const giveResponse = async (reply, id) => {
    const data = { reply: reply };
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      console.log(`${import.meta.env.VITE_API_URL}/api/support/replytocustomer/${id}`);
      
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/support/replytocustomer/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      console.log(JSON.stringify(result));

      if (response.ok) {
        toast.success("Replied successfully!");
      }
    } catch (error) {
      toast.error(error.message || "Error replying");
      console.error("Error replying:", error);
    } finally {
      setLoading(false);
    }
  };

  return { giveResponse, loading };
};

export default useGiveResponseTicket;
