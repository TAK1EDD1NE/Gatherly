// import React, { useState } from "react";
import HeaderBar from "../components/headerBar";
import GuestList from "../components/GuestList";
import EventInfo from "../components/EventInfo";
import AddedEvents from "../components/AddedEvent";
import getData from "../api/getData";

import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie'; // Install with: npm install js-cookie

const EditProfile = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    gender: "",
    phoneNumber: "",
    email: "",
    role: "",
    stripeCode: ""
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        
        // Fetch user data
        const response = await getData('/user/get-user-by-id', {});
        
        // Update state with fetched data
        setUserData(response);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await postData('/user/profile', userData);
console.log(res);

      // Handle successful update
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleAdminSwitch = (e)=>{
    e.preventDefault()
    window.location.href = '/stripeid'
  }
//   return (
//     // Existing component JSX, but use userData instead of individual state
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={userData.fullName}
//         onChange={(e) => setUserData({...userData, fullName: e.target.value})}
//       />
//       {/* Similar updates for other inputs */}
//     </form>
//   );
// };


return (
  <div className="flex flex-col w-screen min-h-screen text-gray-700 bg-white px-60">
      <div className="w-full">
        <HeaderBar />
      </div>
      <div className="w-full max-w-md p-8 mx-auto bg-white rounded-md shadow-lg">
        <div className="flex items-center mb-8">
          <div className="w-24 h-24 mr-4 overflow-hidden bg-gray-200 rounded-full">
            <img
              src="data:image/png;base64,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"
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <div className="text-gray-700 font-bold " >
              {userData.username}
            </div>
            <small className="text-gray-500">
              {userData.email}
            </small>
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
              value={userData.username}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <select
              id="gender"
              placeholder="Gender"
              className="w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userData.gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          {/* <div className="mb-4">
            <input
              type="tel"
              id="phoneNumber"
              placeholder="Phone Number"
              className="w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div> */}

          <div className="mb-4">
            <div className="flex items-center">
              <input
                type="email"
                id="email"
                placeholder="My email Address"
                className="flex-1 px-4 py-2 text-gray-700 bg-white border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={userData.email}
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
              value={userData.role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              id="stripeCode"
              placeholder="Stripe Code"
              className="w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userData.stripeCode}
              onChange={(e) => setStripeCode(e.target.value)}
            />
          </div>

          <button
            type="submit"
            onClick={handleAdminSwitch}
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
