import React, { useState } from "react";

const useGetAreas = () => {
  const [loading, setLoading] = useState(false);
  const [areas, setAreas] = useState({});
  const API_URL = import.meta.env.VITE_API_URL;

  const getAreas = async ({ search }) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/api/area/getlist?page=1&size=10&search=${search || ""}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      console.log(data?.areas);
      
      setAreas(data?.areas);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, areas, getAreas };
};

export default useGetAreas;
