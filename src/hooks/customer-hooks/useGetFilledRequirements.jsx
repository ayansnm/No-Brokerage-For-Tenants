import { useState } from "react";
import toast from "react-hot-toast";

const useGetFilledRequirements = () => {
  const [loading, setLoading] = useState(false);
  const [requirements, setRequirements] = useState(null); // To store fetched data
  const API_URL = import.meta.env.VITE_API_URL;

  const getRequirement = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/property/getrequirementform`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      // Get today's date in YYYY-MM-DD format
      const today = new Date().toISOString().slice(0, 10);

      // Find the latest item based on createdAt
      const latestItem = result?.data?.reduce((latest, item) => {
        const itemDate = new Date(item?.createdAt);
        return !latest || new Date(latest?.createdAt) < itemDate
          ? item
          : latest;
      }, null);

      // Log all createdAt values (optional)
      result?.data?.forEach((item) => {
        console.log("item:", item?.createdAt);
      });

      // Log the full data (optional)
      console.log("Requirement:", result?.data);

      // Log the latest item if it's created today
      if (
        latestItem &&
        new Date(latestItem.createdAt).toISOString().slice(0, 10) === today
      ) {
        console.log("📌 Latest item created today:", latestItem);
      } else {
        console.log("No item created today.");
      }

      if (!response.ok) {
        throw new Error(result.message || "Fetching requirement failed");
      }

      setRequirements(latestItem); // store the fetched data
      return result?.data;
    } catch (error) {
      toast.error(error.message || "Error fetching requirements");
      console.error("Error fetching requirement:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, getRequirement, requirements };
};

export default useGetFilledRequirements;
