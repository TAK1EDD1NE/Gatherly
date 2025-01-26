import React from 'react';
import { Event } from '@mui/icons-material';

const EventCard = ({ title, type, isNew }) => {
  return (
    <div className="flex items-center p-4 bg-white rounded-2xl">
      <div className="mr-4">
        <Event className='text-[#F362EA] !text-2xl'/>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-gray-500">{type}</p>
        {isNew && <span className="px-2 py-1 text-xs text-white bg-green-500 rounded-md right-2">new</span>}
      </div>
    </div>
  );
};

export default EventCard;