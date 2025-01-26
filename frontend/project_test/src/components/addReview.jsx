import React, { useState, useRef, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const AddReview = ({ isOpen, onClose }) => {
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);

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
    console.log({ description, rating });
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const handleRatingChange = (value) => {
    setRating(value);
    console.log(rating);
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
          Leave us a comment
        </h2>
        <form onSubmit={handleSubmit}>
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
          <div className="flex justify-center mb-4">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => handleRatingChange(value)}
                className={`bg-white focus:outline-none ${
                  rating >= value ? "text-yellow-500" : "text-gray-300"
                }`}
              >
                <FaStar size={24} />
              </button>
            ))}
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

export default AddReview;
