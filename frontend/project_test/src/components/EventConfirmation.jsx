import { useState } from 'react';

const EventConfirmation = ({ event }) => {
  // We're now taking the event object as a prop
  const [selectedEvent, setSelectedEvent] = useState(event);

  const handleEventRefuse = () => {
    // Add logic to handle event refusal, such as removing the event from a list
    console.log("Event refused");
  };

  const handleEventAccept = () => {
    // Add logic to handle event acceptance, such as updating the event status
    console.log("Event accepted");
  };

  return (
    <div className="w-full max-w-xl mx-auto text-gray-700">
      <div className="w-full max-w-md p-8 bg-white rounded-md shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Event</h2>
        <p className="mb-8">{selectedEvent.status}</p>
        <p className="mb-8">{selectedEvent.title}</p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 mr-2 font-medium text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400"
            onClick={handleEventRefuse}
          >
            refuse Event
          </button>
          <button
            className="px-4 py-2 font-medium text-white bg-pink-500 rounded-md hover:bg-pink-600"
            onClick={handleEventAccept}
          >
            Accept Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventConfirmation;