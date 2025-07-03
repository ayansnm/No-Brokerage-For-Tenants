import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHome, FaRegBuilding } from "react-icons/fa";
import { IoIosImages } from "react-icons/io";
import toast from "react-hot-toast";

// Components
import Stepper, { Step } from "../../components/ReactBits/Stepper";
import AnimatedRadioButtons from "../../components/Fields/AnimatedRadioButtons";
import TextInput from "../../components/Fields/TextInput";
import AnimatedSelect from "../../components/Fields/AnimatedSelect";
import Navbar from "../../components/Fields/Navbar";
import Footer from "../../components/Fields/Footer";

// Hooks
import useGetAreas from "../../hooks/customer-hooks/useGetAreas";
import useAddProperty from "../../hooks/broker-hooks/useAddProperty";
import useGetPropertyDetails from "../../hooks/broker-hooks/useGetPropertyDetails";
import useUpdateProperty from "../../hooks/broker-hooks/useUpdateProperty";
import { motion } from "motion/react"

// Assets
import bgImage from "../../assets/Background.jpg";

const AddProperty = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  // State
  const [formData, setFormData] = useState({
    purpose: "",
    category: "Rent",
    location: "",
    price: "",
    state: "Gujarat",
    city: "Ahmedabad",
    area: "",
    pincode: "",
    type: "",
    furnished: "",
    format: "",
    floor: "",
    sizeType: "Sqft",
    size: "",
    scheme: "",
    media: [], // Combined array for both images and videos
    removeMedia: [], // Track media to be removed from server
    title: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Hooks
  const { loading: arealoading, areas, getAreas } = useGetAreas();
  const { loading: addPropLoad, addProperty } = useAddProperty();
  const { loading: updateLoad, updateProperty } = useUpdateProperty();
  const { loading: getPropertyLoad, property, getPropertyDetails } = useGetPropertyDetails();

  // Convert server media to our format
  const convertServerMedia = (serverMedia) => {
    return serverMedia.map((item, index) => ({
      id: `existing-${index}`,
      preview: `http://145.223.20.218:2025${item.path}`,
      type: item.type,
      path: item.path,
      isExisting: true,
      _id: item._id,
    }));
  };

  // Fetch areas
  useEffect(() => {
    getAreas({ search });
  }, [search]);

  // Fetch property details if in edit mode
  useEffect(() => {
    if (isEditMode) {
      getPropertyDetails(id);
    }
  }, [id, isEditMode]);

  // Update form data when property details are loaded
  useEffect(() => {
    if (property && isEditMode && Object.keys(property).length > 0) {
      console.log("Setting form data from property:", property);
      setFormData({
        purpose: property.type === "Residential" ? "residential" : "commercial",
        category: "Rent",
        location: property.location || "",
        price: property.price || "",
        state: "Gujarat",
        city: "Ahmedabad",
        area: property.area || "",
        pincode: "",
        type: property.category || "",
        furnished: property.furnished || "",
        format: property.format || "",
        floor: property.floor || "",
        sizeType: property.sizeType || "Sqft",
        size: property.size?.split(" ")[0] || "",
        scheme: "",
        media: convertServerMedia(property.media || []),
        removeMedia: [],
        title: property.title || "",
        description: property.description || "",
      });
    }
  }, [property, isEditMode]);

  // Validate current step
  useEffect(() => {
    validateCurrentStep(currentStep);
  }, [formData, currentStep]);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePurposeSelect = (purpose) => {
    setFormData((prev) => ({
      ...prev,
      purpose,
    }));
  };

  const handleStepChange = (step) => {
    setCurrentStep(step);
    validateCurrentStep(step);
  };

  const handleMediaUpload = useCallback(
    (e) => {
      const files = Array.from(e.target.files);

      // Check total files won't exceed 10
      if (files.length + formData.media.length > 10) {
        toast.error("You can upload a maximum of 10 files (images + videos)");
        return;
      }

      const newFiles = files.map((file) => {
        const isVideo = file.type.includes("video");
        return {
          file,
          preview: URL.createObjectURL(file),
          id: Math.random().toString(36).substring(2, 9),
          type: isVideo ? "video" : "image",
          isExisting: false,
        };
      });

      setFormData((prev) => ({
        ...prev,
        media: [...prev.media, ...newFiles],
      }));
    },
    [formData.media.length],
  );

  const removeMedia = useCallback((id) => {
    setFormData((prev) => {
      const mediaToRemove = prev.media.find((item) => item.id === id);

      // For existing media, add to removeMedia array
      if (mediaToRemove?.isExisting) {
        console.log("Removing existing media:", mediaToRemove.path);
        return {
          ...prev,
          media: prev.media.filter((item) => item.id !== id),
          removeMedia: [...prev.removeMedia, mediaToRemove.path],
        };
      }

      // For new uploads, revoke object URL and remove from media array
      if (mediaToRemove?.preview) {
        URL.revokeObjectURL(mediaToRemove.preview);
      }

      return {
        ...prev,
        media: prev.media.filter((item) => item.id !== id),
      };
    });
  }, []);

  // Submit handlers
  const handleSubmit = async () => {
  try {
    setIsLoading(true);
    const formDataToSend = new FormData();

    // Append all regular fields
    formDataToSend.append("title", formData.title || "");
    formDataToSend.append("price", formData.price || formData.priceRange || "");
    formDataToSend.append("area", formData.area || "");
    formDataToSend.append("floor", formData.floor || "");
    formDataToSend.append("description", formData.description || "");
    formDataToSend.append("type", formData.purpose === "residential" ? "Residential" : "Commercial");
    formDataToSend.append("category", formData.type || "");
    formDataToSend.append("format", formData.format || "");
    formDataToSend.append("sizeType", formData.sizeType || "");
    formDataToSend.append("size", formData.size || "");
    formDataToSend.append("furnished", formData.furnished || "");
    formDataToSend.append("location", formData.location || "");

    // Append new media files
    formData.media.forEach((item) => {
      if (!item.isExisting && item.file) {
        formDataToSend.append(item.type === "video" ? "videos" : "images", item.file);
      }
    });

    // Debugging: Log all form data entries
    for (let [key, value] of formDataToSend.entries()) {
      console.log(`${key}:`, value);
    }

    await addProperty(formDataToSend);

    // Navigate to dashboard after successful submission
    if (localStorage.getItem("role") === "admin") {
      navigate("/app/admin/properties");
    } else if (localStorage.getItem("role") === "broker") {
      navigate("/app/broker/dashboard");
    }
  } catch (error) {
    console.error("Submit error:", error);
    toast.error("Failed to add property");
  } finally {
    setIsLoading(false);
  }
};

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const formDataToSend = new FormData();

      // Append all regular fields
      formDataToSend.append("title", formData.title);
      formDataToSend.append("price", formData.price || formData.priceRange);
      formDataToSend.append("area", formData.area);
      formDataToSend.append("floor", formData.floor || "");
      formDataToSend.append("description", formData.description);
      formDataToSend.append("type", formData.purpose === "residential" ? "Residential" : "Commercial");
      formDataToSend.append("category", formData.type);
      formDataToSend.append("format", formData.format || "");
      formDataToSend.append("sizeType", formData.sizeType);
      formDataToSend.append("size", formData.size);
      formDataToSend.append("furnished", formData.furnished);
      formDataToSend.append("location", formData.location);

      // Append new media files
      formData.media.forEach((item) => {
        if (!item.isExisting && item.file) {
          console.log(`Adding new ${item.type}:`, item.file.name);
          formDataToSend.append(item.type === "video" ? "videos" : "images", item.file);
        }
      });

      // Append media to be removed
      if (formData.removeMedia.length > 0) {
        console.log("Media to remove:", formData.removeMedia);
        formData.removeMedia.forEach((path) => {
          formDataToSend.append("removeMedia", path);
        });
      }

      // Log all form data entries for debugging
      for (let pair of formDataToSend.entries()) {
        console.log(`${pair[0]}: ${typeof pair[1] === 'object' ? 'File: ' + pair[1].name : pair[1]}`);
      }

      await updateProperty(formDataToSend, id);

      // Navigate to dashboard after successful update
      if (localStorage.getItem("role") === "admin") {
        navigate("/app/admin/properties");
      } else if (localStorage.getItem("role") === "broker") {
        navigate("/app/broker/dashboard");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update property");
    } finally {
      setIsLoading(false);
    }
  };

  // Validation
  const validateCurrentStep = (step = currentStep) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.purpose) {
          newErrors.purpose = "Please select a purpose!";
        }
        break;
      case 2:
        if (!formData.title) {
          newErrors.title = "Please enter name of property";
        }
        if (!formData.area) {
          newErrors.area = "Please select an area";
        }
        break;
      case 3:
        if (!formData.type) {
          newErrors.type = "Please select a property type";
        }
        if (!formData.furnished) {
          newErrors.furnished = "Please select furnished type";
        }
        if (!formData.format && formData.purpose === "residential") {
          newErrors.format = "Please select a format";
        }
        break;
      case 4:
        if (!formData.size) {
          newErrors.size = "Please enter size";
        }
        if (!formData.price && !formData.priceRange) {
          newErrors.priceRange = "Please enter price";
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return newErrors;
  };

  // Media Preview Component
  const MediaPreview = ({ media }) => (
    <div className="relative group">
      {media.type === "video" ? (
        <video controls className="w-full h-24 object-cover rounded-lg" src={media.preview} />
      ) : (
        <img
          src={media.preview || "/placeholder.svg"}
          alt="Property preview"
          className="w-full h-24 object-cover rounded-lg"
        />
      )}
      <button
        type="button"
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => removeMedia(media.id)}
      >
        ×
      </button>
    </div>
  );

  return (
    <>
      <Navbar pageName="Add Property" backtohome={true} />
      {() => {
        if (id) {
          JSON.stringify(property);
        }
      }}
      {/* <Navbar pageName={isEditMode ? "Update Property" : "Add Property"} /> */}
      <div
        data-aos="fade-up"
        style={{
          minHeight: "80vh",
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "bottom center",
          backgroundAttachment: "fixed",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
          overflowY: "auto",
        }}
        className="px-[1rem]"
      >
        <div
          style={{
            width: "100%",
            maxWidth: "900px",
            margin: "2rem 0",
          }}
        >
          <motion.button initial={{ scale: 1 }} animate={{ scale: 1 }} transition={{ duration: 1, ease: "easeInOut" }} />
          {isLoading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-5 rounded-lg shadow-lg">
                <p className="text-lg font-medium">
                  {isEditMode ? "Updating property..." : "Adding property..."}
                </p>
                <div className="mt-2 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-primary animate-pulse rounded-full"></div>
                </div>
              </div>
            </div>
          )}

          <Stepper
            initialStep={1}
            onStepChange={handleStepChange}
            onFinalStepCompleted={isEditMode ? handleUpdate : handleSubmit}
            backButtonText="Previous"
            nextButtonText="Next"
            Heading={isEditMode ? "Update your property" : "Want to rent out your property?"}
            handleSubmit={isEditMode ? handleUpdate : handleSubmit}
            purpose={formData.purpose}
            validateStep={validateCurrentStep}
            errors={errors}
            setErrors={setErrors}
            typeofstepper={isEditMode ? "updateproperty" : "addproperty"}
          >
            {/* Step 1: Property Purpose */}
            <Step>
              <h2 className="w-full text-center poppins-semibold mb-4">What type of your property?</h2>
              {errors.purpose && <p className="text-red-500 text-center mb-4">{errors.purpose}</p>}
              <div className="flex gap-2 justify-center items-center">
                <button
                  type="button"
                  className={`w-[90%] cursor-pointer p-5 border-2 rounded-3xl transition-all duration-300 ${formData.purpose === "commercial"
                    ? "bg-primary text-[#B7A380] border-primary"
                    : "bg-white text-primary border-primary hover:bg-[#265953] hover:!text-[#B7A380]"
                    }`}
                  onClick={() => handlePurposeSelect("commercial")}
                >
                  <div className="flex flex-row items-center gap-3">
                    <FaRegBuilding size={20} className="" />
                    <p className="poppins-semibold text-2xl">Commercial</p>
                  </div>
                  <div className="flex flex-col mt-3 justify-center gap-2">
                    <div className="flex gap-2">
                      <span className="w-3 text-xl h-3 rounded-full poppins-medium">●</span>
                      <span className="mt-1 text-sm text-left">
                        Select this if your property is for Commercial purpose.
                      </span>
                    </div>
                  </div>
                </button>
                <button
                  type="button"
                  className={`w-[90%] cursor-pointer p-5 border-2 rounded-3xl transition-all duration-300 ${formData.purpose === "residential"
                    ? "bg-primary text-[#B7A380] border-primary"
                    : "bg-white text-primary border-primary hover:bg-[#265953] hover:!text-[#B7A380]"
                    }`}
                  onClick={() => handlePurposeSelect("residential")}
                >
                  <div className="flex flex-row items-center gap-3">
                    <FaHome size={20} className="" />
                    <p className="poppins-semibold text-2xl">Residential</p>
                  </div>
                  <div className="flex flex-col mt-3 justify-center gap-2">
                    <div className="flex gap-2">
                      <span className="w-3 text-xl h-3 rounded-full poppins-medium">●</span>
                      <span className="mt-1 text-sm text-left">
                        Select this if your property is for Residential purpose.
                      </span>
                    </div>
                  </div>
                </button>
              </div>
            </Step>

            {/* Step 2: Property Details */}
            <Step>
              <h2 className="w-full text-center poppins-medium mb-2">Property Details</h2>
              <div className="flex flex-col md:flex-row justify-between px-2 sm:px-0 gap-4">
                <div className="w-full md:w-1/2">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Media (Max 10 - Images/Videos)
                    </label>
                    <div className="border-2 w-full max-w-md border-dashed border-primary rounded-xl p-4 text-center cursor-pointer hover:bg-primary-light/10">
                      <label className="flex cursor-pointer flex-col items-center justify-center space-y-2">
                        <IoIosImages size={48} className="text-primary" />
                        <span className="text-primary font-medium">Click to upload images/videos</span>
                        <span className="text-xs text-gray-500">{formData?.media?.length} files selected</span>
                        <input
                          type="file"
                          accept="image/*,video/*"
                          multiple
                          className="hidden"
                          onChange={handleMediaUpload}
                        />
                      </label>
                    </div>

                    {/* Media Previews */}
                    {formData?.media?.length > 0 && (
                      <div className="mt-4">
                        <div className={`flex space-x-3 overflow-x-auto pb-2 ${formData.media.length <= 3 ? 'justify-start' : ''}`}>
                          {formData.media.map((media) => (
                            <div key={media.id} className="flex-shrink-0" style={{ width: '100px' }}>
                              <MediaPreview media={media} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="form-group mt-4">
                    <TextInput
                      label={"Name of property"}
                      name={"title"}
                      type="text"
                      placeholder={"Enter property name"}
                      value={formData.title}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }));
                      }}
                      error={errors.title}
                    />
                  </div>

                  <div className="form-group mt-4">
                    <label htmlFor="" className="text-sm poppins-medium">
                      Address
                    </label>
                    <textarea
                      rows={4}
                      className="w-full flex-col text-sm px-4 py-2 poppins-regular border-2 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#265953] border-primary h-[80px] resize-none"
                      placeholder="Write location of property"
                      value={formData.location}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          location: e.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>

                <div className="w-full md:w-1/2">
                  <div className="form-group">
                    <label htmlFor="" className="text-sm poppins-medium">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      className="w-full flex-col text-sm px-4 py-2 poppins-regular border-2 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#265953] border-primary h-[80px] resize-none"
                      placeholder="Write property description"
                      value={formData.description}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }));
                      }}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <AnimatedSelect
                      label="State"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      options={[{ value: "Gujarat", label: "Gujarat" }]}
                      placeholder="Select state"
                      error={errors.state}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <AnimatedSelect
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      options={[{ value: "Ahmedabad", label: "Ahmedabad" }]}
                      placeholder="Select city"
                      error={errors.city}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <AnimatedSelect
                      label="Area"
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      options={
                        Array.isArray(areas)
                          ? areas.map((item) => ({
                            value: item.areaName,
                            label: item.areaName,
                          }))
                          : []
                      }
                      placeholder="Select area"
                      error={errors.area}
                      search={search}
                      setSearch={setSearch}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <TextInput
                      label={"Pincode"}
                      name={"pincode"}
                      type="text"
                      placeholder={"Enter pincode"}
                      value={formData.pincode}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          pincode: e.target.value,
                        }))
                      }
                      error={errors.pincode}
                    />
                  </div>
                </div>
              </div>
            </Step>

            {/* Step 3: Property Type */}
            <Step>
              <h2 className="w-full text-center poppins-medium mb-2">Property Details</h2>
              <div className="flex flex-col gap-1 px-2 sm:px items-center">
                <div className="form-group w-96">
                  <AnimatedSelect
                    label="Type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    options={
                      formData.purpose === "residential"
                        ? [
                          { value: "House", label: "House" },
                          { value: "Bunglow", label: "Bunglow" },
                          { value: "Flat", label: "Flat" },
                        ]
                        : [
                          { value: "Office", label: "Office" },
                          { value: "Shop", label: "Shop" },
                        ]
                    }
                    placeholder="Select type"
                    error={errors.type}
                  />
                </div>
                <div className="form-group">
                  <AnimatedRadioButtons
                    label="Furnished"
                    name="furnished"
                    options={[
                      { label: "Unfurnished", value: "Unfurnished" },
                      { label: "Furnished", value: "Fully" },
                      { label: "Semi-furnished", value: "Semi" },
                    ]}
                    value={formData.furnished}
                    onChange={handleChange}
                    error={errors.furnished}
                  />
                </div>
                {formData.purpose === "residential" && (
                  <div className="form-group">
                    <AnimatedRadioButtons
                      label="Format"
                      name="format"
                      options={[
                        { label: "1BHK", value: "1BHK" },
                        { label: "2BHK", value: "2BHK" },
                        { label: "3BHK", value: "3BHK" },
                        { label: "4BHK", value: "4BHK" },
                      ]}
                      value={formData.format}
                      onChange={handleChange}
                      error={errors.format}
                    />
                  </div>
                )}
                {(formData.type === "Flat" || formData.type === "Office") && (
                  <div className="form-group">
                    <AnimatedSelect
                      label="Floor"
                      name="floor"
                      value={formData.floor}
                      onChange={handleChange}
                      options={[
                        { value: "Top", label: "Top (Nineth and Above)" },
                        {
                          value: "Middle",
                          label: "Middle (Fourth to Nineth floor)",
                        },
                        {
                          value: "Bottom",
                          label: "Bottom (Ground to Fourth floor)",
                        },
                      ]}
                      placeholder="Select floor"
                      error={errors.floor}
                    />
                  </div>
                )}
              </div>
            </Step>

            {/* Step 4: Size and Price */}
            <Step>
              <h2 className="w-full text-center poppins-semibold mb-2">Property Details</h2>

              <div className="flex flex-col items-center gap-1 px-2 sm:px">
                <div className="form-group">
                  <AnimatedRadioButtons
                    label="Size Type"
                    name="sizeType"
                    value={formData.sizeType}
                    onChange={handleChange}
                    options={[
                      { label: "Sqft", value: "Sqft" },
                      { label: "Vigha", value: "vigha" },
                      { label: "SqYard", value: "sqyard" },
                    ]}
                    error={errors.sizeType}
                  />
                </div>

                <div className="form-group w-80">
                  <TextInput
                    label="Size"
                    name="size"
                    type="number"
                    value={formData.size}
                    onChange={handleChange}
                    placeholder="Enter size"
                    error={errors.size}
                  />
                </div>

                <div className="form-group w-80">
                  <TextInput
                    label="Price"
                    name="price"
                    type="number"
                    value={formData.price || formData.priceRange}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }));
                    }}
                    placeholder="Enter price"
                    error={errors.priceRange}
                  />
                </div>
              </div>
            </Step>
          </Stepper>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddProperty;
