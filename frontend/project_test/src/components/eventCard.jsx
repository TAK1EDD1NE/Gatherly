import React from 'react';
import { Event } from '@mui/icons-material';

const EventCard = ({ title, type, isNew }) => {
  return (
    <div className="bg-white rounded-2xl p-4 flex items-center hover:shadow-2xl">
      <div className="mr-4">
        <Event className='text-[#F362EA] !text-2xl'/>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-gray-500">{type}</p>
        {isNew && <span className="bg-green-500 text-white px-2 py-1 rounded-md text-xs right-2">new</span>}
      </div>
    </div>
  );
};

export default EventCard;