import React, { useState, useEffect, useCallback } from "react";
import Stepper, { Step } from "../../components/ReactBits/Stepper";
import bgImage from "../../assets/Background.png";
import { FaHome, FaRegBuilding, FaUpload } from "react-icons/fa";
import AnimatedRadioButtons from "../../components/Fields/AnimatedRadioButtons";
import TextInput from "../../components/Fields/TextInput";
import AnimatedSelect from "../../components/Fields/AnimatedSelect";
import PriceRangeSlider from "../../components/Fields/PriceRangeSelector";
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import useRequirement from "../../hooks/customer-hooks/useRequirement";
import useGetFilledRequirements from "../../hooks/customer-hooks/useGetFilledRequirements";
import useUpdateRequirement from "../../hooks/customer-hooks/useUpdateRequirement";
import useGetAreas from "../../hooks/customer-hooks/useGetAreas";
import useAddProperty from "../../hooks/broker-hooks/useAddProperty";
import useGetProperties from "../../hooks/broker-hooks/useGetProperties";
import Navbar from "../../components/Fields/Navbar";
import Footer from "../../components/Fields/Footer";
import { IoIosImages } from "react-icons/io";
import useGetPropertyDetails from "../../hooks/broker-hooks/useGetPropertyDetails";
import { useParams } from "react-router-dom";
import useUpdateProperty from "../../hooks/broker-hooks/useUpdateProperty";

const AddProperty = () => {
  const [formData, setFormData] = useState({
    purpose: "",
    category: "Rent",
    location: "",
    priceRange: "",
    state: "",
    city: "",
    area: "",
    type: "",
    furnished: "",
    format: "",
    floor: "",
    sizetype: "sqft",
    size: "",
    scheme: "",
    images: [],
  });
  const [isData, setIsData] = useState(false);
  const {
    loading: load,
    getRequirement,
    requirements,
  } = useGetFilledRequirements();

  const { loading: arealoading, areas, getAreas } = useGetAreas();
  const [search, setSearch] = useState("");
  const fetchAreas = async () => {
    await getAreas({ search });
  };
  useEffect(() => {
    fetchAreas();
  }, [search]);

  useEffect(() => {
    const fetchData = async () => {
      getRequirement();
    };
    fetchData();
  }, []);

  //   // Update formData when requirements are loaded
  //   useEffect(() => {
  //     if (requirements) {
  //       const sizeParts = requirements?.size?.split(" ") || ["", "sqft"];
  //       // const priceRangeParts = requirements?.priceRange
  //       //   ?.split("-")
  //       //   ?.map(Number) || [5000, 20000];
  //       setIsData(true);
  //       setFormData((prev) => ({
  //         ...prev,
  //         purpose: requirements?.propertyPurpose || "",
  //         state: requirements?.state || "",
  //         city: requirements?.city || "",
  //         area: requirements?.area || "",
  //         type: requirements?.propertyType || "",
  //         furnished: requirements?.furnishedType || "",
  //         format: requirements?.bhk || "",
  //         floor: requirements?.floor || "",
  //         sizetype: sizeParts[1] || "sqft",
  //         size: parseInt(sizeParts[0]) || "",
  //         priceRange: requirements?.priceRange,
  //         scheme: requirements?.scheme || "",
  //       }));
  //     }
  //   }, [requirements]);

  const [errors, setErrors] = useState({});
  const [canProceed, setCanProceed] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    validateCurrentStep();
  }, [formData, currentStep]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name == "area") {
      console.log("HELLO");
      console.log(value);
      formData.area = value;
    }
  };

  const handlePurposeSelect = (purpose) => {
    setFormData((prev) => ({
      ...prev,
      purpose,
    }));
  };

  const validateCurrentStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.purpose) {
          newErrors.purpose = "Please select a purpose!";
        }
        break;
      case 2:
        if (!formData.state) {
          newErrors.state = "Please select a state";
        }
        if (!formData.title) {
          newErrors.title = "Please Enter name of property";
        }
        if (!formData.city) {
          newErrors.city = "Please select a city";
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
        // if (
        //   !formData.floor &&
        //   (formData.type === "Flat" || formData.type === "Office")
        // ) {
        //   newErrors.floor = "Please select a floor";
        // }
        break;
      case 4:
        if (!formData.size) {
          newErrors.size = "Please enter size";
        }
        if (!formData.scheme) {
          newErrors.scheme = "Please enter scheme name";
        }
        if (!formData.priceRange) {
          newErrors.priceRange = "Please enter budget";
        }
        break;
      default:
        break;
    }

    return newErrors;
  };
  const { loading, properties, getProperties } = useGetProperties();
  const fetchProp = async () => {
    await getProperties();
  };
  useEffect(() => {
    fetchProp();
  }, []);
  const handleStepChange = (step) => {
    setCurrentStep(step);
    validateCurrentStep();
  };

  const { loading: addPropLoad, addProperty } = useAddProperty();
  const { loading: updateLoad, updateProperty } = useUpdateProperty();
  const handleUpdate = async () => {
    console.log(formData);
    const data = {
      propertyPurpose: formData.purpose,
      propertyType: formData.type,
      floor: formData.floor,
      furnishedType: formData.furnished,
      bhk: formData.format,
      state: formData.state,
      city: formData.city,
      area: formData.area,
      size: formData.size + " " + formData.sizetype,
      priceRange: formData.priceRange,
      scheme: formData.scheme,
      amount:
        formData.purpose === "residential"
          ? formData.priceRange[1] / 5
          : formData.priceRange[1] / 2.5,
    };
    console.log(data);
    await updateProperty(formData, id);
  };
  const handleSubmit = async () => {
    const data = {
      propertyPurpose: formData.purpose,
      propertyType: formData.type,
      floor: formData.floor,
      furnishedType: formData.furnished,
      bhk: formData.format,
      state: formData.state,
      city: formData.city,
      area: formData.area,
      size: formData.size + " " + formData.sizetype,
      priceRange: formData.priceRange,
      scheme: formData.scheme,
      amount:
        formData.purpose === "residential"
          ? formData.priceRange[1] / 5
          : formData.priceRange[1] / 2.5,
    };
    console.log(data);
    await addProperty(formData);
    // if (isData) {
    //   console.log(requirements?._id);
    //   await updateRequirement(data, requirements?._id);
    // } else {
    //   await submitRequirement(data);
    // }
  };
  const removeImage = useCallback((id) => {
    setFormData((prev) => {
      const imageToRemove = prev.images.find((img) => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      return {
        ...prev,
        images: prev.images.filter((img) => img.id !== id),
      };
    });
  }, []);
  const handleImageUpload = useCallback(
    (e) => {
      const files = Array.from(e.target.files);

      // Check total files won't exceed 10
      if (files.length + formData.images.length > 10) {
        alert("You can upload a maximum of 10 files (images + videos)");
        return;
      }

      const newFiles = files.map((file) => {
        const isVideo = file.type.includes("video");
        return {
          file,
          preview: URL.createObjectURL(file),
          id: Math.random().toString(36).substring(2, 9),
          type: isVideo ? "video" : "image",
        };
      });

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newFiles],
      }));
    },
    [formData.images.length]
  );

  // edit property

  const { id } = useParams();
  const {
    loading: getPropertyLoad,
    property,
    getPropertyDetails,
  } = useGetPropertyDetails();

  const fetchDetails = async () => {
    if (id) {
      await getPropertyDetails(id);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  // Update formData when property data is loaded for editing
  useEffect(() => {
    if (property && id) {
      // Split the size into value and type
      const sizeParts = property.size?.split(" ") || ["", "sqft"];
      console.log("IMAGES:", property.images);

      // Convert server image paths into preview objects
      const existingImages = (property.images || []).map((imgPath, index) => ({
        id: `existing-${index}`,
        preview: `http://145.223.20.218:2025/${imgPath}`,
        file: null,
        isExisting: true,
        serverPath: imgPath,
      }));

      setFormData({
        purpose: property.type === "Residential" ? "residential" : "commercial",
        category: "Rent", // Assuming this is always rent for editing
        location: property.location || "",
        priceRange: property.price || "",
        state: property.location?.state || "Gujarat",
        city: property.location?.city || "Ahmedabad",
        area: property.area || "",
        type: property.category || "",
        furnished: property.furnished || "",
        format: property.format || "",
        floor: property.floor || "",
        sizetype: property.sizeType || "",
        size: property.size || "",
        scheme: "",
        images: existingImages, // Set converted images here
        title: property.title || "",
        description: property.description || "",
      });
    }
  }, [property, id]);

  return (
    <>
      <Navbar pageName="Add Property" />
      {() => {
        if (id) {
          JSON.stringify(property);
        }
      }}
      <div
        style={{
          minHeight: "100vh",
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
        {}
        <div
          style={{
            width: "100%",
            maxWidth: "800px",
            margin: "2rem 0",
          }}
        >
          <Stepper
            initialStep={1}
            onStepChange={handleStepChange}
            onFinalStepCompleted={id ? handleUpdate : handleSubmit}
            backButtonText="Previous"
            nextButtonText="Next"
            Heading="Want to rent out your property?"
            handleSubmit={id ? handleUpdate : handleSubmit}
            purpose={formData.purpose}
            validateStep={validateCurrentStep}
            errors={errors} // Pass errors to Stepper
            setErrors={setErrors} // Pass setErrors to Stepper
            typeofstepper={id ? "updateproperty" : "addproperty"}
          >
            <Step>
              <h2 className="w-full text-center poppins-semibold mb-4">
                What type of your property?
              </h2>
              {errors.purpose && (
                <p className="text-red-500 text-center mb-4">
                  {errors.purpose}
                </p>
              )}
              <div className="flex flex-col sm:flex-col gap-2 justify-center items-center">
                <button
                  type="button"
                  className={`w-[90%] cursor-pointer p-5 border-2 rounded-3xl transition-all duration-300 ${
                    formData.purpose === "commercial"
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-primary border-primary hover:bg-primary hover:text-white"
                  }`}
                  onClick={() => handlePurposeSelect("commercial")}
                >
                  <div className="flex flex-row items-center gap-3">
                    <FaRegBuilding size={20} className="" />
                    <p className="poppins-semibold text-2xl">Commercial</p>
                  </div>
                  <div className="flex flex-col mt-3 justify-center gap-2">
                    <div className="flex gap-2">
                      <span className="w-3 text-xl h-3 rounded-full poppins-medium">
                        ●
                      </span>
                      <span className="mt-1 text-sm text-left">
                        Select this if your property is for Commercial purpose.
                      </span>
                    </div>
                    {/* <div className="flex gap-2">
                    <span className="w-3 text-xl h-3 rounded-full poppins-medium">
                      ●
                    </span>
                    <span className="mt-1 text-sm text-left">
                      In Commercial customer have to pay 40% of your budget amount
                    </span>
                  </div> */}
                  </div>
                </button>
                <button
                  type="button"
                  className={`w-[90%] cursor-pointer p-5 border-2 rounded-3xl transition-all duration-300 ${
                    formData.purpose === "residential"
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-primary border-primary hover:bg-primary hover:text-white"
                  }`}
                  onClick={() => handlePurposeSelect("residential")}
                >
                  <div className="flex flex-row items-center gap-3">
                    <FaHome size={20} className="" />
                    <p className="poppins-semibold text-2xl">Residential</p>
                  </div>
                  <div className="flex flex-col mt-3 justify-center gap-2">
                    <div className="flex gap-2">
                      <span className="w-3 text-xl h-3 rounded-full poppins-medium">
                        ●
                      </span>
                      <span className="mt-1 text-sm text-left">
                        Select this if your property is for Residential purpose.
                      </span>
                    </div>
                    {/* <div className="flex gap-2">
                    <span className="w-3 text-xl h-3 rounded-full poppins-medium">
                      ●
                    </span>
                    <span className="mt-1 text-sm text-left">
                      In Residential you have to pay 20% of your budget amount
                    </span>
                  </div> */}
                  </div>
                </button>
              </div>
            </Step>
            <Step>
              <h2 className="w-full text-center poppins-medium mb-2">
                Property Details
              </h2>
              <div className="flex flex-col px-2 sm:px-0 gap-1">
                {/* <div className="form-group">
                <AnimatedRadioButtons
                  label="Category"
                  name="category"
                  options={[{ label: "Rent", value: "Rent" }]}
                  value={"Rent"}
                  onChange={handleChange}
                />
              </div> */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Media (Max 10 - Images/Videos)
                  </label>
                  <div className="border-2 border-dashed border-primary rounded-xl p-4 text-center cursor-pointer hover:bg-primary-light/10">
                    <label className="flex flex-col items-center justify-center space-y-2">
                      <IoIosImages size={48} className="text-primary" />
                      <span className="text-primary font-medium">
                        Click to upload images/videos
                      </span>
                      <span className="text-xs text-gray-500">
                        {formData.images.length} files selected
                      </span>
                      <input
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>

                  {/* Media Previews */}
                  {formData.images.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {formData.images.map((media) => (
                        <div key={media.id} className="relative group">
                          {media.type === "video" ? (
                            <video
                              controls
                              className="w-full h-24 object-cover rounded-lg"
                            >
                              <source
                                src={media.preview}
                                type={media.file.type}
                              />
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <img
                              src={media.preview}
                              alt="Property preview"
                              className="w-full h-24 object-cover rounded-lg"
                            />
                          )}
                          <button
                            type="button"
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(media.id)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="form-group">
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

                <div className="form-group">
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

                <div className="form-group ">
                  <AnimatedSelect
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    options={[
                      { value: "Gujarat", label: "Gujarat" },
                      // { value: "Maharashtra", label: "Maharashtra" },
                      // { value: "Rajasthan", label: "Rajasthan" },
                    ]}
                    placeholder="Select state"
                    error={errors.state}
                  />
                </div>
                <div className="form-group ">
                  <AnimatedSelect
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    options={[
                      { value: "Ahmedabad", label: "Ahmedabad" },
                      // { value: "Gandhinagar", label: "Gandhinagar" },
                      // { value: "Patan", label: "Patan" },
                      // { value: "Goa", label: "Goa" },
                    ]}
                    placeholder="Select city"
                    error={errors.city}
                  />
                </div>
                <div className="form-group ">
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

                  {/* {JSON.stringify(
                  areas.map((item) => {
                    return item.areaName;
                  })
                )} */}
                </div>
              </div>
            </Step>

            <Step>
              <h2 className="w-full text-center poppins-medium mb-2">
                Property Details
              </h2>
              <div className="flex flex-col gap-1 px-2 sm:px">
                <div className="form-group">
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
                {formData.purpose == "residential" && (
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
                        { value: "Top", label: "Top" },
                        { value: "Middle", label: "Middle" },
                        { value: "Bottom", label: "Bottom" },
                      ]}
                      placeholder="Select floor"
                      error={errors.floor}
                    />
                  </div>
                )}
              </div>
            </Step>
            <Step>
              <h2 className="w-full text-center poppins-semibold mb-2">
                Property Details
              </h2>

              <div className="flex flex-col gap-1 px-2 sm:px">
                <div className="form-group">
                  <AnimatedRadioButtons
                    label="Size Type"
                    name="sizetype"
                    value={formData.sizetype}
                    onChange={handleChange}
                    options={[
                      { label: "Sqft", value: "Sqft" },
                      { label: "Vigha", value: "vigha" },
                      { label: "SqYard", value: "sqyard" },
                    ]}
                    error={errors.sizetype}
                  />
                </div>

                <div className="form-group">
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

                {/* <div className="form-group">
                <TextInput
                  label="Scheme"
                  name="scheme"
                  type="text"
                  value={formData.scheme}
                  onChange={handleChange}
                  placeholder="Enter Scheme name"
                  error={errors.scheme}
                />
              </div> */}

                <div className="form-group">
                  {/* <PriceRangeSlider
                  value={formData.priceRange}
                  onChange={(range) =>
                    setFormData((prev) => ({ ...prev, priceRange: range }))
                  }
                /> */}
                  <div className="form-group">
                    <TextInput
                      label="Price"
                      name="priceRange"
                      type="number"
                      value={formData.priceRange}
                      onChange={handleChange}
                      placeholder="Enter your budget"
                      error={errors.priceRange}
                    />
                  </div>
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
