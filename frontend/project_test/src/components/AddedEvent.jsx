import React from 'react';

const AddedEvents = ({ events, onRemove }) => {
  const handleRemoveEvent = (index) => {
    onRemove(index);
  };

  return (
    <div className="mt-6">
      <h2 className="mb-4 text-lg font-medium">Added Events</h2>
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="grid items-center grid-cols-4 gap-4">
            <div>{event.name}</div>
            <div>{event.start}</div>
            <div>{event.end}</div>
            <button
              className="text-red-500 bg-white hover:text-red-600"
              onClick={() => handleRemoveEvent(index)}
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddedEvents;