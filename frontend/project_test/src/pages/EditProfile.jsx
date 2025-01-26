import React, { useState } from "react";
import HeaderBar from "../components/headerBar";
import GuestList from "../components/GuestList";
import EventInfo from "../components/EventInfo";
import AddedEvents from "../components/AddedEvent";

const EditProfile = () => {
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [stripeCode, setStripeCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to save the updated profile information
    console.log("Profile updated:", {
      fullName,
      gender,
      phoneNumber,
      email,
      role,
      stripeCode,
    });
  };
  return (
    <div className="flex flex-col w-screen min-h-screen text-gray-700 bg-white px-60">
      <div className="w-full">
        <HeaderBar />
      </div>
      <div className="w-full max-w-md p-8 mx-auto bg-white rounded-md shadow-lg">
        <div className="flex items-center mb-8">
          <div className="w-24 h-24 mr-4 overflow-hidden bg-gray-200 rounded-full">
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
          <button className="px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600">
            Edit profile
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="fullName"
              placeholder="User Name"
              className="w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <select
              id="gender"
              placeholder="Gender"
              className="w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div className="mb-4">
            <input
              type="tel"
              id="phoneNumber"
              placeholder="Phone Number"
              className="w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <div className="flex items-center">
              <input
                type="email"
                id="email"
                placeholder="My email Address"
                className="flex-1 px-4 py-2 text-gray-700 bg-white border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <input
              type="text"
              id="role"
              placeholder="role"
              className="w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              id="stripeCode"
              placeholder="Stripe Code"
              className="w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={stripeCode}
              onChange={(e) => setStripeCode(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Switch to admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
