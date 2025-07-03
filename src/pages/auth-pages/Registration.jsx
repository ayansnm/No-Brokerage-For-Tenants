import React, { useState } from "react";
import TextInput from "../../components/Fields/TextInput";
import { Link } from "react-router-dom";
import AnimatedButton from "../../components/Fields/AnimatedButton";
import useRegistration from "../../hooks/auth-hooks/useRegistration";
import CompanyLogo from "../../assets/bglogot.png";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../components/Fields/Button";
import { FaRegUser, FaUsers } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const RoleSelectionPopup = ({ onSelect }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 20 }}
          transition={{ type: "spring", damping: 20 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl max-w-md w-full mx-4 shadow-2xl"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            Select Your Role
          </h2>
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => onSelect("user")}
              className="flex items-center justify-center space-x-3 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:border-secondary hover:bg-secondary/10 transition-all duration-300"
            >
              <FaUsers size={24} className="text-secondary" />
              <span className="text-lg font-semibold text-gray-800 dark:text-white">Customer</span>
            </button>
            <button
              onClick={() => onSelect("broker")}
              className="flex items-center justify-center space-x-3 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:border-secondary hover:bg-secondary/10 transition-all duration-300"
            >
              <FaBuildingUser size={24} className="text-secondary" />
              <span className="text-lg font-semibold text-gray-800 dark:text-white">Broker</span>
            </button>
          </div>
          <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link
              to="/app/Login"
              className="text-secondary font-semibold hover:underline"
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
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [showRolePopup, setShowRolePopup] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile") {
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
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character (eg. Abcd@123)";
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

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({ ...prev, role }));
    setShowRolePopup(false);
  };

  // Registration benefits for the carousel
  const slides = [
    {
      text: "Join thousands of satisfied customers using our platform daily",
      author: "",
    },
    {
      text: "Get access to exclusive features and premium support services",
      author: "",
    },
    {
      text: "Secure registration with industry-standard data protection",
      author: "",
    },
    {
      text: "Start your journey with us in just a few simple steps",
      author: "",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-primary dark:bg-gray-900">
      {/* Role Selection Popup */}
      {showRolePopup && <RoleSelectionPopup onSelect={handleRoleSelect} />}

      {/* Left side - Registration Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-[#B7A380]">
              Create Account
            </h1>
            <h2 className="text-xl text-gray-600 dark:text-gray-300">
              Join our platform today
            </h2>
            {formData.role && (
              <div className="mt-4 inline-block px-4 py-2 bg-secondary/10 rounded-lg">
                <span className="text-sm font-semibold text-secondary">
                  Role: <span className="capitalize">{formData.role}</span>
                </span>
              </div>
            )}
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <TextInput
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              error={errors.fullName}
            />

            <TextInput
              label="Mobile Number"
              name="mobile"
              type="tel"
              maxLength={10}
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              error={errors.mobile}
            />

            <TextInput
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              error={errors.email}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your complete address"
                rows={3}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary resize-none dark:bg-gray-800 dark:text-white ${
                  errors.address 
                    ? "border-red-500 focus:border-red-500" 
                    : "border-gray-300 dark:border-gray-600 focus:border-secondary"
                }`}
              />
              {errors.address && (
                <p className="text-sm text-red-600 mt-1">{errors.address}</p>
              )}
            </div>

            <TextInput
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              error={errors.password}
            />

            <TextInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              error={errors.confirmPassword}
            />

            <div className="pt-2">
              <AnimatedButton
                type="submit"
                text={loading ? "Creating Account..." : "Create Account"}
                onClick={handleSubmit}
                className="w-full"
                disabled={loading}
              />
            </div>
          </form>

          <p className="text-center mt-8 text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link
              to="/app/Login"
              className="text-secondary font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Branding Area */}
      <div className="hidden md:flex md:w-1/2 bg-secondary flex-col items-center justify-center p-12 text-primary relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20"></div>
        </div>

        {/* Logo */}
        <div className="relative z-10 mb-12 flex flex-col items-center">
          <img
            src={CompanyLogo || "/placeholder.svg"}
            alt="Company Logo"
            className="h-24 w-auto mb-6"
          />
          <h2 className="text-3xl font-bold">Your Company</h2>
          <p className="text-lg opacity-90 mt-2">Welcome to our platform</p>
        </div>

        {/* Registration Benefits Carousel */}
        <div className="relative z-10 w-full max-w-lg">
          <Carousel
            autoPlay
            infiniteLoop
            interval={5000}
            showArrows={false}
            showStatus={false}
            showThumbs={false}
            swipeable={false}
            emulateTouch={false}
            stopOnHover={false}
            dynamicHeight={false}
            transitionTime={1000}
          >
            {slides.map((slide, index) => (
              <div key={index} className="px-8 py-4 text-center">
                <p className="text-xl italic mb-4">"{slide.text}"</p>
                {slide.author && (
                  <p className="font-medium">— {slide.author}</p>
                )}
              </div>
            ))}
          </Carousel>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-black/10 backdrop-blur-sm flex items-center justify-center">
          <p className="text-sm opacity-80">
            Secure. Reliable. Trusted.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;