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
      formData.append("size", data?.size);
      formData.append("furnished", data?.furnished);
      formData.append("location", data?.location);
      formData.append("description", data?.description);

      // Separate images and videos
      const images = [];
      const videos = [];

      data?.images?.forEach((media) => {
        if (media?.file) {
          if (media.file.type.includes('image')) {
            images.push(media.file);
          } else if (media.file.type.includes('video')) {
            videos.push(media.file);
          }
        }
      });

      // Append images
      images.forEach((image, index) => {
        formData.append(`images`, image);
      });

      // Append videos
      videos.forEach((video, index) => {
        formData.append(`videos`, video);
      });

      console.log("FORMDATA:", {
        title: data?.title,
        area: data?.area,
        price: data?.priceRange,
        imagesCount: images.length,
        videosCount: videos.length
      });

      const response = await fetch(`${API_URL}/api/property/addproperty`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formData,
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (response.ok) {
        toast.success("Property added successfully!");
        navigate("/broker/dashboard");
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