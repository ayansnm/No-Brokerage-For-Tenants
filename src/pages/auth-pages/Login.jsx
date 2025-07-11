import React, { useState } from "react";
import AnimatedButton from "../../components/Fields/AnimatedButton";
import { Link } from "react-router-dom";
import TextInput from "../../components/Fields/TextInput";
import useLogin from "../../hooks/auth-hooks/useLogin";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CompanyLogo from "../../assets/bglogot.png"; // Replace with your actual logo path

const Login = () => {
  const [formData, setFormData] = useState({
    mobileNo: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobileNo") {
      const numericValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const mobileRegex = /^[0-9]{10}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!mobileRegex.test(formData.mobileNo)) {
      newErrors.mobileNo = "Enter a valid 10-digit mobile number";
    }

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character. (eg. Abcd@123)";
    }

    return newErrors;
  };

  const { loading, login } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log("Login form submitted:", formData);
      await login(formData);
    }
  };

  // Testimonials or feature highlights for the carousel
  const slides = [
    {
      text: "Join thousands of satisfied customers using our platform daily",
      author: "",
    },
    {
      text: "Secure, reliable, and built with cutting-edge technology",
      author: "",
    },
    {
      text: "24/7 customer support to assist you whenever you need",
      author: "",
    },
    {
      text: "Trusted by industry leaders across multiple sectors",
      author: "",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-primary dark:bg-gray-900">
      {/* Left side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-[#B7A380]">
              Welcome Back
            </h1>
            <h2 className="text-xl text-gray-600 dark:text-gray-300">
              Login to your Account
            </h2>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <TextInput
              label="Mobile Number"
              name="mobileNo"
              type="tel"
              maxLength={10}
              value={formData.mobileNo}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              error={errors.mobileNo}
              textColor="!text-white"
            />

            <TextInput
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              error={errors.password}
              textColor="!text-white"
            />

            <div className="pt-2">
              <AnimatedButton
                type="submit"
                text={loading ? "Logging in..." : "Login"}
                onClick={handleSubmit}
                className="w-full"
                disabled={loading}
              />
            </div>

            <div className="text-center pt-4">
              <Link
                to="/forgot-password" // Add your forgot password route
                className="text-sm text-secondary hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </form>

          <p className="text-center mt-8 text-sm text-gray-600 dark:text-gray-300">
            Don't have an account?{" "}
            <Link
              to="/app/Registration"
              className="text-secondary font-semibold hover:underline"
            >
              Register here
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
            src={CompanyLogo}
            alt="Company Logo"
            className="h-24 w-auto mb-6"
          />
          <h2 className="text-3xl font-bold">Your Company</h2>
          <p className="text-lg opacity-90 mt-2">Tagline or slogan here</p>
        </div>

        {/* Testimonial Carousel */}
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

export default Login;