import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SidebarComponent from "../components/sideBar";
import TopBar from "../components/TopBar";
import EventCard from "../components/eventCard";

const EventList = () => {
  const events = [
    { title: "Event one", type: "meeting or conference", isNew: false },
    { title: "Event two", type: "party or gaming", isNew: true },
    { title: "Event three", type: "party or conference", isNew: false },
    { title: "Event four", type: "drinking or conference", isNew: false },
    { title: "Event one", type: "party or conference", isNew: true },
    { title: "Event one", type: "party or conference", isNew: false },
  ];

  const [currentPage, setCurrentPage] = useState("/employees");

  const [Filter, setFilter] = useState("");

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(Filter.toLowerCase())
  );

  

  return (
    <div className="flex w-screen min-h-screen bg-white shadow-2xl rounded-">
      <SidebarComponent currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex-1 px-6">
        <TopBar />
        <div className="px-5 py-7 bg-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-700">Evenements</h1>
          </div>
          <div className="flex items-center justify-between mb-8">
            <div className="bg-[#F362EA] p-8 rounded-3xl w-full">
              <h1 className="text-3xl font-bold mb-4">Salle Amizour</h1>
              <p className="text-xl mb-6">Manage your events in our software</p>
              <button
                variant="primary"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-3xl"
              >
                Today events
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex-1 mx-6">
              <input
                type="text"
                id="Filter"
                placeholder="Search..."
                className="w-1/2 px-4 py-2 bg-white rounded-md focus:outline-none text-gray-700 focus:ring-2 focus:ring-[#F362EA]"
                value={Filter}
              />
            </div>
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-[#F362EA] border border-transparent rounded-md shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              all events
            </button>
          </div>
          <div className="grid w-full grid-cols-1 gap-8 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {events.map((event, index) => (
              <EventCard
                key={index}
                title={event.title}
                type={event.type}
                isNew={event.isNew}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventList;
