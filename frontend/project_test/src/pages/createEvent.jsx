import React, { useState } from "react";
import HeaderBar from "../components/headerBar";
import GuestList from "../components/GuestList";
import EventInfo from "../components/EventInfo";
import AddedEvents from "../components/AddedEvent";


const CreateEvent = () => {

  const [guestList, setGuestList] = useState([]);
  const [events, setEvents] = useState([]);

  // Function to add a new guest
  const addGuest = (guest) => {
    setGuestList([...guestList, guest]);
  };

  // Function to remove a guest
  const removeGuest = (index) => {
    const updatedList = [...guestList];
    updatedList.splice(index, 1);
    setGuestList(updatedList);
  };

  // Function to add a new event
  const addEvent = (event) => {
    setEvents([...events, event]);
  };

  // Function to remove an event
  const removeEvent = (index) => {
    const updatedEvents = [...events];
    updatedEvents.splice(index, 1);
    setEvents(updatedEvents);
  };
  
  return (
    <div className="flex flex-col w-screen min-h-screen text-gray-700 bg-white px-60">
      <div className="w-full">
        <HeaderBar />
      </div>
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold">Create Event</h1>
        <div>
        <button className="px-8 py-2 font-medium text-white bg-pink-200 rounded hover:bg-pink-300">
          not created
        </button>
        <button className="px-8 py-2 font-medium text-white bg-pink-500 rounded hover:bg-pink-600">
          add programme
        </button>
        </div>
      </div>
      <div className="flex">
      {/* Add guest list section */}
      <div className="w-1/2 p-6">
        <h2 className="mb-4 text-lg font-medium">Add guest list</h2>
        <GuestList guestList={guestList} onAdd={addGuest} onRemove={removeGuest} />
      </div>

      {/* Event information section */}
      <div className="w-1/2 p-6">
        <h2 className="mb-4 text-lg font-medium">Event Information</h2>
        <EventInfo onAdd={addEvent} />
        <AddedEvents events={events} onRemove={removeEvent} />
      </div>
    </div>
    </div>
  );
};

export default CreateEvent;
