import React, { useState } from "react";
import TextInput from "../../components/Fields/TextInput";
import { Link } from "react-router-dom";
import AnimatedButton from "../../components/Fields/AnimatedButton";
import useRegistration from "../../hooks/auth-hooks/useRegistration";
import IMG from "../../assets/image.png";

const Registration = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      // Allow only digits and limit to 10 characters
      const numericValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!phoneRegex.test(formData.mobile))
      newErrors.mobile = "Enter a valid 10-digit number";
    if (!emailRegex.test(formData.email))
      newErrors.email = "Enter a valid email";
    if (!formData.address) {
      newErrors.address = "Address Required";
    }
    

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must have at least 1 uppercase, 1 lowercase, 1 number, 1 special character, and be at least 8 characters long (eg. Abcd@123)";
    }

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  const { loading, registration } = useRegistration();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log("Form submitted:", formData);
      const data = {
        fullName: formData.fullName,
        mobileNo: formData.mobile,
        email: formData.email,
        address: formData.address,
        password: formData.password,
      };
      await registration(data);
    }
  };

  return (
    <div className="flex h-screen animate-fadeIn">
      

      {/* Left Section with mobile background */}
      <div className="w-full sm:w-1/2 h-full overflow-y-auto no-scrollbar py-20 px-5 sm:px-20 flex justify-center items-center pb-5 bg-[url('/src/assets/image.png')] bg-cover bg-center sm:bg-none">
        <div className="w-[90%] max-w-md py-10 bg-black/80 p-5 sm:p-0 text-white sm:text-black rounded-xl sm:bg-transparent">
          <h1 className="text-2xl font-bold mb-2 poppins-bold">Welcome!</h1>
          <h2 className="text-xl mb-6 text-center poppins-semibold">
            Registration
          </h2>

          <form className="space-y-2" onSubmit={handleSubmit}>
            <TextInput
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              error={errors.fullName}
            />

            <TextInput
              label="Mobile Number"
              name="mobile"
              type="tel"
              maxLength={10}
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
              error={errors.mobile}
            />

            <TextInput
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              error={errors.email}
            />

            <div>
              <label className="text-white sm:text-black text-xs poppins-medium">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                minLength={20}
                className={`w-full text-xs px-5 pt-2 poppins-medium border-2 h-[65px] rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#265953] resize-none ${
                  errors.address ? "border-red-500" : "border-primary"
                }`}
              />
              {errors.address && (
                <p className="text-sm text-red-600">{errors.address}</p>
              )}
            </div>

            <TextInput
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              error={errors.password}
            />

            <TextInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              error={errors.confirmPassword}
            />

            <AnimatedButton type="submit" text="Next" onClick={handleSubmit} />
          </form>

          <p className="text-center mt-6 text-sm text-white sm:text-gray-600 poppins-regular">
            Already have an account?
            <Link
              to="/Login"
              className="text-primary font-semibold ml-1 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
      {/* Right Image Section for desktop */}
      <div className="hidden sm:block sm:w-1/2 h-full bg-primary">
        <img
          src={IMG}
          alt="Visual"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Registration;