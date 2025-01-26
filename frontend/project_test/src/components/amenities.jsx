import React from 'react';
import { FaWifi, FaLeaf, FaTshirt, FaSnowflake, FaBicycle } from 'react-icons/fa';

const Amenities = () => {
  const amenities = [
    { id: 1, icon: <FaWifi />, label: 'Wifi' },
    { id: 2, icon: <FaLeaf />, label: 'Garden view' },
    { id: 3, icon: <FaTshirt />, label: 'Free washer - in building' },
    { id: 4, icon: <FaSnowflake />, label: 'Central air conditioning' },
    { id: 6, icon: <FaBicycle />, label: 'Bicycles' },
  ];

  return (
    <div className="p-8 mt-4">
      <h2 className="mb-2 text-xl font-bold">What this place offers</h2>
      <div className="grid grid-cols-3 gap-4">
        {amenities.map((amenity) => (
          <div key={amenity.id} className="flex items-center space-x-2">
            {amenity.icon}
            <span>{amenity.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Amenities;