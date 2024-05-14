import React, { useState } from "react";
import "./index.css";
import timezones from "./timezone.json";
const SERVER_URL = process.env.REACT_APP_API_URL;
function App() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    timezone: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validateForm = () => {
    const { email, password, timezone } = formData;
    const errors = {};

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!timezone) {
      errors.timezone = "Timezone is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch(`${SERVER_URL}/users/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (response.ok) {
          console.log(data);
          // Reset form data
          setFormData({
            email: "",
            password: "",
            timezone: "",
          });
          setSuccessMessage("User registered successfully");
          setTimeout(() => {
            setSuccessMessage("");
          }, 2000);
        } else {
          setServerError(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="App bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          MERN Notification App
        </h1>
        {serverError && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 text-center">
            {serverError}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 text-green-700 p-2 mb-4 text-center">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`appearance-none border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`appearance-none border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="timezone"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Timezone
            </label>
            <select
              id="timezone"
              name="timezone"
              value={formData.timezone}
              onChange={handleChange}
              className={`appearance-none border ${
                errors.timezone ? "border-red-500" : "border-gray-300"
              } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            >
              <option value="">Select Timezone</option>
              {timezones.map((timezone, index) => (
                <option key={index} value={timezone.value}>
                  {timezone.label}
                </option>
              ))}
            </select>
            {errors.timezone && (
              <p className="text-red-500 text-xs mt-1">{errors.timezone}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
