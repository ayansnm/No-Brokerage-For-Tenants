"use client"

import { useState, useEffect } from "react"
import Stepper, { Step } from "../../components/ReactBits/Stepper"
import bgImage from "../../assets/Background.jpg"
import { FaHome, FaRegBuilding } from "react-icons/fa"
import AnimatedRadioButtons from "../../components/Fields/AnimatedRadioButtons"
import TextInput from "../../components/Fields/TextInput"
import AnimatedSelect from "../../components/Fields/AnimatedSelect"
import useRequirement from "../../hooks/customer-hooks/useRequirement"
import useGetFilledRequirements from "../../hooks/customer-hooks/useGetFilledRequirements"
import useUpdateRequirement from "../../hooks/customer-hooks/useUpdateRequirement"
import useGetAreas from "../../hooks/customer-hooks/useGetAreas"
import Navbar from "../../components/Fields/Navbar"
import Footer from "../../components/Fields/Footer"
import PaymentSummary from "./PaymentSummary"
import PaymentStatus from "./PaymentStatus"
import useRazorpayPayment from "../../hooks/useRazorpayPayment"

const Requirements = () => {
  // Initialize all form fields with default values to prevent uncontrolled to controlled warnings
  const [formData, setFormData] = useState({
    purpose: "",
    category: "Rent",
    location: "",
    priceRange: 0,
    state: "",
    city: "",
    area: "",
    type: "",
    furnished: "",
    format: "",
    floor: "",
    sizetype: "sqft",
    size: 0,
    scheme: "",
    pincode: "",
  })

  const [isData, setIsData] = useState(false)
  const [errors, setErrors] = useState({})
  const [currentStep, setCurrentStep] = useState(1)

  const { loading: load, getRequirement, requirements } = useGetFilledRequirements()
  const { loading: arealoading, areas, getAreas } = useGetAreas()
  const { loading: requirementLoading, submitRequirement } = useRequirement()
  const { loading: updateLoading, submitRequirement: updateRequirement } = useUpdateRequirement()
  const { loading: paymentLoading, scriptLoaded } = useRazorpayPayment()

  const [search, setSearch] = useState("")

  // Calculate payment amount
  const paymentAmount =
    formData.purpose === "Residential" ? Math.round(formData.priceRange / 5) : Math.round(formData.priceRange / 2.5)

  const fetchAreas = async () => {
    await getAreas({ search })
  }

  useEffect(() => {
    fetchAreas()
  }, [search])

  useEffect(() => {
    const fetchData = async () => {
      getRequirement()
    }
    fetchData()
  }, [])

  // Update formData when requirements are loaded
  useEffect(() => {
    if (requirements) {
      const sizeParts = requirements?.size?.split(" ") || ["0", "sqft"]
      setIsData(true)
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
        size: Number.parseInt(sizeParts[0]) || 0,
        priceRange: requirements?.priceRange || 0,
        scheme: requirements?.scheme || "",
        pincode: requirements?.pincode || "",
      }))
    }
  }, [requirements])

  useEffect(() => {
    validateCurrentStep()
  }, [formData, currentStep])

  const handleChange = (e) => {
    const { name, value } = e.target

    // Convert numeric fields to numbers
    let processedValue = value
    if (name === "priceRange" || name === "size" || name === "pincode") {
      processedValue = value === "" ? 0 : Number(value)
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handlePurposeSelect = (purpose) => {
    setFormData((prev) => ({
      ...prev,
      purpose,
    }))

    // Clear purpose error
    if (errors.purpose) {
      setErrors((prev) => ({
        ...prev,
        purpose: "",
      }))
    }
  }

  const validateCurrentStep = (step = currentStep) => {
    const newErrors = {}

    switch (step) {
      case 1:
        if (!formData.purpose) {
          newErrors.purpose = "Please select a purpose!"
        }
        break
      case 2:
        if (!formData.state) newErrors.state = "Please select a state"
        if (!formData.city) newErrors.city = "Please select a city"
        if (!formData.area) newErrors.area = "Please select an area"
        break
      case 3:
        if (!formData.type) newErrors.type = "Please select a property type"
        if (!formData.furnished) newErrors.furnished = "Please select furnished type"
        if (!formData.format && formData.purpose === "Residential") {
          newErrors.format = "Please select a format"
        }
        break
      case 4:
        if (!formData.size || formData.size <= 0) newErrors.size = "Please enter a valid size"
        if (!formData.priceRange || formData.priceRange <= 0) newErrors.priceRange = "Please enter a valid budget"
        break
      default:
        break
    }

    return newErrors
  }

  const handleStepChange = (step) => {
    setCurrentStep(step)
    validateCurrentStep()
  }

  const handleSubmit = async () => {
    const data = {
      propertyPurpose: formData.purpose,
      propertyType: formData.type,
      floor: formData.floor,
      furnished: formData.furnished,
      format: formData.format,
      state: formData.state,
      city: formData.city,
      area: formData.area,
      size: formData.size + " " + formData.sizetype,
      priceRange: formData.priceRange,
      scheme: formData.scheme,
      pincode: formData.pincode,
      amount: paymentAmount,
    }

    console.log("Submitting requirement with data:", data)

    try {
      if (isData) {
        await updateRequirement(data, requirements?._id)
      } else {
        await submitRequirement(data)
      }
    } catch (error) {
      console.error("Submission error:", error)
    }
  }

  const isLoading = requirementLoading || updateLoading || paymentLoading

  return (
    <>
      <Navbar />
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
        className="px-[1rem] animate-fadeIn"
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
            errors={errors}
            setErrors={setErrors}
            typeofstepper="requirement"
          >
            <Step>
              <h2 className="w-full text-center poppins-semibold mb-4">Your purpose for property?</h2>
              {errors.purpose && <p className="text-red-500 text-center mb-4">{errors.purpose}</p>}
              <div className="flex flex-col sm:flex-col gap-2 justify-center items-center">
                <button
                  type="button"
                  className={`w-[90%] cursor-pointer p-5 border-2 rounded-3xl transition-all duration-300 ${
                    formData.purpose === "Commercial"
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-primary border-primary hover:bg-[#084040] hover:!text-white"
                  }`}
                  onClick={() => handlePurposeSelect("Commercial")}
                >
                  <div className="flex flex-row items-center gap-3">
                    <FaRegBuilding size={20} className="" />
                    <p className="poppins-semibold text-2xl">Commercial</p>
                  </div>
                  <div className="flex flex-col mt-3 justify-center gap-2">
                    <div className="flex gap-2">
                      <span className="w-3 text-xl h-3 rounded-full poppins-medium">●</span>
                      <span className="mt-1 text-sm text-left">
                        Select this if you want the property for Commercial purpose.
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="w-3 text-xl h-3 rounded-full poppins-medium">●</span>
                      <span className="mt-1 text-sm text-left">
                        In Commercial you have to pay 40% of your budget amount
                      </span>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  className={`w-[90%] cursor-pointer p-5 border-2 rounded-3xl transition-all duration-300 ${
                    formData.purpose === "Residential"
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-primary border-primary hover:bg-[#265953] hover:!text-white"
                  }`}
                  onClick={() => handlePurposeSelect("Residential")}
                >
                  <div className="flex flex-row items-center gap-3">
                    <FaHome size={20} className="" />
                    <p className="poppins-semibold text-2xl">Residential</p>
                  </div>
                  <div className="flex flex-col mt-3 justify-center gap-2">
                    <div className="flex gap-2">
                      <span className="w-3 text-xl h-3 rounded-full poppins-medium">●</span>
                      <span className="mt-1 text-sm text-left">
                        Select this if you want the property for Residential purpose.
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="w-3 text-xl h-3 rounded-full poppins-medium">●</span>
                      <span className="mt-1 text-sm text-left">
                        In Residential you have to pay 20% of your budget amount
                      </span>
                    </div>
                  </div>
                </button>
              </div>
            </Step>

            <Step>
              <h2 className="w-full text-center poppins-medium mb-2">The Place where you need a property?</h2>
              <div className="flex flex-col px-2 sm:px-0 gap-1">
                <div className="form-group">
                  <AnimatedRadioButtons
                    label="Category"
                    name="category"
                    options={[{ label: "Rent", value: "Rent" }]}
                    value={formData.category}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
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
                <div className="form-group">
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
                <div className="form-group">
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
                <div className="form-group">
                  <label className="text-black text-sm poppins-medium">Pincode</label>
                  <input
                    className="w-full mt-1 px-5 poppins-regular text-sm border-2 h-[35px] rounded-full transition-all duration-300 flex items-center justify-between cursor-pointer ring-2 ring-[#265953]"
                    name="pincode"
                    type="number"
                    value={formData.pincode || ""}
                    onChange={handleChange}
                    placeholder="Enter your pincode"
                  />
                </div>
              </div>
            </Step>

            <Step>
              <h2 className="w-full text-center poppins-medium mb-2">Which type of property you want?</h2>
              <div className="flex flex-col gap-1 px-2 sm:px">
                <div className="form-group">
                  <AnimatedSelect
                    label="Type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    options={
                      formData.purpose === "Residential"
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

                {formData.purpose === "Residential" && (
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
                        { value: "Middle", label: "Middle (Fourth to Nineth floor)" },
                        { value: "Bottom", label: "Bottom (Ground to Fourth floor)" },
                      ]}
                      placeholder="Select floor"
                      error={errors.floor}
                    />
                  </div>
                )}
              </div>
            </Step>

            <Step>
              <h2 className="w-full text-center poppins-semibold mb-2">The size of property you want?</h2>
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
                    value={formData.size || ""}
                    onChange={handleChange}
                    placeholder="Enter size"
                    error={errors.size}
                  />
                </div>

                <div className="form-group">
                  <TextInput
                    label="Budget"
                    name="priceRange"
                    type="number"
                    value={formData.priceRange || ""}
                    onChange={handleChange}
                    placeholder="Enter your budget"
                    error={errors.priceRange}
                  />
                </div>

                {formData.priceRange > 0 && formData.purpose && (
                  <PaymentSummary formData={formData} amount={paymentAmount} purpose={formData.purpose} />
                )}
              </div>
            </Step>
          </Stepper>
        </div>
      </div>

      {/* Payment Loading Overlay */}
      <PaymentStatus loading={isLoading} scriptLoaded={scriptLoaded} />

      <Footer />
    </>
  )
}

export default Requirements
