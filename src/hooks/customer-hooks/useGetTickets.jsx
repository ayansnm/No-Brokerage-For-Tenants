import React, { useState } from "react";

const useGetTickets = () => {
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState({});
  const API_URL = import.meta.env.VITE_API_URL;

  const getTickets = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/api/support/getsupportbyuserId/${localStorage.getItem("userId")}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      console.log(data);
      
      setTickets(data?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, tickets, getTickets };
};

export default useGetTickets;
