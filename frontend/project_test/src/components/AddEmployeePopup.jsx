import React, { useState, useRef, useEffect } from 'react';

const AddEmployeePopup = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');

    // Reference to modal container
    const modalRef = useRef(null);
  
    // Close modal if clicked outside
    useEffect(() => {
      const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          onClose(); // Close the modal
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
  
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would add logic to save the new employee data
    console.log({ username, email, password, address });
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center z-50 ${
        isOpen ? '' : 'hidden'
      }`}
    >
      <div ref={modalRef} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md flex-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Add new employee for team work</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="username"
              name="username"
              className="border rounded-lg py-2 px-3 w-full bg-white focus:shadow-lg text-gray-700 focus:border-pink-400"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type='email'
              id="email"
              name="email"
              className="border rounded-lg py-2 px-3 w-full bg-white focus:shadow-lg text-gray-700 focus:border-pink-400"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div><div className="mb-4">
            <input
              type="password"
              id="password"
              name="password"
              className="border rounded-lg py-2 px-3 w-full bg-white focus:shadow-lg text-gray-700 focus:border-pink-400"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="address"
              name="address"
              className="border rounded-lg py-2 px-3 w-full bg-white focus:shadow-lg text-gray-700 focus:border-pink-400"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-[#F362EA] hover:shadow-lg hover:shadow-[#F362EA] text-white font-bold py-2 px-4 rounded-lg w-full"
          >
            Add employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeePopup;