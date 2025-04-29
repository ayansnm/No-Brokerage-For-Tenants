import React, { useState } from "react";
import toast from "react-hot-toast";

const useGetAllSharedCustomersList = () => {
  const [loading, setLoading] = useState(false);
  const [allCustomers, setAllCustomers] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });

  const API_URL = import.meta.env.VITE_API_URL;

  const getAllCustomers = async ({ propertyId, page = 1, limit = 10, search, status }) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search ? { search } : {}),
        ...(status ? { status } : {})
      });

      const url = `${API_URL}/api/shareproperty/getcustomer/${propertyId}?${queryParams.toString()}`;
      console.log("Fetching:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      console.log("Result:", result);

      if (response.ok) {
        setAllCustomers(result?.data?.data || []);
        setPagination({
          total: result?.data?.total || 0,
          totalPages: result?.data?.totalPages || 1,
        });
      } else {
        setAllCustomers([]);
        setPagination({ total: 0, totalPages: 1 });
      }
    } catch (error) {
      toast.error(error.message || "Error fetching Customers");
      console.error("Error fetching Customers:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, allCustomers, pagination, getAllCustomers };
};

export default useGetAllSharedCustomersList;
