import React from "react";
import { Link } from 'react-router-dom';
import { LocationOn, StarOutline } from '@mui/icons-material';

const LandingPageCard = ({ event }) => {
  console.log("Event data being passed:", event); // Debugging: Log the event data

  return (
    <Link
      to="/reservation"
      state={{ event }} // Pass the event data as state
      className="overflow-hidden bg-white shadow-lg rounded-xl"
    >
      <img
        src={event.image}
        alt={event.title}
        className="object-cover w-full h-48"
      />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-blue-500">{event.title}</h3>
          <span className="font-bold text-purple-600">{event.price}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <LocationOn fontSize="small" className="mr-1" />
          <span>{event.locationName}</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <StarOutline className="w-4 h-4 text-yellow-400" />
            <span className="ml-1 text-sm">{event.rating}</span>
          </div>
          {event.isPopular && (
            <span className="text-sm text-red-500">
              <span className="mr-1">🔥</span> Popular
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default LandingPageCard;