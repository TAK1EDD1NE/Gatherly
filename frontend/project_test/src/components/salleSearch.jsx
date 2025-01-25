import React, { useState } from 'react';

const SalleSearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('Konser Jazz');
  const [location, setLocation] = useState('Indonesia');
  const [date, setDate] = useState('Any date');

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <div className="flex items-center justify-between w-full p-4 bg-white border rounded-lg shadow-2xl">
      <div className="flex-1 mr-4">
        <label htmlFor="search-term" className="block mb-2 font-medium text-gray-700">
          Rechercher une Salle
        </label>
        <input
          type="text"
          id="search-term"
          value={searchTerm}
          onChange={handleSearchTermChange}
          className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="flex-1 mr-4">
        <label htmlFor="location" className="block mb-2 font-medium text-gray-700">
          Localisation
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={handleLocationChange}
          className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="flex-1">
        <label htmlFor="date" className="block mb-2 font-medium text-gray-700">
          Date
        </label>
        <select
          id="date"
          value={date}
          onChange={handleDateChange}
          className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="Any date">Any date</option>
          <option value="Today">Today</option>
          <option value="Tomorrow">Tomorrow</option>
          <option value="This week">This week</option>
          <option value="Next week">Next week</option>
          <option value="This month">This month</option>
          <option value="Next month">Next month</option>
        </select>
      </div>
    </div>
  );
};

export default SalleSearchComponent;