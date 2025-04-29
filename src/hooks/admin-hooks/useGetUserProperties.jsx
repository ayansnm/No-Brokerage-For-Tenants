import { useState } from "react";
import toast from "react-hot-toast";

const useGetUserProperties = () => {
  const [loading, setLoading] = useState(false);
  const [allProperties, setAllProperties] = useState([]);
  const [requirement, setRequirement] = useState([]);
  const [user, setUser] = useState({});
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchSharingProperty = async ({page = 1, limit = 10, search = "", userId}) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/property/getpropertylistbyuserrequirement/${userId}?page=${page}&limit=${limit}&search=${search || ""}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      console.log("DATA : ",JSON.stringify(result?.data));
      if (response.ok) {
        setAllProperties(result?.data?.properties || []);
        setRequirement(result?.data?.customerRequirement || {});
      }
    } catch (error) {
      toast.error(error.message || "Error fetching customers");
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, allProperties, fetchSharingProperty, user };
};

export default useGetUserProperties;
