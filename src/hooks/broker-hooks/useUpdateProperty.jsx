import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useUpdateProperty = () => {
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const updateProperty = async (data, id) => {
    setLoading(true);

    try {
      const formData = new FormData();

      // Append form fields with checks
      if (data?.title) formData.append("title", data.title);
      if (data?.area) formData.append("area", data.area);
      if (data?.address) formData.append("address", data.address);
      if (data?.priceRange !== undefined && data?.priceRange !== null)
        formData.append("price", data.priceRange);
      if (data?.floor !== undefined && data?.floor !== null)
        formData.append("floor", data.floor);
      if (data?.purpose)
        formData.append("type", data.purpose.charAt(0).toUpperCase() + data.purpose.slice(1));
      if (data?.type) formData.append("category", data.type);
      if (data?.format) formData.append("format", data.format);
      if (data?.sizetype) formData.append("sizeType", data.sizetype);
      if (data?.size !== undefined && data?.size !== null)
        formData.append("size", data.size);
      if (data?.furnished) formData.append("furnished", data.furnished);
      if (data?.location) formData.append("location", data.location);
      if (data?.description) formData.append("description", data.description);

      // Append multiple images if available
      console.log("IMAGES ALL :",data.images);
      
      if (data?.images?.length > 0) {
        data.images.forEach((image) => {
          if (image?.file) {
            formData.append("images", image.file);
          }
        });
      }

      // Debugging: log FormData entries
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      const response = await fetch(`${API_URL}/api/property/updateproperty/${id}`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formData,
      });

      const result = await response.json();
      console.log("Response Result:", result);

      if (response.ok) {
        toast.success("Property updated successfully!");
        navigate("/broker/dashboard");
      } else {
        toast.error(result?.message || "Failed to update property.");
      }
    } catch (error) {
      toast.error("Something went wrong while updating the property.");
      console.error("Update Property Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateProperty };
};

export default useUpdateProperty;
