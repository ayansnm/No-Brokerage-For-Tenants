import React, { useState } from "react";
import AnimatedButton from "../../components/Fields/AnimatedButton";
import { Link } from "react-router-dom";
import TextInput from "../../components/Fields/TextInput";
import useLogin from "../../hooks/auth-hooks/useLogin";
import Button from "../../components/Fields/Button";
import IMG from "../../assets/image.png";

const Login = () => {
  const [formData, setFormData] = useState({
    mobileNo: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobileNo") {
      const numericValue = value.replace(/\D/g, "").slice(0, 10); // restrict to 10
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    }
     else {
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
      // Call login API here
      await login(formData);
    }
  };

  return (
    <div className="flex h-screen animate-fadeIn">
      {/* Right Image Section for desktop */}
      <div className="hidden sm:block sm:w-1/2 h-full bg-primary">
        <img
          src={IMG}
          alt="Login Visual"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Left Section with mobile background */}
      <div className="w-full sm:w-1/2 h-full overflow-y-auto no-scrollbar px-5 sm:px-20 flex justify-center items-center pb-5 bg-[url('/src/assets/image.png')] bg-cover bg-center sm:bg-none">
        <div className="w-[90%] max-w-md py-10 bg-black/80 p-5 sm:p-0 text-white sm:text-black rounded-xl sm:bg-transparent">
          <h1 className="text-2xl font-bold mb-2 poppins-bold">Welcome Back</h1>
          <h2 className="text-1xl mb-3 text-center poppins-semibold">
            Login to your Account
          </h2>

          <form className="space-y-3" onSubmit={handleSubmit}>
            <TextInput
              label="Mobile Number"
              name="mobileNo"
              type="tel"
              maxLength={10}
              value={formData.mobileNo}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              error={errors.mobileNo}
            />

            <TextInput
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              error={errors.password}
            />

            <AnimatedButton type="submit" text="Login" onClick={handleSubmit} />
          </form>

          <p className="text-center mt-6 text-sm text-white sm:text-gray-600 poppins-regular">
            Don't have an account?
            <Link
              to="/Registration"
              className="text-primary font-semibold ml-1 hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>

      
    </div>
  );
};

export default Login;
