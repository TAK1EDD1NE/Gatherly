import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/Group.png"

const HeaderBar = () => {
  return (
    <header className="mb-12 bg-transparent">
      <div className="container flex items-center justify-between px-10 py-3 mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-16 mr-2" />
        </Link>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-gray-700">
                Home
              </Link>
            </li>
            <li>
              <Link to="/salles" className="text-gray-700">
                Hall Expo
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-700">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/signin" className="text-gray-700">
                Sign In
              </Link>
            </li>
            <li>
              <Link to="/signup" className="px-4 py-2 text-gray-700 bg-pink-400 bg-pigray-700nk-200 text- rounded-2xl bg-opacity-40">
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default HeaderBar;