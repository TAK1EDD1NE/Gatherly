import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Notifications, ExpandMore } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';


const TopBar = () => {
  return (
    <div className="sticky top-0 left-0 right-0 z-10 bg-white shadow-md">
      <div className="container flex items-center justify-between py-3 mx-auto">
        <div>
          <Link to="/" className="flex items-center space-x-2">
          <Menu/>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-6">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F362EA] text-gray-700"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button className="p-2 rounded-full hover:bg-[#F362EA] focus:outline-none focus:ring-2 focus:ring-[#F362EA] bg-transparent hover:ring-[#F362EA]">
            <Notifications className="w-6 h-6 text-gray-600" />
            <span className="absolute top-0 right-0 px-2 py-1 text-xs text-white bg-red-500 rounded-full">5</span>
          </button>
        </div>

        {/* Language Selector */}
        <div className="relative">
          <button className="flex items-center p-2 space-x-2 rounded-full hover:bg-[#F362EA] hover:shadow-lg hover:shadow-[#F362EA] focus:outline-none hover:ring-[#F362EA] focus:ring-2 focus:ring-[#F362EA] bg-transparent">
            {/* <img src="/flags/us.svg" alt="US Flag" className="w-6 h-6" /> */}
            <span className="text-gray-600">English</span>
            <ExpandMore className="w-5 h-5 text-gray-600 bg-transparent"/>
          </button>
        </div>

        {/* User Profile */}
        <div className="relative">
          <button className="flex items-center p-2 space-x-2 rounded-full hover:bg-[#F362EA] focus:outline-none focus:ring-2 focus:ring-[#F362EA] hover:ring-transparent bg-transparent hover:shadow-lg hover:shadow-[#F362EA]">
            <img
              src="https://ui-avatars.com/api/?name=Taki+Rehail&background=random&size=32"
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-gray-600">Taki rehail</span>
            <ExpandMore className="w-5 h-5 text-gray-600 bg-transparent"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;