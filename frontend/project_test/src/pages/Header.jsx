import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex items-center px-4 lg:px-6 h-14">
      <Link to="/" className="flex items-center justify-center">
        <span className="text-2xl font-bold text-purple-600">Logo</span>
      </Link>
      <nav className="flex gap-4 ml-auto sm:gap-6">
        <Link to="/" className="text-sm font-medium hover:underline underline-offset-4">
          Home
        </Link>
        <Link to="/hall-expo" className="text-sm font-medium hover:underline underline-offset-4">
          Hall Expo
        </Link>
        <Link to="/about" className="text-sm font-medium hover:underline underline-offset-4">
          About Us
        </Link>
        <Link to="/signin" className="text-sm font-medium hover:underline underline-offset-4">
          Sign in
        </Link>
        <Link to="/signup" className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-full">
          Sign Up
        </Link>
      </nav>
    </header>
  );
};

export default Header;

