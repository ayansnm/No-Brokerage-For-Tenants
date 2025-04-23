import React, { useState } from "react";
import TextInput from "../../components/Fields/TextInput";
import { Link } from "react-router-dom";
import AnimatedButton from "../../components/Fields/AnimatedButton";
import useRegistration from "../../hooks/auth-hooks/useRegistration";
import IMG from "../../assets/image.png";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../components/Fields/Button";
import { FaRegUser, FaUsers } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";

const RoleSelectionPopup = ({ onSelect }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 20 }}
          transition={{ type: "spring", damping: 20 }}
          className="bg-white p-8 rounded-xl max-w-md w-full mx-4"
        >
          <h2 className="text-2xl font-bold mb-6 text-center poppins-semibold">
            Select Your Role
          </h2>
          <div className="flex flex-col items-center sm:items-start sm:flex-row justify-between space-y-4 poppins-regular">
            <Button
              text={"Customer"}
              onClick={() => onSelect("user")}
              icon={<FaUsers size={42} />}
            />
            <Button
              text={"Broker"}
              onClick={() => onSelect("broker")}
              icon={<FaBuildingUser size={42} />}
            />
          </div>
          <p className="text-center mt-2 text-sm text-white sm:text-gray-600 poppins-regular">
            Already have an account?
            <Link
              to="/Login"
              className="text-gray-900 font-semibold ml-1 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

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
        role: formData.role
      };
      await registration(data);
    }
  };
  const [showRolePopup, setShowRolePopup] = useState(true);

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({ ...prev, role }));
    setShowRolePopup(false);
  };

  return (
    <div className="flex h-screen animate-fadeIn">
      {/* Role Selection Popup */}
      {showRolePopup && <RoleSelectionPopup onSelect={handleRoleSelect} />}

      {/* Left Section with mobile background */}
      <div className="w-full sm:w-1/2 h-full overflow-y-auto no-scrollbar py-20 px-5 sm:px-20 flex justify-center items-center pb-5 bg-[url('/src/assets/image.png')] bg-cover bg-center sm:bg-none">
        <div className="w-[90%] max-w-md py-10 bg-black/80 p-5 sm:p-0 text-white sm:text-black rounded-xl sm:bg-transparent">
          <h1 className="text-2xl font-bold mb-2 poppins-bold">Welcome!</h1>
          <h2 className="text-xl mb-6 text-center poppins-semibold">
            Registration
          </h2>

          {/* {formData.role && (
            <div className="mb-4 p-2 bg-primary/10 rounded-lg text-center">
              <span className="font-semibold">Registering as: </span>
              <span className="capitalize">{formData.role}</span>
            </div>
          )} */}

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
        <img src={IMG} alt="Visual" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Registration;
