import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { ChatBubbleOutline, LocationOn, StarOutline, Send } from '@mui/icons-material';
import axios from "axios";


const LandingPageCard = ({event}) => {
    const [locationName, setLocationName] = useState(null)
    
    const fetchLocationName = async (lat, lng) => {
        try {
          const geoResponse = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          );
          setLocationName(geoResponse.data.display_name);
          console.log("Location Name:", geoResponse.data.display_name);
        } catch (error) {
          console.error("Geocoding error:", error);
          setLocationName("Location not found");
        }
      };

      useEffect(() => {
          // Optionally fetch the name if the coordinates change
          if (event.position) {
            fetchLocationName(event.position[0], event.position[1]);
          }
        }, [event.position]);

        console.log(event)
    
  return (
    <Link
      key={event.id}
      className="overflow-hidden bg-white shadow-lg rounded-xl"
      to="reservation"
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
          <span>{locationName}</span>
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
