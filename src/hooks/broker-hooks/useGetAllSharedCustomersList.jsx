import React, { useState } from "react";
import toast from "react-hot-toast";

const useGetAllSharedCustomersList = () => {
  const [loading, setLoading] = useState(false);
  const [allCustomers, setAllCustomers] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const getAllCustomers = async ({ propertyId }) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/api/shareproperty/getcustomer/${propertyId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
        console.log(JSON.stringify(result));

      if (response.ok) {
        setAllCustomers(result?.data || []);
      } else {
        setAllCustomers([]);
      }
    } catch (error) {
      toast.error(error.message || "Error fetching Customers");
      console.error("Error fetching Customers:", error);
    } finally {
      setLoading(false);
    }
  };
  return {loading, allCustomers, getAllCustomers};
};

export default useGetAllSharedCustomersList;
