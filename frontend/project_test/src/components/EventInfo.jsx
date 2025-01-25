import React, { useState } from 'react';

const EventInfo = ({ onAdd }) => {
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleAddEvent = () => {
    if (
      eventName.trim() !== '' &&
      description.trim() !== '' &&
      startTime !== '' &&
      endTime !== ''
    ) {
      onAdd({
        name: eventName.trim(),
        description: description.trim(),
        start: startTime,
        end: endTime,
      });
      setEventName('');
      setDescription('');
      setStartTime('');
      setEndTime('');
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 border">
      <div>
        <label htmlFor="event-name" className="block text-sm font-medium text-gray-700">
          Event Name
        </label>
        <input
          type="text"
          id="event-name"
          className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <input
          type="text"
          id="description"
          className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="start-time" className="block text-sm font-medium text-gray-700">
          Start time
        </label>
        <input
        type='time'
          id="start-time"
          className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        >
          {/* Options for start time */}
        </input>
      </div>
      <div>
        <label htmlFor="end-time" className="block text-sm font-medium text-gray-700">
          End time
        </label>
        <input
        type='time'
          id="end-time"
          className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        >
          {/* Options for end time */}
        </input>
      </div>
      <button
        className="px-4 py-2 mt-4 font-medium text-white bg-pink-500 rounded hover:bg-pink-600"
        onClick={handleAddEvent}
      >
        Add programme
      </button>
    </div>
  );
};

export default EventInfo;