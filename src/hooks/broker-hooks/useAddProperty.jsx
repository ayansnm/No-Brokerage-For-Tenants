import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useAddProperty = () => {
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const addProperty = async (data) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", data?.title);
      formData.append("area", data?.area);
      formData.append("price", data?.priceRange);
      formData.append("floor", data?.floor);
      formData.append("type", data?.purpose?.charAt(0).toUpperCase() + data?.purpose?.slice(1));
      formData.append("category", data?.type);
      formData.append("format", data?.format);
      formData.append("sizeType", data?.sizetype);
      formData.append("furnished", data?.furnished);
      formData.append("location", data?.location);
      formData.append("description", data?.description);

      // Append multiple images
      if (data?.images?.length > 0) {
        data.images.forEach((image) => {
          if (image?.file) {
            formData.append("images", image.file);
          }
        });
      }
      
      console.log("FORMDATA :",JSON.stringify(data));
      

      const response = await fetch(`${API_URL}/api/property/addproperty`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formData,
      });

      const result = await response.json();
      console.log(JSON.stringify(result));
      

      if (response.ok) {
        toast.success("Property added successfully!");
        navigate("/broker/dashboard")
      } else {
        toast.error(result?.message || "Failed to add property.");
      }
    } catch (error) {
      toast.error("Something went wrong while adding the property.");
      console.error("Add Property Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, addProperty };
};

export default useAddProperty;
