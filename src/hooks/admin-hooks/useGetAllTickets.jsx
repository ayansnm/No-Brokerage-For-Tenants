import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useGetAllTickets = () => {
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const getAllTickets = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      console.log(`${API_URL}/api/support/getallsupportrequest?page=1&limit=10`);
      
      const response = await fetch(
        `${API_URL}/api/support/getallsupportrequest?page=1&limit=10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      console.log(JSON.stringify(result?.data?.messages));
      
      if (response.ok) {
        setTickets(result?.data?.messages || []);
      }
      else{
        setTickets([])
      }
    } catch (error) {
      toast.error(error.message || "Error fetching tickets");
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false)
    }
  }

  return { loading, tickets, getAllTickets };
}

export default useGetAllTickets
