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
  const {loading, properties, getProperties} = useGetProperties();
  const fetchProp = async()=>{
    await getProperties();
  }
  useEffect(()=>{
    fetchProp();
  },[])
  const handleStepChange = (step) => {
    setCurrentStep(step);
    validateCurrentStep();
  };

  const { loading: addPropLoad, addProperty } = useAddProperty();
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
      if (files.length + formData.images.length > 10) {
        alert("You can upload a maximum of 10 images");
        return;
      }

      const newImages = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        id: Math.random().toString(36).substring(2, 9), // unique ID for each image
      }));

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));
    },
    [formData.images.length]
  );

  return (
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
          onFinalStepCompleted={handleSubmit}
          backButtonText="Previous"
          nextButtonText="Next"
          Heading="Want to rent out your property?"
          handleSubmit={handleSubmit}
          purpose={formData.purpose}
          validateStep={validateCurrentStep}
          errors={errors} // Pass errors to Stepper
          setErrors={setErrors} // Pass setErrors to Stepper
          typeofstepper={"addproperty"}
        >
          <Step>
            <h2 className="w-full text-center poppins-semibold mb-4">
              What type of your property?
            </h2>
            {errors.purpose && (
              <p className="text-red-500 text-center mb-4">{errors.purpose}</p>
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
              <div className="form-group">
                <label htmlFor="property-images">
                  <div className="flex justify-center flex-col gap-3 items-center border-2 border-primary h-[100px] w-full rounded-2xl cursor-pointer">
                    <FaUpload size={30} className="text-primary" />
                    <p className="text-xs poppins-bold text-primary">
                      Upload images of property (Max 10)
                    </p>
                    <p className="text-xs text-gray-500">
                      {formData.images.length} images selected
                    </p>
                  </div>
                </label>

                <input
                  id="property-images"
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={handleImageUpload}
                />
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {formData.images.map((image) => (
                  <div key={image.id} className="relative">
                    <img
                      src={image.preview}
                      alt={`preview-${image.id}`}
                      className="w-20 h-20 object-cover rounded-lg"
                      loading="lazy" // Add lazy loading
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      onClick={() => removeImage(image.id)}
                      aria-label="Remove image"
                    >
                      ×
                    </button>
                  </div>
                ))}
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
                  Location
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
                    { label: "Unfurnished", value: "" },
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
                      { value: "Ground", label: "Ground Floor" },
                      { value: "First", label: "First Floor" },
                      { value: "Second", label: "Second Floor" },
                      { value: "Third", label: "Third Floor" },
                      { value: "Fourth", label: "Fourth Floor" },
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
  );
};

export default AddProperty;
