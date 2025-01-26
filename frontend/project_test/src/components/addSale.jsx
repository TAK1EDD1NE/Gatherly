import React, { useState, useRef, useEffect } from "react";

const AddSale = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([]);
  const [price, setPrice] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Reference to modal container
  const modalRef = useRef(null);

  const options = ["Fridge", "Air Conditioner", "Heater", "Washing Machine"];

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
    console.log({ name, address, description, features, price });
    onClose();
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
    console.log(dropdownOpen);
  };

  const handleFeatureSelection = (option) => {
    setFeatures((prev) => {
      // Ensure `prev` is an array, even if something goes wrong
      if (!Array.isArray(prev)) prev = [];
      // Toggle the selected option
      return prev.includes(option)
        ? prev.filter((feature) => feature !== option)
        : [...prev, option];
    });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center z-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div
        ref={modalRef}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg flex-center"
      >
        <h2 className="mb-4 text-2xl font-bold text-gray-700">
          Add new employee for team work
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 text-gray-700 bg-white border rounded-lg focus:shadow-lg focus:border-pink-400"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="address"
              name="address"
              className="w-full px-3 py-2 text-gray-700 bg-white border rounded-lg focus:shadow-lg focus:border-pink-400"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="description"
              name="description"
              className="w-full px-3 py-2 text-gray-700 bg-white border rounded-lg focus:shadow-lg focus:border-pink-400"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="address"
              name="address"
              className="w-full px-3 py-2 text-gray-700 bg-white border rounded-lg focus:shadow-lg focus:border-pink-400"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <div
              onClick={toggleDropdown}
              className="w-full px-4 py-2 text-gray-700 bg-white border rounded-lg shadow-sm cursor-pointer"
            >
              {Array.isArray(features) && features.length > 0
                ? features.join(", ")
                : "Select features (click to open)"}
            </div>
            {dropdownOpen && (
              <ul className="z-10 w-full mt-1 text-gray-600 bg-white border border-gray-300 rounded-lg shadow-lg">
                {options.map((option) => (
                  <li
                    key={option}
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                      features.includes(option) ? "bg-gray-100 font-bold" : ""
                    }`}
                    onClick={() => handleFeatureSelection(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mb-4">
            <input
              type="number"
              id="price"
              name="price"
              className="w-full px-3 py-2 text-gray-700 bg-white border rounded-lg focus:shadow-lg focus:border-pink-400"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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

export default AddSale;
