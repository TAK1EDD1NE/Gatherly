import React, { useState } from 'react';

const GuestList = ({ guestList, onAdd, onRemove }) => {
  const [newGuest, setNewGuest] = useState('');

  const handleAddGuest = () => {
    if (newGuest.trim() !== '') {
      onAdd(newGuest.trim());
      setNewGuest('');
    }
  };

  const handleRemoveGuest = (index) => {
    onRemove(index);
  };

  return (
    <div>
      <div className="flex">
        <input
          type="text"
          className="flex-grow px-3 py-2 mr-4 text-gray-700 bg-white border rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          placeholder="Tab her to search"
          value={newGuest}
          onChange={(e) => setNewGuest(e.target.value)}
        />
        <button
          className="px-4 py-2 font-medium text-white bg-pink-400 rounded hover:bg-pink-500"
          onClick={handleAddGuest}
        >
          Add guest
        </button>
      </div>
      <ul className="mt-4 space-y-2">
        {guestList.map((guest, index) => (
          <li key={index} className="flex items-center justify-between text-gray-700">
            <span>{guest}</span>
            <button
              className="text-red-500 bg-white hover:text-red-600"
              onClick={() => handleRemoveGuest(index)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GuestList;