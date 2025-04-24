import React, { useState, useEffect } from "react";
import Stepper, { Step } from "../../components/ReactBits/Stepper";
import bgImage from "../../assets/Background.png";
import { FaHome, FaRegBuilding } from "react-icons/fa";
import AnimatedRadioButtons from "../../components/Fields/AnimatedRadioButtons";
import TextInput from "../../components/Fields/TextInput";
import AnimatedSelect from "../../components/Fields/AnimatedSelect";
import PriceRangeSlider from "../../components/Fields/PriceRangeSelector";
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import useRequirement from "../../hooks/customer-hooks/useRequirement";
import useGetFilledRequirements from "../../hooks/customer-hooks/useGetFilledRequirements";
import useUpdateRequirement from "../../hooks/customer-hooks/useUpdateRequirement";
import useGetAreas from "../../hooks/customer-hooks/useGetAreas";

const Requirements = () => {
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

  // Update formData when requirements are loaded
  useEffect(() => {
    if (requirements) {
      const sizeParts = requirements?.size?.split(" ") || ["", "sqft"];
      // const priceRangeParts = requirements?.priceRange
      //   ?.split("-")
      //   ?.map(Number) || [5000, 20000];
      setIsData(true);
      setFormData((prev) => ({
        ...prev,
        purpose: requirements?.propertyPurpose || "",
        state: requirements?.state || "",
        city: requirements?.city || "",
        area: requirements?.area || "",
        type: requirements?.propertyType || "",
        furnished: requirements?.furnishedType || "",
        format: requirements?.bhk || "",
        floor: requirements?.floor || "",
        sizetype: sizeParts[1] || "sqft",
        size: parseInt(sizeParts[0]) || "",
        priceRange: requirements?.priceRange,
        scheme: requirements?.scheme || "",
      }));
    }
  }, [requirements]);

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
      formData.area = value
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

  const handleStepChange = (step) => {
    setCurrentStep(step);
    validateCurrentStep();
  };

  const { loading, submitRequirement } = useRequirement();
  const { loading: loadReq, submitRequirement: updateRequirement } =
    useUpdateRequirement();
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
    if (isData) {
      console.log(requirements?._id);
      await updateRequirement(data, requirements?._id);
    } else {
      await submitRequirement(data);
    }
  };

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
          Heading="Looking for a property? We help you rent property with ease."
          handleSubmit={handleSubmit}
          purpose={formData.purpose}
          validateStep={validateCurrentStep}
          errors={errors} // Pass errors to Stepper
          setErrors={setErrors} // Pass setErrors to Stepper
        >
          <Step>
            <h2 className="w-full text-center poppins-semibold mb-4">
              Your purpose for property?
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
                      Select this if you want the property for Commercial
                      purpose.
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="w-3 text-xl h-3 rounded-full poppins-medium">
                      ●
                    </span>
                    <span className="mt-1 text-sm text-left">
                      In Commercial you have to pay 40% of your budget amount
                    </span>
                  </div>
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
                      Select this if you want the property for Residential
                      purpose.
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="w-3 text-xl h-3 rounded-full poppins-medium">
                      ●
                    </span>
                    <span className="mt-1 text-sm text-left">
                      In Residential you have to pay 20% of your budget amount
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </Step>
          <Step>
            <h2 className="w-full text-center poppins-medium mb-2">
              The Place where you need a property?
            </h2>
            <div className="flex flex-col px-2 sm:px-0 gap-1">
              <div className="form-group">
                <AnimatedRadioButtons
                  label="Category"
                  name="category"
                  options={[{ label: "Rent", value: "Rent" }]}
                  value={"Rent"}
                  onChange={handleChange}
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
              Which type of property you want?
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
                    { label: "Furnished", value: "fully-furnished" },
                    { label: "Semi-furnished", value: "semi-furnished" },
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
              The size of property you want?
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
                    label="Budget"
                    name="priceRange"
                    type="number"
                    value={formData.priceRange}
                    onChange={handleChange}
                    placeholder="Enter your budget"
                    error={errors.priceRange}
                  />
                </div>
                <p className="text-xs mt-1 text-primary poppins-semibold">
                  You have to pay{" "}
                  {formData.purpose === "residential"
                    ? formData.priceRange / 5 || 0
                    : formData.priceRange / 2.5 || 0}
                </p>
              </div>
            </div>
          </Step>
        </Stepper>
      </div>
    </div>
  );
};

export default Requirements;
